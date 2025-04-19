import signal
import sys
import uuid
import os
import logging
from datetime import datetime, timezone
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.mutable import MutableList
from mutagen.mp3 import MP3
from celery import Celery
from Transcription import transcription
from Transcription.transcription import summarize_transcript


from flask_cors import CORS

# Add the parent directory to the system path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

app = Flask(__name__)
CORS(app)

# Database Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["CELERY_BROKER_URL"] = "redis://localhost:6379/0"
app.config["CELERY_RESULT_BACKEND"] = "redis://localhost:6379/0"

db = SQLAlchemy(app)
celery = Celery(app.name, broker=app.config["CELERY_BROKER_URL"])
celery.conf.update(app.config)

# Ensure upload folder exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


class Course(db.Model):
    """Represents a course with a name and summary."""

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    summary = db.Column(db.Text, nullable=False)
    last_updated = db.Column(
        db.Float, default=lambda: datetime.now(timezone.utc).timestamp()
    )


class Lecture(db.Model):
    """Represents a lecture associated with a course, storing metadata and transcription details."""

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(255), nullable=False)
    course_id = db.Column(db.String(36), db.ForeignKey("course.id"), nullable=False)
    audio_path = db.Column(db.String(255), nullable=True)
    upload_date = db.Column(db.Float, nullable=True)
    duration = db.Column(db.Float, nullable=True)
    transcript = db.Column(db.Text, default="")
    description = db.Column(db.Text, default="")
    summary = db.Column(db.Text, default="")
    summary_status = db.Column(db.String(50), default="NOT_STARTED")
    last_updated = db.Column(
        db.Float, default=lambda: datetime.now(timezone.utc).timestamp()
    )
    notes = db.Column(MutableList.as_mutable(db.JSON), default=[])


class Chat(db.Model):
    """Represents a chat session for a lecture."""

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    lecture_id = db.Column(db.String(36), db.ForeignKey("lecture.id"), nullable=False)
    created_at = db.Column(db.Float, default=lambda: datetime.now(timezone.utc).timestamp())

    messages = db.relationship("ChatMessage", backref="chat", lazy=True)


class ChatMessage(db.Model):
    """Represents a message within a chat."""

    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    chat_id = db.Column(db.String(36), db.ForeignKey("chat.id"), nullable=False)
    sender = db.Column(db.String(50), nullable=False)  # User or AI
    message = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.Float, default=lambda: datetime.now(timezone.utc).timestamp())


# Create tables
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")

@celery.task(bind=True, max_retries=3)
def get_chat_response_task(self, chat_id):
    """Generates an AI response using Gemini based on lecture summary and chat history."""
    from ai_agent import AIAgent
    from dotenv import load_dotenv

    with app.app_context():
        chat = Chat.query.get(chat_id)
        if not chat:
            return

        lecture = Lecture.query.get(chat.lecture_id)
        if not lecture or not lecture.summary:
            print(f"Lecture or summary not found for chat {chat_id}")
            return

        try:
            load_dotenv()
            api_key = os.getenv("GOOGLE_API_KEY")
            if not api_key:
                raise ValueError("GOOGLE_API_KEY is not set")

            agent = AIAgent(api_key=api_key)

            messages = ChatMessage.query.filter_by(chat_id=chat.id).order_by(ChatMessage.timestamp).all()
            message_data = [{"sender": m.sender, "message": m.message} for m in messages]

            if not message_data:
                print(f"No user messages yet in chat {chat_id}")
                return

            last_user_input = message_data[-1]["message"]
            response = agent.chat_response(
                context=lecture.summary,
                messages=messages,
                user_input=last_user_input
            )

            ai_message = ChatMessage(
                chat_id=chat.id,
                sender="AI",
                message=response,
                timestamp=datetime.now(timezone.utc).timestamp()
            )
            db.session.add(ai_message)
            db.session.commit()

        except Exception as e:
            print(f"Error generating AI chat response for {chat_id}: {e}")
            raise self.retry(exc=e, countdown=60)

@app.route("/courses", methods=["GET"])
def get_courses():
    """Fetches all courses with the number of lectures."""
    courses = Course.query.all()
    response = []
    
    for course in courses:
        num_lectures = Lecture.query.filter_by(course_id=course.id).count()
        
        response.append(
            {
                "courseID": course.id,
                "courseName": course.name,
                "courseSummary": course.summary,
                "lastUpdated": course.last_updated,
                "lectures": [0] * num_lectures 
            }
        )

    return jsonify(response)


@app.route("/courses/<course_id>", methods=["GET"])
def get_course(course_id):
    """Fetches a single course by ID."""
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404

    num_lectures = Lecture.query.filter_by(course_id=course.id).count()
    return jsonify(
        {
            "courseID": course.id,
            "courseName": course.name,
            "courseSummary": course.summary,
            "lastUpdated": course.last_updated,
            "lectures": [0] * num_lectures 
        }
    )


@app.route("/courses", methods=["POST"])
def create_course():
    """Creates a new course."""
    data = request.json
    course = Course(name=data["courseName"], summary=data["courseSummary"])
    db.session.add(course)
    db.session.commit()
    return (
        jsonify(
            {
                "id": course.id,
                "name": course.name,
                "summary": course.summary,
                "last_updated": course.last_updated,
            }
        ),
        201,
    )


@app.route("/courses/<course_id>/lectures", methods=["GET"])
def get_lectures(course_id):
    """Fetches all lectures for a given course."""
    lectures = Lecture.query.filter_by(course_id=course_id).all()
    return jsonify(
        [
            {
                "lectureID": l.id,
                "lectureTitle": l.title,
                "summaryStatus": l.summary_status,
                "description": l.description,
                "duration": l.duration if l.duration else 0,
                "uploadDate": l.upload_date,
                "summary": l.summary,
                "notes": l.notes,
            }
            for l in lectures
        ]
    )


@app.route("/courses/<course_id>/lectures", methods=["POST"])
def create_lecture(course_id):
    """Creates a new lecture in a course."""
    data = request.json
    lecture = Lecture(
        title=data["lectureTitle"],
        course_id=course_id,
        description=f'Lecture on {data["lectureTitle"]}',
    )
    db.session.add(lecture)
    db.session.commit()
    return (
        jsonify(
            {
                "lectureID": lecture.id,
                "title": lecture.title,
                "course_id": lecture.course_id,
                "description": lecture.description,
                "duration": lecture.duration,
                "date": lecture.upload_date,
                "notes": lecture.notes,
            }
        ),
        201,
    )


@app.route("/lectures/<lecture_id>", methods=["DELETE"])
def delete_lecture(lecture_id):
    """Deletes a specific lecture by lecture_id."""
    lecture = Lecture.query.get(lecture_id)
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404

    # Remove the lecture from the associated course
    course = Course.query.get(lecture.course_id)
    if course:
        course_lectures = [l.id for l in Lecture.query.filter_by(course_id=course.id).all()]
        if lecture_id in course_lectures:
            course_lectures.remove(lecture_id)
            db.session.commit()

    db.session.delete(lecture)
    db.session.commit()

    return jsonify({"message": "Lecture deleted successfully"}), 200


@app.route("/lectures/<lecture_id>", methods=["GET"])
def get_lecture(lecture_id):
    """Fetches details of a specific lecture."""
    lecture = Lecture.query.get(lecture_id)
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404
    return jsonify(
        {
            "lectureID": lecture.id,
            "lectureTitle": lecture.title,
            "summaryStatus": lecture.summary_status,
            "transcript": lecture.transcript,
            "description": lecture.description,
            "duration": lecture.duration,
            "date": lecture.upload_date,
            "notes": lecture.notes,
        }
    )


@app.route("/courses/<course_id>/lectures/<lecture_id>/upload-audio", methods=["POST"])
def upload_audio(course_id, lecture_id):
    """Uploads an audio file for a lecture and triggers transcription."""
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400

    file = request.files["audio"]
    filename = f"{lecture_id}.mp3"
    filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(filepath)

    audio = MP3(filepath)
    duration = audio.info.length

    lecture = Lecture.query.get(lecture_id)
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404

    lecture.audio_path = filepath
    lecture.upload_date = datetime.now(timezone.utc).timestamp()
    lecture.duration = duration
    lecture.summary_status = "IN_PROGRESS"
    db.session.commit()

    transcribe_audio_task.delay(filepath, lecture_id)
    return jsonify({"message": "Audio uploaded, transcription in progress"}), 200


@app.route("/debug/lectures/<lecture_id>/regenerate-notes", methods=["POST"])
def regenerate_notes(lecture_id):
    """Debug-only endpoint to retrigger Gemini-based note generation for an existing lecture summary."""
    lecture = Lecture.query.get(lecture_id)
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404

    if not lecture.summary or not lecture.transcript:
        return jsonify({"error": "Transcript/summary missing. Cannot regenerate notes."}), 400

    generate_notes_task.delay(lecture_id)
    return jsonify({"message": f"Note generation re-triggered for lecture {lecture_id}"}), 202

@celery.task(bind=True, max_retries=3)
def transcribe_audio_task(self, audio_path, lecture_id):
    """Celery task to process and transcribe lecture audio."""
    with app.app_context():
        try:
            logging.info(f"Transcribing audio for lecture {lecture_id} from {audio_path}")
            transcript_val = transcription.transcribe_audio(audio_path)
            logging.info(f"Transcript generated for {lecture_id}")
            summary = summarize_transcript(transcript_val)
            logging.info(f"Summary generated for {lecture_id}")
            
            lecture = Lecture.query.get(lecture_id)
            if lecture:
                lecture.transcript = transcript_val
                lecture.summary = summary
                lecture.summary_status = "TRANSCRIBED"
                lecture.last_updated = datetime.now(timezone.utc).timestamp()
                db.session.commit()

                generate_notes_task.delay(lecture_id)
            else:
                logging.error(f"Lecture {lecture_id} not found.")
        except Exception as e:
            logging.error(f"Error processing transcription for {lecture_id}: {str(e)}")
            raise self.retry(exc=e, countdown=60)

@celery.task(bind=True, max_retries=3)
def generate_notes_task(self, lecture_id):
    """Celery task to generate notes from a lecture summary using Gemini."""
    from ai_agent import AIAgent
    from dotenv import load_dotenv

    with app.app_context():
        lecture = Lecture.query.get(lecture_id)
        if not lecture or not lecture.summary:
            print(f"Lecture not found or empty summary for lecture {lecture_id}")
            return

        try:
            load_dotenv()
            api_key = os.getenv("GOOGLE_API_KEY")
            if not api_key:
                raise ValueError("GOOGLE_API_KEY is not set")

            agent = AIAgent(api_key=api_key)
            notes = agent.generate_notes(title=lecture.title, transcript=lecture.summary)

            lecture.notes = [notes]
            lecture.summary_status = "COMPLETED"
            lecture.last_updated = datetime.now(timezone.utc).timestamp()
            db.session.commit()

            print(f"Gemini notes generated for lecture {lecture_id}")

        except Exception as e:
            print(f"Notes generation failed for {lecture_id}, retrying... {str(e)}")
            raise self.retry(exc=e, countdown=60)

@app.route("/lectures/<lecture_id>/chat", methods=["GET"])
def create_chat(lecture_id):
    """Creates a new chat for a lecture."""
    lecture = Lecture.query.get(lecture_id)
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404

    chat = Chat(lecture_id=lecture_id)
    db.session.add(chat)
    db.session.commit()

    return jsonify({"chatID": chat.id}), 201


@app.route("/chat/<chat_id>", methods=["GET"])
def get_chat_messages(chat_id):
    """Fetches all messages from a specific chat in chronological order."""
    chat = Chat.query.get(chat_id)
    if not chat:
        return jsonify({"error": "Chat not found"}), 404

    messages = ChatMessage.query.filter_by(chat_id=chat_id).order_by(ChatMessage.timestamp).all()
    return jsonify(
        [
            {
                "sender": m.sender,
                "message": m.message,
                "timestamp": m.timestamp,
            }
            for m in messages
        ]
    )


@app.route("/chat/<chat_id>", methods=["POST"])
def post_chat_message(chat_id):
    """Posts a new message to a chat."""
    data = request.json
    message_content = data.get("message")
    sender = data.get("type")

    if not message_content or not sender:
        return jsonify({"error": "Message content or sender is missing"}), 400

    chat = Chat.query.get(chat_id)
    if not chat:
        return jsonify({"error": "Chat not found"}), 404

    # Add the message to the chat
    chat_message = ChatMessage(
        chat_id=chat.id,
        sender=sender,
        message=message_content,
        timestamp=datetime.now(timezone.utc).timestamp()
    )
    db.session.add(chat_message)
    db.session.commit()

    # If it's a user message, trigger a response generation
    if sender == "User":
        get_chat_response_task.delay(chat.id)

    return jsonify({"message": "Message added successfully"}), 201


@app.route("/lectures/<lecture_id>/save-note", methods=["POST"])
def save_note(lecture_id):
    """Saves a user note to the lecture."""
    data = request.json
    content = data.get("content")

    if not content:
        return jsonify({"error": "Note content is missing"}), 400

    lecture = Lecture.query.get(lecture_id)
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404

    note = {
        "id": str(uuid.uuid4()),
        "title": "Custom Note",
        "summary": "This is a user-added note. Summary is currently a placeholder.",
        "content": content,
        "date_generated": datetime.now(timezone.utc).timestamp(),
    }

    lecture.notes.append(note)
    lecture.last_updated = datetime.now(timezone.utc).timestamp()
    db.session.commit()

    return jsonify({"message": "Note saved successfully"}), 201


@app.route("/chat/<chat_id>", methods=["DELETE"])
def delete_chat(chat_id):
    """Deletes a chat and its messages."""
    chat = Chat.query.get(chat_id)
    if not chat:
        return jsonify({"error": "Chat not found"}), 404

    # Delete associated messages first
    ChatMessage.query.filter_by(chat_id=chat_id).delete()

    db.session.delete(chat)
    db.session.commit()

    return jsonify({"message": "Chat deleted successfully"}), 200


def handle_sigterm(signal, frame):
    """Handles SIGTERM signal for graceful shutdown."""
    print("Shutting down server...")
    sys.exit(0)


signal.signal(signal.SIGTERM, handle_sigterm)

if __name__ == "__main__":
    app.run(debug=True)

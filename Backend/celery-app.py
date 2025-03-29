import signal
import sys
import uuid
import os
from datetime import datetime, timezone
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from mutagen.mp3 import MP3
from celery import Celery
from Transcription import transcription
from Transcription.transcription import summarize_transcript

app = Flask(__name__)

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
    notes = db.Column(db.Text, default="")


# Create DB Tables
with app.app_context():
    db.create_all()
    print("Database tables created successfully!")


@app.before_request
def restart_pending_transcriptions():
    """Requeues any transcription jobs that were in progress before a restart."""
    # The following line will remove this handler, making it
    # only run on the first request
    app.before_request_funcs[None].remove(restart_pending_transcriptions)

    pending_lectures = Lecture.query.filter_by(summary_status="IN_PROGRESS").all()
    for lecture in pending_lectures:
        print(f"Restarting transcription for {lecture.id}")
        transcribe_audio_task.delay(lecture.audio_path, lecture.id)


@app.route("/", methods=["GET"])
def hello_server():
    """Health check endpoint."""
    return jsonify("Hello world")


@app.route("/courses", methods=["GET"])
def get_courses():
    """Fetches all courses."""
    courses = Course.query.all()
    return jsonify(
        [
            {
                "id": c.id,
                "name": c.name,
                "summary": c.summary,
                "last_updated": c.last_updated,
            }
            for c in courses
        ]
    )


@app.route("/courses/<course_id>", methods=["GET"])
def get_course(course_id):
    """Fetches a single course by ID."""
    course = Course.query.get(course_id)
    if not course:
        return jsonify({"error": "Course not found"}), 404
    return jsonify(
        {
            "courseID": course.id,
            "courseName": course.name,
            "courseSummary": course.summary,
            "lastUpdated": course.last_updated,
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
                "id": lecture.id,
                "title": lecture.title,
                "course_id": lecture.course_id,
                "description": lecture.description,
            }
        ),
        201,
    )


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
            "summary": lecture.summary,
            "notes": lecture.notes,
        }
    )


@app.route("/lectures/<lecture_id>/upload-audio", methods=["POST"])
def upload_audio(lecture_id):
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


@celery.task(bind=True, max_retries=3)
def transcribe_audio_task(self, audio_path, lecture_id):
    """Celery task to process and transcribe lecture audio."""
    with app.app_context():
        lecture = Lecture.query.get(lecture_id)
        if not lecture:
            return
        try:
            transcript_val = transcription.transcribe_audio(audio_path)
            summary = summarize_transcript(transcript_val)

            lecture.transcript = transcript_val
            lecture.summary = summary
            lecture.summary_status = "COMPLETED"
            lecture.last_updated = datetime.now(timezone.utc).timestamp()
            db.session.commit()
        except Exception as e:
            lecture.summary_status = "FAILED"
            db.session.commit()
            print(f"Transcription failed for {lecture_id}, retrying... {str(e)}")
            raise self.retry(exc=e, countdown=60)



@app.route("/lectures/<lecture_id>", methods=["DELETE"])
def delete_lecture(lecture_id):
    """Deletes a specific lecture."""
    lecture = Lecture.query.get(lecture_id)
    if not lecture:
        return jsonify({"error": "Lecture not found"}), 404

    db.session.delete(lecture)
    db.session.commit()
    return jsonify({"message": "Lecture deleted successfully"}), 200


def handle_sigterm(signal, frame):
    """Handles SIGTERM signal for graceful shutdown."""
    print("Shutting down server...")
    sys.exit(0)


signal.signal(signal.SIGTERM, handle_sigterm)

if __name__ == "__main__":
    app.run(debug=True)

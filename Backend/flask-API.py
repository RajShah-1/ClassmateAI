from flask import Flask, request, jsonify
import uuid
import json
import os
import threading
import requests

from datetime import datetime, timezone
from mutagen.mp3 import MP3

from Transcription import transcription
from Transcription.transcription import summarize_transcript

app = Flask(__name__)

COURSES_FILE = 'courses.json'
LECTURES_FILE = 'lectures.json'
UPLOAD_FOLDER = 'uploads'
CHATS_FILE = 'chats.json'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def load_data(file):
    if os.path.exists(file):
        with open(file, 'r') as f:
            return json.load(f)
    return {}


def save_data(file, data):
    with open(file, 'w') as f:
        json.dump(data, f, indent=4)


@app.route('/courses', methods=['GET'])
def get_courses():
    courses = load_data(COURSES_FILE)
    return jsonify(list(courses.values()))


@app.route('/courses', methods=['POST'])
def create_course():
    data = request.json
    course_id = str(uuid.uuid4())
    course = {
        'courseID': course_id,
        'courseName': data['courseName'],
        'courseSummary': data['courseSummary'],
        'lastUpdated': datetime.now(timezone.utc).timestamp(),
        'lectures': []
    }
    courses = load_data(COURSES_FILE)
    courses[course_id] = course
    save_data(COURSES_FILE, courses)
    return jsonify(course), 201


@app.route('/courses/<course_id>', methods=['GET'])
def get_course(course_id):
    courses = load_data(COURSES_FILE)
    if course_id in courses:
        return jsonify(courses[course_id])
    return jsonify({'error': 'Course not found'}), 404


@app.route('/', methods=['GET'])
def hello_server():
    return jsonify('Hello world')


@app.route('/courses/<course_id>/lectures', methods=['POST'])
def create_lecture(course_id):
    data = request.json
    courses = load_data(COURSES_FILE)
    lecture_id = str(uuid.uuid4())
    lecture = {
        'lectureID': lecture_id,
        'lectureTitle': data['lectureTitle'],
        'audioPath': '',
        'uploadDate': '',
        'duration': '',
        'transcript': '',
        'description': f'Lecture on {data["lectureTitle"]}',
        'summary': '',
        'summaryStatus': 'NOT_STARTED',
        'lastUpdated': datetime.now(timezone.utc).timestamp(),
        'notes': []  # Initialize notes as an empty list
    }
    lectures = load_data(LECTURES_FILE)
    lectures[lecture_id] = lecture
    save_data(LECTURES_FILE, lectures)
    courses[course_id]['lectures'].append(lecture_id)
    save_data(COURSES_FILE, courses)
    return jsonify(lecture), 201


@app.route('/courses/<course_id>/lectures', methods=['GET'])
def get_lectures(course_id):
    courses = load_data(COURSES_FILE)
    if course_id not in courses:
        return jsonify({'error': 'Course not found'}), 404

    lectures = load_data(LECTURES_FILE)
    course_lectures = [lectures[lecture_id] for lecture_id in courses[course_id]['lectures'] if lecture_id in lectures]
    return jsonify(course_lectures)


@app.route('/lectures/<lecture_id>', methods=['GET'])
def get_lecture(lecture_id):
    lectures = load_data(LECTURES_FILE)
    if lecture_id in lectures:
        return jsonify(lectures[lecture_id])
    return jsonify({'error': 'Lecture not found'}), 404


@app.route('/lectures/<lecture_id>', methods=['DELETE'])
def delete_lecture(lecture_id):
    lectures = load_data(LECTURES_FILE)
    if lecture_id not in lectures:
        return jsonify({'error': 'Lecture not found'}), 404

    del lectures[lecture_id]
    save_data(LECTURES_FILE, lectures)

    # Remove lecture from the corresponding course
    # Assm: each lecture belongs to only one course
    courses = load_data(COURSES_FILE)
    for course in courses.values():
        if lecture_id in course['lectures']:
            course['lectures'].remove(lecture_id)
            save_data(COURSES_FILE, courses)
            break

    return jsonify({'message': 'Lecture deleted successfully'}), 200


def get_transcript(audio_path, lecture):
    transcript_val = transcription.transcribe_audio(audio_path)
    lecture['transcript'] = transcript_val
    summary = summarize_transcript(transcript_val)
    lecture['summary'] = summary
    lecture['lastUpdated'] = datetime.now(timezone.utc).timestamp()
    lecture['summaryStatus'] = 'COMPLETED'
    return lecture


def process_transcription(audio_path, lecture_id):
    lectures = load_data(LECTURES_FILE)
    if lecture_id in lectures:
        transcript_val = transcription.transcribe_audio(audio_path)
        summary = summarize_transcript(transcript_val)

        lectures[lecture_id]['transcript'] = transcript_val
        lectures[lecture_id]['summary'] = summary
        lectures[lecture_id]['lastUpdated'] = datetime.now(timezone.utc).timestamp()
        lectures[lecture_id]['summaryStatus'] = 'COMPLETED'
        save_data(LECTURES_FILE, lectures)


@app.route('/courses/<course_id>/lectures/<lecture_id>/upload-audio', methods=['POST'])
def upload_audio(course_id, lecture_id):
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400

    file = request.files['audio']
    filename = f"{lecture_id}.mp3"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    audio = MP3(filepath)
    duration = audio.info.length

    lectures = load_data(LECTURES_FILE)
    if lecture_id in lectures:
        lectures[lecture_id]['audioPath'] = filepath
        lectures[lecture_id]['uploadDate'] = datetime.now(timezone.utc).timestamp()
        lectures[lecture_id]['duration'] = duration
        lectures[lecture_id]['summaryStatus'] = 'IN_PROGRESS'
        lectures[lecture_id]['transcript'] = 'Taking notes from audio...'
        lectures[lecture_id]['summary'] = 'Generating summary...'
        save_data(LECTURES_FILE, lectures)

        # Start background thread for transcription
        threading.Thread(target=process_transcription, args=(filepath, lecture_id)).start()

        return jsonify(lectures[lecture_id])
    return jsonify({'error': 'Lecture not found'}), 404


@app.route('/lectures/<lecture_id>/chat', methods=['GET'])
def create_chat(lecture_id):
    lectures = load_data(LECTURES_FILE)
    if lecture_id not in lectures:
        return jsonify({'error': 'Lecture not found'}), 404

    chat_id = str(uuid.uuid4())
    chat = {
        'chatID': chat_id,
        'lectureID': lecture_id,
        'messages': [],
        'createdAt': datetime.now(timezone.utc).timestamp()
    }

    chats = load_data(CHATS_FILE)
    chats[chat_id] = chat
    save_data(CHATS_FILE, chats)

    return jsonify({'chatID': chat_id}), 201


@app.route('/chat/<chat_id>', methods=['GET'])
def get_chat(chat_id):
    chats = load_data(CHATS_FILE)
    if chat_id not in chats:
        return jsonify({'error': 'Chat not found'}), 404

    return jsonify(chats[chat_id]['messages']), 200


@app.route('/chat/<chat_id>', methods=['POST'])
def post_message(chat_id):
    data = request.json
    message_type = data.get('type', '')  # Should be 'User' or 'AI'
    message_content = data.get('message', '')
    lectures = load_data(LECTURES_FILE)
    if not message_type or not message_content:
        return jsonify({'error': 'Message type or content is missing'}), 400

    chats = load_data(CHATS_FILE)
    if chat_id not in chats:
        return jsonify({'error': 'Chat not found'}), 404

    # Creating a message object
    if len(chats[chat_id]['messages']) == 0:
        message_content = f"{message_content} use this summary as context {lectures[chats[chat_id]['lectureID']]['summary']}"
    message = {
        'type': message_type,
        'content': message_content,
        'timestamp': datetime.now(timezone.utc).isoformat()
    }

    # Append the message to the chat
    chats[chat_id]['messages'].append(message)
    save_data(CHATS_FILE, chats)
    # Start a background thread to call the Perplexity API
    threading.Thread(target=get_chat_response, args=(chat_id, chats)).start()

    return jsonify({'message': 'Message added successfully'}), 201

@app.route('/chat/<chat_id>', methods=['DELETE'])
def delete_chat(chat_id):
    chats = load_data(CHATS_FILE)
    if chat_id not in chats:
        return jsonify({'error': 'Chat not found'}), 404

    del chats[chat_id]
    save_data(CHATS_FILE, chats)

    return jsonify({'message': 'Chat deleted successfully'}), 200


@app.route('/lectures/<lecture_id>/save-note', methods=['POST'])
def save_note(lecture_id):
    data = request.json
    note_content = data.get('content', '')

    if not note_content:
        return jsonify({'error': 'Note content is empty'}), 400

    lectures = load_data(LECTURES_FILE)
    if lecture_id not in lectures:
        return jsonify({'error': 'Lecture not found'}), 404

    # Append the new note to the list of notes in the lecture
    if 'notes' not in lectures[lecture_id]:
        lectures[lecture_id]['notes'] = []

    lectures[lecture_id]['notes'].append(note_content)
    lectures[lecture_id]['lastUpdated'] = datetime.now(timezone.utc).timestamp()
    save_data(LECTURES_FILE, lectures)

    return jsonify({'message': 'Note saved successfully'}), 201

def get_chat_response(chat_id, chats):
    # Get the full chat history for the given chat_id
    chat_history = chats[chat_id]['messages']
    api_key = os.environ.get('PERPLEXITY_API_KEY')
    if not api_key:
        raise ValueError("Perplexity API key not found in environment variables")
    # Prepare messages for Perplexity API
    messages = []
    for msg in chat_history:
        role = 'user' if msg['type'] == 'User' else 'assistant'
        messages.append({'role': role, 'content': msg['content']})

    # Add a system message for Markdown formatting
    messages.insert(0, {'role': 'system', 'content': 'Respond in Markdown format accurately'})

    # Prepare the payload for Perplexity API
    payload = {
        "model": "sonar",
        "messages": messages,
        "temperature": 0.2,
        "top_p": 0.9,
        "return_images": False,
        "return_related_questions": False,
        "top_k": 0,
        "stream": False,
        "presence_penalty": 0,
        "frequency_penalty": 1,
        "response_format": {"type": "text"},
        "web_search_options": {"search_context_size": "high"}
    }

    # Replace with your actual Perplexity API endpoint and key
    api_url = 'https://api.perplexity.ai/chat/completions'
    headers = {
        "Authorization": f"Bearer {api_key}",
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(api_url, json=payload, headers=headers)
        response_data = response.json()

        # Log or handle the response from Perplexity API
        #print(f"Perplexity API response for chat {chat_id}: {response_data}")

        # Optionally save the AI's response back to the chat history
        if response.status_code == 200 and 'choices' in response_data:
            ai_message = {
                'type': 'AI',
                'content': response_data['choices'][0]['message']['content'],
                'timestamp': datetime.now(timezone.utc).isoformat()
            }
            chats[chat_id]['messages'].append(ai_message)
            save_data(CHATS_FILE, chats)

    except Exception as e:
        print(f"Error while calling Perplexity API for chat {chat_id}: {e}")

if __name__ == '__main__':
    app.run(debug=True)
    app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024

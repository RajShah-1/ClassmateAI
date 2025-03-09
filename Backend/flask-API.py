from flask import Flask, request, jsonify
import uuid
import json
import os
import threading

from datetime import datetime, timezone
from mutagen.mp3 import MP3

from Transcription import transcription
from Transcription.transcription import summarize_transcript

app = Flask(__name__)

COURSES_FILE = 'courses.json'
LECTURES_FILE = 'lectures.json'
UPLOAD_FOLDER = 'uploads'
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
        'lastUpdated': datetime.now(timezone.utc).timestamp()
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

if __name__ == '__main__':
    app.run(debug=True)
    app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024
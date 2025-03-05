from flask import Flask, request, jsonify
import uuid
import json
import os
import datetime
from mutagen.mp3 import MP3

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

@app.route('/courses', methods=['POST'])
def create_course():
    data = request.json
    course_id = str(uuid.uuid4())
    course = {
        'CourseID': course_id,
        'CourseName': data['CourseName'],
        'CourseSummary': data['CourseSummary'],
        'LastUpdated': datetime.datetime.utcnow().isoformat(),
        'Lectures': []
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
    lecture_id = str(uuid.uuid4())
    lecture = {
        'LectureID': lecture_id,
        'LectureTitle': data['LectureTitle'],
        'AudioPath': '',
        'UploadDate': '',
        'Duration': '',
        'Transcript': '',
        'Summary': '',
        'SummaryStatus': 'NOT_STARTED'
    }
    lectures = load_data(LECTURES_FILE)
    lectures[lecture_id] = lecture
    save_data(LECTURES_FILE, lectures)
    return jsonify(lecture), 201

@app.route('/lectures/<lecture_id>', methods=['GET'])
def get_lecture(lecture_id):
    lectures = load_data(LECTURES_FILE)
    if lecture_id in lectures:
        return jsonify(lectures[lecture_id])
    return jsonify({'error': 'Lecture not found'}), 404

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
        lectures[lecture_id]['AudioPath'] = filepath
        lectures[lecture_id]['UploadDate'] = datetime.datetime.utcnow().isoformat()
        lectures[lecture_id]['Duration'] = duration
        lectures[lecture_id]['SummaryStatus'] = 'IN_PROGRESS'
        save_data(LECTURES_FILE, lectures)
        return jsonify(lectures[lecture_id])
    return jsonify({'error': 'Lecture not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
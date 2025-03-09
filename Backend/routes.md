```sh
curl -X POST http://127.0.0.1:5000/courses \
     -H "Content-Type: application/json" \
     -d '{
           "courseName": "Introduction to AI",
           "courseSummary": "This course covers the basics of Artificial Intelligence."
         }'

curl -X POST http://127.0.0.1:5000/courses/be696ea6-bca4-4be3-bb8e-ad8bb9be1635/lectures \
     -H "Content-Type: application/json" \
     -d '{
           "lectureTitle": "Introduction to Machine Learning"
         }'

curl -X POST "http://127.0.0.1:5000/courses/c454f860-c651-4b1d-9cc3-9497b08a2bad/lectures/82179f50-8d20-461a-ab26-0ef1f2a584d5/upload-audio" \
     -H "Content-Type: multipart/form-data" \
     -F "audio=@audio.mp3"
```

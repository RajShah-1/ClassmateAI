# ClassmateAI App

## Overview
The **ClassmateAI App** is a React Native application designed to assist students with managing their lecture notes, reviewing summaries, and engaging in AI-driven discussions about lecture content. The app allows users to upload audio lectures, generate notes, and interact with an AI chatbot to enhance their learning experience.

## Features
- **Course & Lecture Management**
  - View a list of available courses.
  - Access lectures within each course.
  - Upload audio files for lecture note generation.
  
- **Lecture Details & Summaries**
  - View lecture information and AI-generated summaries.
  - Expand and collapse summaries for a quick or detailed overview.

- **Note Management**
  - View saved notes for each lecture.
  - Read full note descriptions or toggle between short and expanded views.
  
- **AI Chatbot Integration (yet to be implemented)**
  - Engage in conversations with AI regarding lecture topics.

## Tech Stack
- **Frontend:** React Native with TypeScript
- **UI Components:** React Native Paper
- **Navigation:** React Navigation
- **File Handling:** Expo Document Picker
- **Data Fetching:** Custom API calls (fetchData.ts)
- **State Management:** React useState & useEffect hooks

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://yarnpkg.com/) or npm

## Get Started
1. Install dependencies
   ```bash
   npm install
   ```

2. Start the app
   ```bash
   npx expo start
   ```

3. To start ios app in simulator
   ```bash
   npm run ios
   ```

## Project Structure
```
├── components/
│   ├── ChatScreen.tsx          # AI Chat interface
│   ├── CourseScreen.tsx        # Course listing
│   ├── LecturesScreen.tsx      # Lectures within a course
│   ├── LectureDetails.tsx      # Lecture details and summaries
│   ├── NoteViewScreen.tsx      # Detailed note view
├── utils/
│   ├── fetchData.ts            # API calls for fetching lectures & notes
│   ├── uploadAudio.ts          # Function for audio file uploads
│   ├── styles.ts               # Shared styles for UI components
├── App.tsx                     # Main entry point
├── package.json                # Dependencies & scripts
├── README.md                   # Project documentation
```

## Interations with Backend Endpoints
- `fetchCourseData()`: Fetch list of courses.
- `fetchLectureData(courseId)`: Fetch lectures for a course.
- `fetchNoteListData(lectureId)`: Get notes for a lecture.
- `fetchNoteData(lectureId)`: Get detailed note content.
- `createLecture(courseId, title)`: Create a new lecture.
- `uploadAudioFile(uri, courseId, lectureId)`: Uploads an audio file.
- `deleteLecture(lectureId)`: Deletes a lecture if an upload fails.

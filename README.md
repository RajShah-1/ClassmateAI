# ClassmateAI

ClassmateAI is a collaborative educational assistant platform that automates lecture transcription, note generation, and personalized AI tutoring. It includes dedicated interfaces for instructors and students, powered by AI agents and backend infrastructure that supports audio processing, summarization, chat, and feedback workflows.

---

## Features

### For Students (React Native Mobile App)
- Google Auth login via Firebase
- Course and lecture browsing
- Audio file upload and transcription trigger
- AI-generated notes in markdown
- AI chatbot per lecture (contextual memory retained)
- Swipe-to-save chat messages as notes
- Note viewing and markdown rendering

### For Instructors (React Web App)
- Google Auth login via Firebase Web SDK
- Dashboard of courses and lectures
- Upload lectures (with audio)
- Monitor summary generation status (in-progress, completed, validated)
- View transcripts, AI-generated notes
- Validate/edit summaries manually

---

## AI Capabilities

### Lecture Processing
- **Transcription:** Uses OpenAI Whisper model
- **Summarization:** Perplexity/Gemini via LangChain prompts
- **Note Generation:** Perplexity/Gemini via LangChain prompts

### Chatbot
- Per-lecture memory
- Uses Perplexity/Gemini APIs
- Response in Markdown
- Chat histories stored in SQLite
- Message polling (client pulls latest AI response)

---

## Project Structure

```bash
.
├── Backend               # Flask + Celery + Whisper + Perplexity/Gemini
│   ├── app.py            # Lightweight Flask backend (no Celery)
│   ├── celery-app.py     # Production-grade backend with background tasks
│   ├── ai_agent.py       # LangChain Perplexity/Gemini-based note generator and chatbot
│   ├── Transcription/    # Whisper-based transcription
│   ├── uploads/          # Audio file storage
│   └── requirements.txt  # Backend dependencies
│
├── InstructorUI          # React + MUI web app
│   ├── src/pages/        # Pages like CoursesDashboard, LectureReview
│   ├── src/components/   # Upload, Layout, ProtectedRoute
│   ├── contexts/         # Firebase AuthContext
│   ├── services/         # API service hooks
│   └── App.tsx           # Route + Theme setup
│
└── StudentUI             # React Native mobile app
    ├── components/       # Screens (Course, Lecture, Chat, Notes)
    ├── utils/            # Styles, constants, fetch/upload logic
    ├── index.tsx         # Navigation stack and auth listener
    └── app.json          # Expo config
```

---

## Technologies Used

- **Frontend (Instructor)**: React, React Router, MUI
- **Frontend (Student)**: React Native, Expo, React Navigation
- **Backend**: Flask, Celery, SQLAlchemy, Whisper, LangChain
- **Auth**: Firebase Google Sign-In
- **AI**: Perplexity/Gemini API + Whisper
- **Storage**: SQLite, Local file uploads
- **Dev Tools**: Vite, EAS, Docker (optional), Notistack, Reanimated, MUI ThemeProvider

---

## Notable API Routes

- `POST /courses`
- `POST /courses/<courseId>/lectures`  - Create lecture
- `POST /courses/<courseId>/lectures/<lectureId>/upload-audio`
- `GET /lectures/<lectureId>` - Fetch lecture with notes
- `POST /lectures/<lectureId>/save-note` - Add note
- `GET /lectures/<lectureId>/last-chat` / `POST /chat/<chatId>`

---

## Academic Capabilities

- Works well for lecture-heavy courses
- Allows instructor curation of AI-generated notes
- Enables interactive Q&A for students on a per-lecture basis
- Tracks note views, engagement, scroll-depth metrics

---

## Contributors
- Raj Shah
- Raj Jignesh Shah
- Sahil Samantaray
- Achyuta Krishna

---

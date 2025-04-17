// src/services/dummyData.ts
// src/services/dummyData.ts
import type { Course, Lecture } from './api.interfaces'; // Define interfaces separately
 // Define interfaces separately

// --- Dummy Data ---

const dummyCourses: { [key: string]: Course } = {
  "course-101": {
    courseID: "course-101",
    courseName: "Introduction to Quantum Physics",
    courseSummary: "Fundamental concepts of quantum mechanics and its applications.",
    lastUpdated: Date.now() / 1000 - 86400, // Yesterday
    lectures: ["lecture-qp-1", "lecture-qp-2", "lecture-qp-3", "lecture-qp-4"],
  },
  "course-202": {
    courseID: "course-202",
    courseName: "Advanced Web Development",
    courseSummary: "Exploring modern frontend and backend technologies.",
    lastUpdated: Date.now() / 1000 - 172800, // Two days ago
    lectures: ["lecture-wd-1", "lecture-wd-2"],
  },
    "course-303": {
    courseID: "course-303",
    courseName: "History of Ancient Civilizations",
    courseSummary: "A survey of major ancient cultures.",
    lastUpdated: Date.now() / 1000 - 604800, // A week ago
    lectures: [], // No lectures yet
  },
};

const dummyLectures: { [key: string]: Lecture } = {
  "lecture-qp-1": {
    lectureID: "lecture-qp-1",
    lectureTitle: "Wave-Particle Duality",
    description: "Exploring the dual nature of matter and light.",
    uploadDate: Date.now() / 1000 - 90000,
    duration: 2750, // ~45 mins
    transcript: "Today we delve into one of the most bizarre concepts in quantum mechanics: wave-particle duality. Max Planck initially proposed quantization...\n\n...Erwin Schrödinger developed his famous wave equation...\n\n...The double-slit experiment clearly demonstrates this phenomenon...",
    summary: "This lecture introduces wave-particle duality, discussing Planck's quantization, Schrödinger's equation, and the double-slit experiment as key evidence.",
    summaryStatus: "COMPLETED", // Ready for review
    lastUpdated: Date.now() / 1000 - 86400,
    is_validated: false,
    validated_summary: "",
    notes: [],
  },
  "lecture-qp-2": {
    lectureID: "lecture-qp-2",
    lectureTitle: "Quantum Entanglement",
    description: "Understanding 'spooky action at a distance'.",
    uploadDate: Date.now() / 1000 - 80000,
    duration: 3100, // ~51 mins
    transcript: "Entanglement is perhaps the most counter-intuitive aspect. Einstein famously called it 'spukhafte Fernwirkung' or spooky action at a distance...\n\n...Imagine two particles linked in this way. Measuring the state of one instantly influences the state of the other, regardless of the distance separating them...",
    summary: "Covers quantum entanglement, Einstein's 'spooky action' phrase, and the basic concept of linked particle states influenced instantaneously over distance.",
    summaryStatus: "VALIDATED", // Already validated
    lastUpdated: Date.now() / 1000 - 70000,
    is_validated: true,
    validated_summary: "Instructor approved summary: This lecture explains quantum entanglement, referencing Einstein's 'spooky action at a distance'. It covers how measuring one entangled particle instantaneously affects the other, irrespective of distance.",
    notes: [],
  },
    "lecture-qp-3": {
    lectureID: "lecture-qp-3",
    lectureTitle: "The Uncertainty Principle",
    description: "Heisenberg's principle and its implications.",
    uploadDate: Date.now() / 1000 - 75000,
    duration: 1900, // ~31 mins
    transcript: "Processing audio... please wait...", // Simulate processing
    summary: "Processing audio...",
    summaryStatus: "IN_PROGRESS", // Still processing
    lastUpdated: Date.now() / 1000 - 5000, // Updated recently
    is_validated: false,
    validated_summary: "",
    notes: [],
  },
    "lecture-qp-4": {
    lectureID: "lecture-qp-4",
    lectureTitle: "Quantum Tunneling",
    description: "Particles passing through barriers.",
    uploadDate: Date.now() / 1000 - 72000,
    duration: 0, // Simulate processing error duration
    transcript: "Error during processing.",
    summary: "Error during processing.",
    summaryStatus: "ERROR", // Processing failed
    lastUpdated: Date.now() / 1000 - 6000,
    is_validated: false,
    validated_summary: "",
    notes: [],
  },
  "lecture-wd-1": {
    lectureID: "lecture-wd-1",
    lectureTitle: "React Hooks Deep Dive",
    description: "Understanding useState, useEffect, and custom hooks.",
    uploadDate: Date.now() / 1000 - 180000,
    duration: 3600, // 60 mins
    transcript: "Let's start with the most fundamental hook, useState. It allows functional components to manage state...\n\n...Then there's useEffect for handling side effects like data fetching or subscriptions...\n\n...Building custom hooks is crucial for reusable logic...",
    summary: "A deep dive into React Hooks, focusing on useState for state management, useEffect for side effects, and the importance of creating custom hooks for logic reuse.",
    summaryStatus: "COMPLETED",
    lastUpdated: Date.now() / 1000 - 170000,
    is_validated: false,
    validated_summary: "",
    notes: [],
  },
  "lecture-wd-2": {
    lectureID: "lecture-wd-2",
    lectureTitle: "State Management Patterns",
    description: "Comparing Context API, Redux, and Zustand.",
    uploadDate: null, // Not uploaded yet
    duration: 0,
    summaryStatus: "NOT_STARTED", // Not uploaded
    lastUpdated: Date.now() / 1000 - 172800,
    is_validated: false,
    validated_summary: "",
    notes: [],
  },
};

export { dummyCourses, dummyLectures };
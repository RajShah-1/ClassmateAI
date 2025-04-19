// src/services/api.mock.ts
import {dummyCourses, dummyLectures } from './dummyData';
import type { Course, Lecture } from './api.interfaces';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Keep track of changes locally for the demo
let localCourses = JSON.parse(JSON.stringify(dummyCourses));
let localLectures = JSON.parse(JSON.stringify(dummyLectures));

// --- Mock API Functions ---

export const getCourses = async (): Promise<Course[]> => {
  console.log("MOCK API: getCourses called");
  await delay(500); // Simulate network latency
  // Return courses as an array
  return Object.values(localCourses);
};

export const getCourseLectures = async (courseId: string): Promise<Lecture[]> => {
  console.log(`MOCK API: getCourseLectures called for ${courseId}`);
  await delay(600);
  const course = localCourses[courseId];
  if (!course) {
    throw new Error("Course not found");
  }
  const lectureIds = course.lectures || [];
  const lectures = lectureIds.map(id => localLectures[id]).filter(Boolean); // Get lecture objects
  return lectures;
};

export const getLectureDetails = async (lectureId: string): Promise<Lecture> => {
  console.log(`MOCK API: getLectureDetails called for ${lectureId}`);
  await delay(400);
  const lecture = localLectures[lectureId];
  if (!lecture) {
    throw new Error("Lecture not found");
  }
  return lecture;
};

export const createLectureRecord = async (courseId: string, title: string): Promise<Lecture> => {
  console.log(`MOCK API: createLectureRecord called for course ${courseId} with title "${title}"`);
  await delay(300);
  if (!localCourses[courseId]) {
      throw new Error("Course not found");
  }

  const newLectureId = `lecture-new-${Date.now()}`;
  const newLecture: Lecture = {
    lectureID: newLectureId,
    lectureTitle: title,
    description: `Newly created lecture: ${title}`,
    summaryStatus: 'NOT_STARTED', // Initially not started
    lastUpdated: Date.now() / 1000,
    is_validated: false,
    validated_summary: "",
    uploadDate: null,
    duration: 0,
    transcript: "",
    summary: "",
    notes: [],
  };

  localLectures[newLectureId] = newLecture;
  localCourses[courseId].lectures.push(newLectureId); // Add to course

  console.log("MOCK API: Created lecture:", newLecture);
  return newLecture;
};

export const uploadLectureAudio = async (courseId: string, lectureId: string, file: File): Promise<Lecture> => {
  console.log(`MOCK API: uploadLectureAudio called for lecture ${lectureId} with file "${file.name}"`);
  await delay(1500); // Simulate upload time

  if (!localLectures[lectureId]) {
    throw new Error("Lecture not found");
  }

  // Update the local lecture state to simulate processing start
  localLectures[lectureId] = {
    ...localLectures[lectureId],
    audioPath: `uploads/${file.name}`, // Mock path
    uploadDate: Date.now() / 1000,
    duration: Math.random() * 3600 + 600, // Random duration 10-70 mins
    summaryStatus: 'IN_PROGRESS',
    transcript: 'Processing audio...',
    summary: 'Processing audio...',
    lastUpdated: Date.now() / 1000,
  };

  // Simulate background processing completion after a delay
  setTimeout(() => {
    console.log(`MOCK API: Simulating processing completion for ${lectureId}`);
    if (localLectures[lectureId]) { // Check if lecture still exists
      localLectures[lectureId] = {
        ...localLectures[lectureId],
        transcript: `This is a simulated transcript for ${file.name}. Lorem ipsum dolor sit amet...`,
        summary: `Simulated summary: Focuses on key aspects of ${file.name}. Covers topics A, B, and C.`,
        summaryStatus: 'COMPLETED',
        lastUpdated: Date.now() / 1000,
      };
      console.log(`MOCK API: Lecture ${lectureId} processing complete.`);
    }
  }, 8000); // Simulate 8 seconds processing time

  return localLectures[lectureId]; // Return the 'IN_PROGRESS' state immediately
};

export const validateSummary = async (lectureId: string, validatedSummary: string): Promise<Lecture> => {
  console.log(`MOCK API: validateSummary called for lecture ${lectureId}`);
  await delay(700); // Simulate save time

  if (!localLectures[lectureId]) {
    throw new Error("Lecture not found");
  }
   if (localLectures[lectureId].summaryStatus === 'IN_PROGRESS' || localLectures[lectureId].summaryStatus === 'NOT_STARTED') {
        throw new Error("Cannot validate summary until processing is complete")
   }

  // Update the local lecture state
  localLectures[lectureId] = {
    ...localLectures[lectureId],
    is_validated: true,
    validated_summary: validatedSummary,
    summaryStatus: 'VALIDATED',
    lastUpdated: Date.now() / 1000,
  };

  console.log(`MOCK API: Validated lecture ${lectureId}`);
  return localLectures[lectureId];
};

// --- Export Interfaces (if defined here) ---
export type { Course, Lecture };
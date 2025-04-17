// src/services/api.ts
import axios from 'axios';

// Define your backend URL
// Use environment variables in a real app
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to include auth token if needed in the future
// apiClient.interceptors.request.use(async (config) => {
//   const token = await authInstance.currentUser?.getIdToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Define interfaces for expected data structures
export interface Course {
  courseID: string;
  courseName: string;
  courseSummary: string;
  lastUpdated: number;
  lectures: string[]; // Array of lecture IDs
}

export interface Lecture {
  lectureID: string;
  lectureTitle: string;
  audioPath?: string;
  uploadDate?: number;
  duration?: number;
  transcript?: string;
  description?: string;
  summary?: string; // AI Summary
  summaryStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'VALIDATED' | 'ERROR';
  lastUpdated: number;
  notes?: any[]; // Student notes (likely unused here)
  is_validated: boolean;
  validated_summary?: string; // Instructor Summary
}

// --- API Functions ---

export const getCourses = async (): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>('/courses');
  return response.data;
};

export const getCourseLectures = async (courseId: string): Promise<Lecture[]> => {
    const response = await apiClient.get<Lecture[]>(`/courses/${courseId}/lectures`);
    return response.data;
};

export const getLectureDetails = async (lectureId: string): Promise<Lecture> => {
    const response = await apiClient.get<Lecture>(`/lectures/${lectureId}`);
    return response.data;
};

export const createLectureRecord = async (courseId: string, title: string): Promise<Lecture> => {
    const response = await apiClient.post<Lecture>(`/courses/${courseId}/lectures`, { lectureTitle: title });
    return response.data;
};

export const uploadLectureAudio = async (courseId: string, lectureId: string, file: File): Promise<Lecture> => {
    const formData = new FormData();
    formData.append('audio', file);

    const response = await apiClient.post<Lecture>(
        `/courses/${courseId}/lectures/${lectureId}/upload-audio`,
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // Optional: Add progress tracking here if needed
        }
    );
    return response.data;
};

export const validateSummary = async (lectureId: string, validatedSummary: string): Promise<Lecture> => {
    const response = await apiClient.put<Lecture>(`/lectures/${lectureId}/validate`, {
        validated_summary: validatedSummary,
    });
    return response.data;
};

// Add createCourse, deleteLecture etc. if needed for instructor web app
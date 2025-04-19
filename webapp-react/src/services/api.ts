// src/services/api.ts
import axios from 'axios';
import type { Course, Lecture } from './api.interfaces';


// Define your backend URL
// Use environment variables in a real app
const API_BASE_URL = 'https://classmateai.westus2.cloudapp.azure.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
    const response = await apiClient.put<Lecture>(`/lectures/${lectureId}/validate-notes`, {
        validated_notes: validatedSummary,
    });
    return response.data;
};

// Add createCourse, deleteLecture etc. if needed for instructor web app
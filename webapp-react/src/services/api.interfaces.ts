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
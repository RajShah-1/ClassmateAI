import { BACKEND_URL } from "./constants";

export type NoteListData = { id: string; title: string; description: string; }[];
export type NoteData = { id: string; content: string; };
export type LectureData = { id: string; title: string; description: string; duration: string; date: string; }[];
export type CourseData = { id: string; title: string; description: string; lectures: number; date: string; }[];

export const createLecture = async (courseId: string, lectureTitle: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/courses/${courseId}/lectures`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ lectureTitle }),
        });

        if (!response.ok) {
            throw new Error('Failed to create lecture');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating lecture:', error);
        throw error;
    }
};

export const fetchNoteData = async (lectureId: string) => {
    const lectureResponse = await fetch(`${BACKEND_URL}/lectures/${lectureId}`);
    if (!lectureResponse.ok) {
        throw new Error("Failed to fetch lecture");
    }
    const lecture = await lectureResponse.json();
    
    if (lecture.summary) {
        return {
            id: lectureId,
            content: lecture.summary
        };
    } else {
        return null;
    }
};

export const fetchNoteListData = async (courseId: string, lectureId?: string) => {
    const lectureResponse = await fetch(`${BACKEND_URL}/lectures/${courseId}`);
    console.log('fetching notes')
    if (!lectureResponse.ok) {
        console.log('failed to fetch notes')
        throw new Error("Failed to fetch lectures");
    }
    const lecture = await lectureResponse.json();

    return [{
        id: lecture.lectureId,
        title: `Organized Notes on ${lecture.lectureTitle}`,
        description: lecture.summary
    }];
};

export const fetchLectureData = async (courseId: string) => {
    const response = await fetch(`${BACKEND_URL}/courses/${courseId}/lectures`);
    if (!response.ok) {
        throw new Error("Failed to fetch lectures");
    }
    const data = await response.json();
    return data.map((lecture: any) => {
        const duration = lecture.duration === 0 ? "" : lecture.duration < 60 ? "<1 min" : `${Math.round(lecture.duration / 60)} min`;
        const date = (!lecture.uploadDate) ? "Not uploaded" : new Date(lecture.uploadDate * 1000).toDateString();

        return {
            id: lecture.lectureID,
            title: lecture.lectureTitle,
            description: lecture.description || "No transcript available",
            duration,
            date,
        };
    });
};

export const fetchCourseData = async () => {
    const response = await fetch(`${BACKEND_URL}/courses`);
    if (!response.ok) {
        throw new Error("Failed to fetch courses");
    }
    const data = await response.json();
    return Object.values(data).map((course: any) => ({
        id: course.courseID,
        title: course.courseName,
        description: course.courseSummary,
        lectures: course.lectures.length,
        date: new Date(course.lastUpdated * 1000).toDateString(),
    }));
};


export const deleteLecture = async (lectureId: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/lectures/${lectureId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete lecture');
        }
    } catch (error) {
        console.error('Error deleting lecture:', error);
    }
};
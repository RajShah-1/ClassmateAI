import { BACKEND_URL } from "./constants";

export type NoteListData = { id: string; title: string; description: string; summary: string; instructor_validated?: boolean;}[];
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

export const fetchNoteData = async (lectureId: string, noteId: string) => {
    const lectureResponse = await fetch(`${BACKEND_URL}/lectures/${lectureId}`);
    if (!lectureResponse.ok) {
        throw new Error("Failed to fetch lecture");
    }
    const lecture = await lectureResponse.json();
    
    if (lecture.notes) {
        // TODO: Fix this after implementing get note by note-id at backend.
        // iteate over notes and find the one with the same id
        for (const note of lecture.notes) {
            if (note.id === noteId) {
                return {
                    id: note.id,
                    content: note.content,
                };
            }
        }
    } 

    return null;
};

export const fetchNoteListData = async (lectureId: string) => {
    const lectureResponse = await fetch(`${BACKEND_URL}/lectures/${lectureId}`);
    if (!lectureResponse.ok) {
        throw new Error("Failed to fetch lectures");
    }
    const lecture = await lectureResponse.json();
    // console.log(lecture.notes.map((note: any) => ({
    //     id: note.id,
    //     title: note.title,
    //     description: note.summary,
    //     instructor_validated: note?.instructor_validated,
    // })));
    // console.log(lecture.summary);

    return lecture.notes.map((note: any) => ({
        id: note.id,
        title: note.title,
        description: note.summary,
        // TODO Fix below hack and return summary separately
        instructor_validated: note?.instructor_validated,
        summary: lecture.summary ? lecture.summary : 'No summary available',
    }));
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
        console.log("Failed to fetch courses", response);
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
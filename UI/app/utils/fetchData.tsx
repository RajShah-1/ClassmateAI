export type NoteData = { id: string; title: string; description: string; }[];
export type LectureData = { id: string; title: string; description: string; duration: string; date: string; }[];
export type CourseData = { id: string; title: string; description: string; lectures: number; date: string; }[];

export const fetchNoteData = async (): Promise<NoteData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', title: 'Binary Tree Notes', description: 'Notes on binary trees' },
                { id: '2', title: 'Dijkstra Doubts', description: 'Dijkstra algorithm explanations' },
            ]);
        }, 1000);
    });
};

export const fetchLectureData = async (): Promise<LectureData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', title: 'Time Complexity', description: 'Analyzing complexity', duration: '23 min', date: 'Today' },
                { id: '2', title: 'Stacks, Queues', description: 'Stack and queue usage', duration: '20 min', date: 'Yesterday' },
            ]);
        }, 1000);
    });
};

export const fetchCourseData = async (): Promise<CourseData> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', title: 'DSA', description: 'Data Structures & Algorithms', lectures: 3, date: 'Today' },
                { id: '2',  title: 'OS',  description: 'Fundamentals of Computer Operating Systems',  lectures: 5,  date: '2 days ago' },
                { id: '3',  title: 'MAS',  description: 'Introduction to development of Mobile Applications and Services',  lectures: 3,  date: 'Today' },
            ]);
        }, 1000);
    });
};

  
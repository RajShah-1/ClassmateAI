import * as FileSystem from 'expo-file-system';
import { BACKEND_URL, AUDIO_UPLOAD_TIMEOUT_MS } from './constants';


export const uploadAudioFile = async (uri: string, courseId: Number, lectureId: Number) => {
    const UPLOAD_ENDPOINT = `${BACKEND_URL}/courses/${courseId}/lectures/${lectureId}/upload-audio`;

    console.log('Uploading to:', UPLOAD_ENDPOINT);

    try {
        const uploadUrl = UPLOAD_ENDPOINT;
        const fileInfo = await FileSystem.getInfoAsync(uri);

        if (!fileInfo.exists) {
            throw new Error('File does not exist');
        }

        const uploadPromise = FileSystem.uploadAsync(uploadUrl, uri, {
            httpMethod: 'POST',
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: 'audio',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
        });

        // Enforce timeout using Promise.race
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => {
                reject(new Error('Upload request timed out'));
            }, AUDIO_UPLOAD_TIMEOUT_MS)
        );

        const uploadResult = await Promise.race([uploadPromise, timeoutPromise]) as FileSystem.FileSystemUploadResult;

        if (uploadResult.status === 200) {
            return { success: true, response: JSON.parse(uploadResult.body) };
        } else {
            return { success: false, error: `Upload failed with status ${uploadResult.status}` };
        }
    } catch (error: any) {
        console.error('Upload error:', error);
        return { success: false, error: error.message };
    }
};

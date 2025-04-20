// src/components/LectureUpload.tsx
import React, { useState, useRef } from 'react';
import { Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Alert, IconButton, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { createLectureRecord, uploadLectureAudio } from '../services/api';
import type { Lecture } from '~/services/api.interfaces';

interface LectureUploadProps {
  courseId: string;
  onUploadComplete: () => void; // Callback to refresh lecture list
}

const LectureUpload: React.FC<LectureUploadProps> = ({ courseId, onUploadComplete }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lectureTitle, setLectureTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // TODO: Implement progress reporting if API supports it
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Basic validation (optional)
      if (!file.type.startsWith('audio/')) {
          setError("Please select an audio file.");
          setSelectedFile(null);
          return;
      }
      // Size limit (e.g., 100MB)
      if (file.size > 100 * 1024 * 1024) {
          setError("File size exceeds 100MB limit.");
          setSelectedFile(null);
          return;
      }
      setSelectedFile(file);
      setError(null); // Clear previous error
      setDialogOpen(true); // Open dialog to get title
    }
  };

  const handleOpenDialog = () => {
     // Trigger hidden file input click
     fileInputRef.current?.click();
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setLectureTitle('');
    setSelectedFile(null); // Reset file if dialog is cancelled
  };

  const handleUpload = async () => {
    if (!selectedFile || !lectureTitle.trim()) {
      setError('Please select a file and enter a title.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);
    setUploadProgress(0); // Reset progress

    try {
      // 1. Create lecture record
      const newLecture = await createLectureRecord(courseId, lectureTitle);
      console.log("Lecture record created:", newLecture.lectureID);

      // 2. Upload audio file
      // Note: Axios doesn't easily support progress for basic fetch-like uploads.
      // You might need a more complex setup or library for accurate progress.
      // Simulating progress for now.
      setUploadProgress(50); // Simulate progress
      await uploadLectureAudio(courseId, newLecture.lectureID, selectedFile);
      setUploadProgress(100); // Simulate completion

      setSuccess(`Lecture "${lectureTitle}" uploaded successfully. Processing will start.`);
      onUploadComplete(); // Refresh parent component's list
      handleCloseDialog(); // Close dialog on success

    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(`Upload failed: ${err.response?.data?.error || err.message || 'Unknown error'}`);
      // Consider deleting the created lecture record if upload fails critically
    } finally {
      setUploading(false);
      // Reset file input value so the same file can be selected again if needed
      if(fileInputRef.current) {
          fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Box sx={{ mt: 3, mb: 2, p: 2, border: '1px dashed grey', borderRadius: 1, textAlign: 'center' }}>
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }} // Hide the default input
        id="audio-upload-input"
      />
      <Button
        variant="outlined"
        component="label" // Link button to file input
        startIcon={<UploadFileIcon />}
        onClick={handleOpenDialog} // Use onClick to trigger ref click
        disabled={uploading}
        htmlFor="audio-upload-input" // Necessary for label association
      >
        Upload New Lecture Audio
      </Button>

      {uploading && <LinearProgress variant="determinate" value={uploadProgress} sx={{ mt: 2 }} />}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Enter Lecture Title</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please provide a title for the lecture audio: "{selectedFile?.name}".
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="lectureTitle"
            label="Lecture Title"
            type="text"
            fullWidth
            variant="standard"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={uploading}>Cancel</Button>
          <Button onClick={handleUpload} disabled={uploading || !lectureTitle.trim()}>
            {uploading ? <CircularProgress size={24} /> : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LectureUpload;
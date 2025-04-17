// src/pages/CourseDetailsPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CircularProgress, Alert, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Chip, Link, Divider } from '@mui/material';
import { getCourseLectures, Lecture, Course } from '../services/api'; // Assuming getCourseDetails exists
import LectureUpload from '../components/LectureUpload'; // Import the upload component
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';

const CourseDetailsPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [course, setCourse] = useState<Course | null>(null); // Optional: Fetch course details too
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLectures = useCallback(async () => {
    if (!courseId) {
      setError("Course ID is missing.");
      setLoading(false);
      return;
    }
    setLoading(true); // Show loading indicator on refresh
    setError(null);
    try {
      // Optional: Fetch course details if needed
      // const courseData = await getCourseDetails(courseId);
      // setCourse(courseData);

      const lecturesData = await getCourseLectures(courseId);
      setLectures(lecturesData);
    } catch (err) {
      console.error("Failed to fetch lectures:", err);
      setError('Failed to load lectures. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]); // Use useCallback dependency

  const getStatusChip = (status: Lecture['summaryStatus'], isValidated: boolean) => {
      if (isValidated) {
          return <Chip icon={<CheckCircleIcon />} label="Validated" color="success" size="small" variant="outlined" />;
      }
      switch(status) {
          case 'COMPLETED':
              return <Chip icon={<CheckCircleIcon />} label="Ready for Review" color="primary" size="small" variant="outlined" />;
          case 'IN_PROGRESS':
              return <Chip icon={<HourglassTopIcon />} label="Processing" color="warning" size="small" variant="outlined" />;
          case 'VALIDATED': // Should be covered by isValidated, but as fallback
               return <Chip icon={<CheckCircleIcon />} label="Validated" color="success" size="small" variant="outlined" />;
          case 'ERROR':
              return <Chip icon={<ErrorIcon />} label="Error" color="error" size="small" variant="outlined" />;
          case 'NOT_STARTED':
          default:
              return <Chip icon={<PendingIcon />} label="Pending Upload" color="default" size="small" variant="outlined" />;
      }
  }

  if (loading && lectures.length === 0) { // Show loading only on initial load
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Container>
      {/* Display Course Name if fetched */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
         Lectures {/* Replace with course?.courseName if fetched */}
      </Typography>

      {/* Lecture Upload Component */}
      {courseId && <LectureUpload courseId={courseId} onUploadComplete={fetchLectures} />}

       <Divider sx={{ my: 3 }} />

      {/* Lectures List */}
      {loading && <CircularProgress size={20} sx={{ display: 'block', margin: 'auto' }}/>}
      {!loading && lectures.length === 0 ? (
        <Typography sx={{ mt: 2 }}>No lectures uploaded for this course yet.</Typography>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {lectures.map((lecture) => (
            <ListItem
              key={lecture.lectureID}
              secondaryAction={getStatusChip(lecture.summaryStatus, lecture.is_validated)}
              sx={{ borderBottom: '1px solid #eee' }}
            >
              <ListItemAvatar>
                <Avatar>
                  <AudiotrackIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                    <Link component={RouterLink} to={`/lectures/${lecture.lectureID}/review`} underline="hover">
                        {lecture.lectureTitle}
                    </Link>
                 }
                secondary={`Uploaded: ${lecture.uploadDate ? new Date(lecture.uploadDate * 1000).toLocaleDateString() : 'N/A'} | Duration: ${lecture.duration ? Math.round(lecture.duration / 60) + ' min' : 'N/A'}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default CourseDetailsPage;
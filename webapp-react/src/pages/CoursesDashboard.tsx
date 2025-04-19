// src/pages/CoursesDashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CircularProgress, Alert, Link, Box } from '@mui/material';
import { getCourses } from '../services/api';
import { Course } from '~/services/api.interfaces';
import SchoolIcon from '@mui/icons-material/School'; // Example icon

const CoursesDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError('Failed to load courses. Please try refreshing the page.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
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
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Your Courses
      </Typography>
      {courses.length === 0 ? (
        <Typography>No courses found. You can create courses through the backend or add a UI element here.</Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item={true} xs={12} sm={6} md={4} key={course.courseID}>
               <Link component={RouterLink} to={`/courses/${course.courseID}`} underline="none">
                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <SchoolIcon color="action" sx={{ fontSize: 40, mb: 1 }} />
                      <Typography gutterBottom variant="h6" component="div">
                        {course.courseName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {course.courseSummary}
                      </Typography>
                      <Typography variant="caption" display="block" color="text.secondary">
                        {course.lectures?.length ?? 0} Lecture(s)
                      </Typography>
                       <Typography variant="caption" display="block" color="text.secondary">
                         Last Updated: {new Date(course.lastUpdated * 1000).toLocaleDateString()}
                       </Typography>
                    </CardContent>
                 </Card>
                </Link>
            </Grid>
          ))}
        </Grid>
      )}
      {/* Optional: Add a "Create New Course" button here */}
    </Container>
  );
};

export default CoursesDashboard;
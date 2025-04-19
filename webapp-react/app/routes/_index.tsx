import CoursesDashboard from '~/pages/CoursesDashboard';
import { useAuth } from '~/contexts/AuthContext'; // Import useAuth
import { Navigate } from 'react-router-dom';      // Import Navigate
import { Box, CircularProgress } from '@mui/material';

// This acts as a protected route for the dashboard
export default function IndexRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Show loading spinner while auth state is being determined
    return (
       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
           <CircularProgress />
       </Box>
    );
  }

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the dashboard if authenticated
  return <CoursesDashboard />;
}
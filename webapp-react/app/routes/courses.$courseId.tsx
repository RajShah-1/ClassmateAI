import CourseDetailsPage from '~/pages/CourseDetailsPage';
import { useAuth } from '~/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';


// Protection within the route component (alternative to layout routes)
export default function CourseDetailsRoute() {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
               <CircularProgress />
           </Box>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    return <CourseDetailsPage />;
}
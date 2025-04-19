import LectureReviewPage from '~/pages/LectureReviewPage';
import { useAuth } from '~/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Protection within the route component
export default function LectureReviewRoute() {
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
    return <LectureReviewPage />;
}
// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from '~/contexts/AuthContext'; // Use ~ alias
import LoginPage from '~/pages/LoginPage';
import CoursesDashboard from '~/pages/CoursesDashboard';
import CourseDetailsPage from '~/pages/CourseDetailsPage';
import LectureReviewPage from '~/pages/LectureReviewPage';
import ProtectedRoute from '~/components/ProtectedRoute';
import Layout from '~/components/Layout';

// Create MUI theme (same as before)
const theme = createTheme({
  palette: {
    primary: { main: '#6F4EA0' },
    secondary: { main: '#F2DFF8' },
  },
  components: {
      MuiCard: {
          styleOverrides: {
              root: {
                 transition: 'box-shadow 0.3s ease-in-out',
                 '&:hover': {
                     boxShadow: 6 // MUI's elevation shorthand
                 }
              }
          }
      }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <AuthProvider>
          <BrowserRouter> {/* Use BrowserRouter for CSR */}
            <Routes>
              {/* Routes with the main layout */}
              <Route element={<Layout />}>
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<CoursesDashboard />} />
                  <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
                  <Route path="/lectures/:lectureId/review" element={<LectureReviewPage />} />
                  {/* Add other protected routes here */}
                </Route>
              </Route>

              {/* Public Login Route (outside main layout or handle within layout) */}
              <Route path="/login" element={<LoginPage />} />

              {/* Fallback route - redirect to login or dashboard based on context might be better */}
              {/* Or a simple 404 page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
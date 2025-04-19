// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authInstance } from '../utils/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Paper, Typography, Box, CircularProgress } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(authInstance, provider);
      // Auth listener in AuthContext will handle redirect
      // navigate('/'); // No need to navigate here, listener does it
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
    // setLoading will be set to false by the auth listener finishing
  };

  // Prevent rendering the login button if already logged in and redirecting
  if (currentUser) {
      return (
          <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
              <CircularProgress />
          </Container>
      );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Instructor Sign In
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          startIcon={<GoogleIcon />}
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In with Google'}
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
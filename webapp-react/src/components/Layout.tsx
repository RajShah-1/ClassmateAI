// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ClassmateAI Instructor Panel
          </Typography>
          {currentUser && (
            <Button color="inherit" onClick={handleLogout}>
              Logout ({currentUser.email?.split('@')[0]})
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        {/* Outlet renders the matched child route component */}
        <Outlet />
      </Container>
      <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' ClassmateAI'}
          </Typography>
        </Box>
    </Box>
  );
};

export default Layout;
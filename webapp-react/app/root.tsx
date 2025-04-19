// app/root.tsx
import React from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  // Link as RemixLink, // Use MUI Link or RouterLink instead usually
  useNavigate, // For logout navigation if needed
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node"; // Or cloudflare/deno
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { AuthProvider, useAuth } from '~/contexts/AuthContext'; // Import AuthProvider and useAuth

export const meta: MetaFunction = () => ([
  { charset: "utf-8" },
  { title: "ClassmateAI Instructor" },
  { name: "viewport", content: "width=device-width,initial-scale=1" },
]);

// --- MUI Theme ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#6F4EA0', // Purple similar to mobile app
    },
    secondary: {
      main: '#F2DFF8', // Lighter purple
    },
  },
  components: {
      MuiCard: {
          styleOverrides: {
              root: {
                 transition: 'box-shadow 0.3s ease-in-out', // Smooth hover effect
                 '&:hover': {
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' // Example hover shadow
                 }
              }
          }
      }
  }
});

// --- Main Layout Component (used within Root) ---
function AppLayout() {
  const { currentUser, logout } = useAuth();
  // Use window location for redirect after logout in Remix, or handle via server-side loader/action redirects
  // const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await logout();
        // In Remix, navigation after logout is often handled by redirecting
        // from loaders on protected pages, or forcing a page reload.
        window.location.href = '/login'; // Simple client-side redirect
    } catch (error) {
        console.error("Logout failed:", error);
        // Optionally show an error message to the user
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Render AppBar only if user is logged in */}
      {currentUser && (
         <AppBar position="static">
             <Toolbar>
                 <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                 ClassmateAI Instructor Panel
                 </Typography>
                 <Button color="inherit" onClick={handleLogout}>
                    Logout ({currentUser.email?.split('@')[0]})
                 </Button>
             </Toolbar>
         </AppBar>
      )}
      {/* Main content area where nested routes render */}
      <Container component="main" sx={{ mt: currentUser ? 4 : 0, mb: 4, flexGrow: 1 }}>
        <Outlet /> {/* This renders the matched route component */}
      </Container>
       {/* Render Footer only if user is logged in */}
       {currentUser && (
            <Box component="footer" sx={{ p: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
              <Typography variant="body2" color="text.secondary" align="center">
                  {'© '}
                  {new Date().getFullYear()}
                  {' ClassmateAI'}
              </Typography>
            </Box>
       )}
    </Box>
  );
}


// --- Root Export ---
export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links /> {/* Renders <link> tags for stylesheets */}
         {/* Add MUI font links */}
         <link rel="preconnect" href="https://fonts.googleapis.com" />
         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
         <link
           rel="stylesheet"
           href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
         />
         <link
             rel="stylesheet"
             href="https://fonts.googleapis.com/icon?family=Material+Icons"
         />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* MUI's CSS reset/baseline */}
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <AuthProvider> {/* AuthProvider wraps the layout */}
              <AppLayout /> {/* Render the layout containing AppBar/Outlet/Footer */}
            </AuthProvider>
          </SnackbarProvider>
        </ThemeProvider>

        <ScrollRestoration /> {/* Handles scroll position */}
        <Scripts /> {/* Renders Remix's scripts */}
        {/* <LiveReload /> */} {/* Included by default in dev */}
      </body>
    </html>
  );
}

// Optional: Add an ErrorBoundary component for better error handling
export function ErrorBoundary() {
    // const error = useRouteError();
    // console.error(error);
    // Customize this further
    return (
         <html lang="en">
             <head>
                 <title>Oh no!</title>
                 <Meta />
                 <Links />
             </head>
             <body>
                 <h1>Something went wrong!</h1>
                 <p>An error occurred. Please try refreshing the page.</p>
                 {/* You can add more details here in development */}
                 <Scripts />
             </body>
         </html>
    );
}
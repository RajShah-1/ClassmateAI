// src/pages/LectureReviewPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, TextField, Button, CircularProgress, Alert, Box, Chip, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import ErrorIcon from '@mui/icons-material/Error';
import { getLectureDetails, validateSummary} from '../services/api';
import { Lecture } from '../services/api.interfaces'; 
import { useSnackbar } from 'notistack'; // For nicer alerts
import { marked } from 'marked';

const LectureReviewPage: React.FC = () => {
  const { lectureId } = useParams<{ lectureId: string }>();
  const [lecture, setLecture] = useState<Lecture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validatedSummary, setValidatedSummary] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Use notistack

  const fetchLecture = useCallback(async () => {
    if (!lectureId) {
      setError("Lecture ID is missing.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getLectureDetails(lectureId);
      setLecture(data);
      // Initialize text field with validated summary if it exists, otherwise AI summary
      setValidatedSummary(data.is_validated ? (data.validated_summary || '') : (data?.notes?.[0].content || ''));
    } catch (err) {
      console.error("Failed to fetch lecture details:", err);
      setError('Failed to load lecture details. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [lectureId]);

  useEffect(() => {
    fetchLecture();
    // Optional: Set up polling or a refresh button if status is IN_PROGRESS
    // const interval = setInterval(() => {
    //     if (lecture?.summaryStatus === 'IN_PROGRESS') {
    //         fetchLecture();
    //     }
    // }, 15000); // Poll every 15 seconds
    // return () => clearInterval(interval);
  }, [fetchLecture]); // Depend on the memoized fetch function


  const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValidatedSummary(event.target.value);
  };

  const handleSaveAndValidate = async () => {
    if (!lectureId || lecture?.summaryStatus === 'IN_PROGRESS' || lecture?.summaryStatus === 'NOT_STARTED') {
        enqueueSnackbar('Cannot validate yet, processing not complete.', { variant: 'warning' });
        return;
    }

    setIsSaving(true);
    try {
      const updatedLecture = await validateSummary(lectureId, validatedSummary);
      setLecture(updatedLecture); // Update local state with response
      setValidatedSummary(updatedLecture.validated_summary || ''); // Ensure field syncs
      enqueueSnackbar('Summary validated successfully!', { variant: 'success' });
    } catch (err: any) {
      console.error("Failed to validate summary:", err);
      enqueueSnackbar(`Validation failed: ${err.response?.data?.error || err.message || 'Unknown error'}`, { variant: 'error' });
    } finally {
      setIsSaving(false);
    }
  };

   const getStatusChip = () => {
        if (!lecture) return null;
        if (lecture.is_validated) {
            return <Chip icon={<CheckCircleIcon />} label="Validated" color="success" />;
        }
        switch(lecture.summaryStatus) {
            case 'COMPLETED':
                return <Chip icon={<CheckCircleIcon />} label="Ready for Review" color="primary" />;
            case 'IN_PROGRESS':
                return <Chip icon={<HourglassTopIcon />} label="Processing Audio..." color="warning" />;
            case 'VALIDATED': // Fallback
                 return <Chip icon={<CheckCircleIcon />} label="Validated" color="success" />;
            case 'ERROR':
                return <Chip icon={<ErrorIcon />} label="Processing Error" color="error" />;
            case 'NOT_STARTED':
            default:
                return <Chip label="Pending Upload/Processing" color="default" />;
        }
    }

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!lecture) {
    return <Alert severity="warning">Lecture data not found.</Alert>;
  }

  const canValidate = lecture.summaryStatus === 'COMPLETED' || lecture.summaryStatus === 'VALIDATED';

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Review Lecture: {lecture.lectureTitle}
        </Typography>
         {getStatusChip()}
      </Box>

      {lecture.summaryStatus === 'IN_PROGRESS' && (
        <Alert severity="info" sx={{ mb: 3 }}>
          Audio is currently processing. Transcript and summary will appear here once complete. You can refresh the page or check back later.
        </Alert>
      )}
      {lecture.summaryStatus === 'ERROR' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          An error occurred during processing. You may need to re-upload the audio file.
        </Alert>
      )}


      {/* Show content only when processing is done */}
      {canValidate && (
        <>
          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Transcript</Typography>
            <Box
              component="pre" // Use pre for preserving whitespace
              sx={{
                whiteSpace: 'pre-wrap', // Wrap long lines
                wordBreak: 'break-word', // Break long words
                maxHeight: '300px',
                overflowY: 'auto',
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 1,
                fontFamily: 'monospace',
              }}
            >
              {lecture.transcript || 'Transcript not available.'}
            </Box>
          </Paper>

          <Divider sx={{ my: 3 }} />

          <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
             <Typography variant="h6" gutterBottom>AI-Generated Notes (Read-only)</Typography>
                <Box sx={{ color: 'text.secondary', mb: 2, p: 1, border: '1px solid #eee', borderRadius: 1, background: '#f9f9f9' }}>
                <Typography variant="body1" component="div">
                  <div dangerouslySetInnerHTML={{ __html: lecture.notes?.[0]?.content ? marked(lecture.notes[0].content) : 'AI summary not available.' }} />
                </Typography>
                </Box>

             <Typography variant="h6" gutterBottom>Instructor Validated Notes</Typography>
              <TextField
                label="Edit and Validate Summary"
                multiline
                rows={8}
                fullWidth
                variant="outlined"
                value={validatedSummary}
                onChange={handleSummaryChange}
                sx={{ mb: 2 }}
                disabled={isSaving} // Disable while saving
                placeholder="Review the AI summary above, make corrections here, and then validate."
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveAndValidate}
                disabled={isSaving || lecture.is_validated} // Disable if already validated or saving
                startIcon={isSaving ? <CircularProgress size={20} color="inherit" /> : lecture.is_validated ? <CheckCircleIcon /> : undefined}
              >
                {isSaving ? 'Validating...' : lecture.is_validated ? 'Summary Validated' : 'Save & Validate Summary'}
              </Button>
               {lecture.is_validated && <Typography variant="caption" sx={{ ml: 2, color: 'success.main' }}>Validated on {new Date(lecture.lastUpdated * 1000).toLocaleString()}</Typography>}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default LectureReviewPage;

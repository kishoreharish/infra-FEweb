import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { 
  Box, 
  Card, 
  Typography, 
  Divider, 
  Button, 
  IconButton, 
  CircularProgress, 
  Modal 
} from '@mui/material';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AuthComponents from '../AuthComponents/authcomponents';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function FullCardList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/public/jobs/");
      setJobs(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle "Apply Now" button click
  const handleApplyClick = (job) => {
    if (user) {
      // User is logged in, redirect or handle job application
      navigate(`/apply/${job.id}`);
    } else {
      setSelectedJob(job);
      setShowAuthModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowAuthModal(false);
    setSelectedJob(null);
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto' }}>
      <h3 className="title">Hot Listed Jobs</h3>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {error}
        </Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <Card
                key={index}
                sx={{
                  width: '100%',
                  padding: '16px',
                  boxShadow: 3,
                  borderRadius: '12px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'primary.main',
                  }}
                  aria-label="Save job"
                >
                  <BookmarkOutlinedIcon />
                </IconButton>

                <Box display="flex" alignItems="center" marginBottom={2}>
                  <Box
                    component="img"
                    src={`http://127.0.0.1:8000${job.company_logo}`}
                    alt={`Logo for ${job.title}`}
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '4px',
                      marginRight: '16px',
                      objectFit: 'cover',
                    }}
                  />
                  <Typography variant="h7" component="div">
                    <b>{job.title}</b><br />
                    <Typography variant="caption" color="text.secondary">
                      <b>{job.company}</b> | {job.job_type}
                    </Typography>
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" marginBottom={2}>
                  <Typography variant="caption" color="#1a1a1a" display="flex" alignItems="center" gap={1}>
                    <WorkOutlineIcon fontSize="small" /> {job.experience} Yrs |{' '}
                    <CurrencyRupeeIcon fontSize="small" /> {job.salary} LPA |{' '}
                    <LocationOnOutlinedIcon fontSize="small" /> {job.location}
                  </Typography>
                  <br />
                  {job.description}
                </Typography>

                <Typography variant="body2" color="text.primary" marginBottom={2}>
                  {job.skills}
                </Typography>

                <Divider sx={{ marginBottom: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ textTransform: 'none' }}
                    onClick={() => handleApplyClick(job)}
                  >
                    Apply Now
                  </Button>
                </Box>
              </Card>
            ))
          ) : (
            <Typography variant="h6" color="text.secondary" textAlign="center">
              No jobs available at the moment.
            </Typography>
          )}
        </Box>
      )}

      {/* Auth Modal */}
      <Modal open={showAuthModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" textAlign="center" marginBottom={2}>
            Please login to apply for "{selectedJob?.title}"
          </Typography>
          <AuthComponents closeModal={handleCloseModal} />
        </Box>
      </Modal>
    </Box>
  );
}

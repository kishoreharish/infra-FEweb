import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Divider,
  Chip,
  IconButton,
  TextField,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  ContentCopy,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; // ✅ Import Auth Context
import styles from './JobDetails.module.scss';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  // ✅ Ensure token is retrieved correctly
  const token = authToken || localStorage.getItem("authToken");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        console.log(`Fetching job details: http://127.0.0.1:8000/public/jobs/${id}/`);
        const response = await axios.get(`http://127.0.0.1:8000/public/jobs/${id}/`);
        setJob(response.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // ✅ Function to handle job application
  const handleApply = async () => {
    if (!token) {
      alert("You need to log in to apply for this job.");
      navigate("/login");
      return;
    }

    try {
      console.log("Applying for job ID:", job?.id);
      console.log("Using token:", token);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/job-applications/",
        { job_id: job.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("You have successfully applied for this job!");
        navigate("/dashboard");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);

      if (error.response) {
        if (error.response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/login");
        } else if (error.response.status === 400) {
          alert("You have already applied for this job.");
        } else {
          alert("Failed to apply. Please try again later.");
        }
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {error}
        </Typography>
      ) : job ? (
        <div className={styles.container}>
          {/* Header */}
          <Box className={styles.header}>
            <Typography variant="h3" className={styles.jobTitle}>
              {job.title} <span className={styles.companyName}>at {job.company}</span>
            </Typography>
            <div className={styles.headerbtns}>
              <Button variant="contained" className={styles.viewCompanyBtn}>
                VIEW COMPANY
              </Button>
              <Button variant="contained" className={styles.applyJobBtn} onClick={handleApply}>
                APPLY FOR THIS JOB
              </Button>
            </div>
          </Box>

          <Grid container spacing={4}>
            {/* Left Column */}
            <Grid item xs={12} md={8}>
              <Box className={styles.jobDetails}>
                <Typography variant="h6" className={styles.sectionTitle}>About this role</Typography>
                <Box className={styles.roleHeader}>
                  <img src={`http://127.0.0.1:8000${job.company_logo}`} alt="Company Logo" className={styles.companyLogo} />
                  <Box>
                    <Typography variant="h6"><b>{job.title}</b> ({job.job_type})</Typography>
                    <Typography className={styles.location}>{job.company} - {job.location}</Typography>
                    <Typography className={styles.salary}>₹{job.salary} + Benefits</Typography>
                  </Box>
                </Box>

                <Typography className={styles.description}>{job.description}</Typography>

                <Typography variant="h6" className={styles.sectionTitle}>Skills</Typography>
                <Box className={styles.skills}>
                  {job.skills?.split(",").map((skill, i) => (
                    <Chip label={skill.trim()} key={i} className={styles.skillChip} />
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={4}>
              <Box className={styles.rightColumn}>
                <Button variant="contained" fullWidth className={styles.applyJobBtn} onClick={handleApply}>
                  APPLY FOR THIS JOB
                </Button>

                <Divider sx={{ marginY: 3 }} />

                <Typography variant="h6" className={styles.sectionTitle}>Share this job</Typography>
                <Box className={styles.shareButtons}>
                  <Button variant="outlined" startIcon={<Facebook />} fullWidth sx={{ mb: 1 }}>
                    Share on Facebook
                  </Button>
                  <Button variant="outlined" startIcon={<Twitter />} fullWidth sx={{ mb: 1 }}>
                    Share on Twitter
                  </Button>
                  <Button variant="outlined" startIcon={<LinkedIn />} fullWidth>
                    Share on LinkedIn
                  </Button>
                </Box>

                <Divider sx={{ marginY: 3 }} />

                <Typography variant="h6" className={styles.sectionTitle}>Job URL</Typography>
                <Box className={styles.jobUrlBox} display="flex" alignItems="center">
                  <TextField value={`http://digitalprofile.io/job/${job.id}`} fullWidth disabled />
                  <IconButton className={styles.copyButton} onClick={() => navigator.clipboard.writeText(`http://digitalprofile.io/job/${job.id}`)}>
                    <ContentCopy />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Typography variant="h6" textAlign="center">No job details found</Typography>
      )}
    </Box>
  );
};

export default JobDetails;

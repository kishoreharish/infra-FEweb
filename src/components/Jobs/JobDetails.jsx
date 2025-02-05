import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
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
  Modal
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  ContentCopy,
  Close
} from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthContext"; // ✅ Import Auth Context
import styles from "./JobDetails.module.scss";

const JobDetails = ({ open, onClose, jobData, onSave }) => {
  const [job, setJob] = useState(jobData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  
  const token = authToken || localStorage.getItem("authToken");

  // ✅ Update local state when jobData changes
  useEffect(() => {
    setJob(jobData);
  }, [jobData]);

  // ✅ Handle editing the job details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  // ✅ Save edited job details
  const handleSave = async () => {
    if (!token) {
      alert("Unauthorized. Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/jobs/update/${job.id}/`,
        job,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Job updated successfully!");
        onSave(job); // ✅ Update job in ManageJobs
        onClose(); // ✅ Close modal
      } else {
        setError("Failed to update job. Try again.");
      }
    } catch (error) {
      setError("Error updating job. Check console.");
      console.error("Update Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modalContainer}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="h6" color="error">{error}</Typography>
        ) : job ? (
          <div className={styles.container}>
            {/* Close Button */}
            <IconButton className={styles.closeButton} onClick={onClose}>
              <Close />
            </IconButton>

            {/* Header */}
            <Box className={styles.header}>
              <Typography variant="h4" className={styles.jobTitle}>
                <TextField name="title" value={job.title} onChange={handleChange} fullWidth />
              </Typography>
              <div className={styles.headerbtns}>
                <Button variant="contained" className={styles.viewCompanyBtn}>
                  VIEW COMPANY
                </Button>
                <Button variant="contained" className={styles.applyJobBtn}>
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
                      <Typography variant="h6">
                        <TextField name="job_type" value={job.job_type} onChange={handleChange} fullWidth />
                      </Typography>
                      <Typography className={styles.location}>
                        <TextField name="location" value={job.location} onChange={handleChange} fullWidth />
                      </Typography>
                      <Typography className={styles.salary}>
                        ₹<TextField name="salary" value={job.salary} onChange={handleChange} fullWidth /> + Benefits
                      </Typography>
                    </Box>
                  </Box>

                  <Typography className={styles.description}>
                    <TextField
                      name="description"
                      value={job.description}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Typography>

                  <Typography variant="h6" className={styles.sectionTitle}>Skills</Typography>
                  <TextField
                    name="skills"
                    value={job.skills}
                    onChange={handleChange}
                    fullWidth
                  />
                </Box>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={4}>
                <Box className={styles.rightColumn}>
                  <Button variant="contained" fullWidth className={styles.applyJobBtn}>
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

            {/* Save Button */}
            <Box className={styles.buttonContainer}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          </div>
        ) : (
          <Typography variant="h6" textAlign="center">No job details found</Typography>
        )}
      </Box>
    </Modal>
  );
};

export default JobDetails;

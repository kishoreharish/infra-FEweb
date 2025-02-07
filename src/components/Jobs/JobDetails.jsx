import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Grid,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import {
  LocationOn,
  MailOutline,
  BusinessCenter,
  CalendarToday,
} from "@mui/icons-material";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./JobDetails.module.scss";

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const token = authToken || localStorage.getItem("authToken");

  console.log("🟢 Job ID from URL:", jobId);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/jobs/${jobId}/`);
        console.log("🟢 Job Data Fetched:", response.data);
        setJob(response.data);
      } catch (error) {
        console.error("❌ Error fetching job:", error);
        setError("Job not found.");
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  return (
    <Box className={styles.pageContainer}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {job && (
        <Paper className={styles.jobContainer}>
          {/* ✅ HEADER BACKGROUND */}
          <Box className={styles.headerBackground} />

          {/* ✅ JOB DETAILS */}
          <Box className={styles.jobDetails}>
            <Box className={styles.jobHeader}>
              <Typography variant="h3">{job.title}</Typography>
              <Typography variant="h5" color="textSecondary">
                {job.company}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <LocationOn fontSize="small" /> {job.location} / {job.job_type}
              </Typography>
            </Box>

            <Divider className={styles.divider} />

            {/* ✅ JOB DESCRIPTION */}
            <Box className={styles.section}>
              <Typography variant="h5">Overview</Typography>
              <Typography variant="body1">{job.description}</Typography>
            </Box>

            {/* ✅ RESPONSIBILITIES */}
            <Box className={styles.section}>
              <Typography variant="h5">Responsibilities</Typography>
              <ul>
                {job.responsibilities?.split("\n").map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </Box>

            {/* ✅ QUALIFICATIONS */}
            <Box className={styles.section}>
              <Typography variant="h5">Qualifications</Typography>
              <ul>
                {job.qualifications?.split("\n").map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </Box>

            {/* ✅ SKILLS */}
            <Box className={styles.section}>
              <Typography variant="h5">Skills</Typography>
              <Box className={styles.skillsContainer}>
                {job.skills.split(",").map((skill, index) => (
                  <Chip key={index} label={skill.trim()} className={styles.skillChip} />
                ))}
              </Box>
            </Box>
          </Box>

          {/* ✅ SIDEBAR */}
          <Paper className={styles.sidebar}>
            <Typography variant="h6">
              <LocationOn fontSize="small" /> {job.location}
            </Typography>
            <Typography variant="body2">Please send us your detailed CV to apply for this job post</Typography>

            <Typography variant="h4" className={styles.salary}>
              ₹{job.salary}
            </Typography>
            <Typography variant="body2">Avg. salary</Typography>

            <Typography variant="h6">
              <MailOutline fontSize="small" /> {job.contact_email}
            </Typography>
            <Typography variant="body2">Contact Email</Typography>

            <Typography variant="h6">
              <BusinessCenter fontSize="small" /> {job.job_type}
            </Typography>
            <Typography variant="body2">Job Type</Typography>

            <Typography variant="h6">
              <CalendarToday fontSize="small" /> {job.posted_date}
            </Typography>
            <Typography variant="body2">Posted</Typography>

            <Button variant="contained" className={styles.applyButton}>
              Apply for this job
            </Button>
          </Paper>

          {/* ✅ COMPANY INFO */}
          <Paper className={styles.companyInfo}>
            <Typography variant="h6">{job.company}</Typography>
            <Typography variant="body2">{job.company_address}</Typography>
            <Typography variant="body2">
              We are committed to creating an inclusive culture for all employees.
            </Typography>
            <Button variant="outlined" className={styles.learnMore}>
              Learn more about us
            </Button>
          </Paper>
        </Paper>
      )}
    </Box>
  );
};

export default JobDetails;

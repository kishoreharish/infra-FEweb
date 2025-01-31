import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, Typography, Button, CircularProgress, Chip
} from "@mui/material";
import { AuthContext } from "../../../contexts/AuthContext";

import styles from "../../Jobs/JobDetails.module.scss";

const JobDetails = () => {
  const { id } = useParams(); // Get Job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/public/jobs/${id}/`, {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      })
      .then((response) => setJob(response.data))
      .catch(() => setError("Failed to load job details."))
      .finally(() => setLoading(false));
  }, [id, authToken]);

  const handleApply = () => {
    alert(`Applying for job: ${job.title}`);
  };

  return (
    <Box className={styles.jobDetailsContainer}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      
      {job && (
        <Box> 
          <Typography variant="h4">{job.title}</Typography>
          <Typography className={styles.companyName}>{job.company}</Typography>
          <Typography className={styles.salary}>₹{job.salary} per annum</Typography>
          <Chip label={job.location} className={styles.locationChip} />
          <Typography>{job.description}</Typography>

          <Button variant="contained" className={styles.applyButton} onClick={handleApply}>
            Apply Now
          </Button>
          <Button variant="outlined" className={styles.backButton} onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default JobDetails;

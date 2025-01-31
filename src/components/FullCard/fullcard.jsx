import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { 
  Box, Card, Typography, Chip, Button, IconButton, Modal 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthComponents from "../AuthComponents/authcomponents"; 
import {
  BookmarkBorderOutlined, Bookmark, ShareOutlined, ContentCopy,
  Facebook, LinkedIn, LocationOnOutlined
} from "@mui/icons-material";
import styles from "./fullcard.module.scss";

const FullCardList = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState(new Set()); // Set for saved jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareMenu, setShareMenu] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();
  const { authToken, user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/public/jobs/", {
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      })
      .then((response) => setJobs(response.data))
      .catch(() => setError("Failed to load jobs."))
      .finally(() => setLoading(false));

    if (authToken) {
      fetchSavedJobs(); // ✅ Fetch saved jobs if logged in
    }
  }, [authToken]);

  // ✅ Fetch saved jobs
  const fetchSavedJobs = async () => {
    try {
      console.log("🔹 Fetching saved jobs with Token:", authToken); // Debugging
      const response = await axios.get("http://127.0.0.1:8000/api/saved-jobs/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const savedJobIds = new Set(response.data.map((job) => job.job__id));
      setSavedJobs(savedJobIds);
    } catch (err) {
      console.error("❌ Error fetching saved jobs:", err.response?.data || err.message);
    }
  };

  // ✅ Save Job
  const handleSaveJob = async (jobId) => {
    if (!authToken) {
      console.log("❌ No auth token found! Asking user to login.");
      alert("You need to log in to save jobs.");
      setShowAuthModal(true);
      return;
    }
  
    console.log("🔹 Saving Job ID:", jobId, "with Token:", authToken);
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/save-job/",
        { job_id: jobId },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
  
      if (response.status === 201 || response.status === 200) {
        setSavedJobs(new Set(savedJobs).add(jobId));
        alert(response.data.message);
      }
    } catch (err) {
      console.error("❌ Error saving job:", err.response?.data || err.message);
    }
  };
  
  
  

  return (
    <Box className={styles.jobContainer}>
      {loading && <Typography>Loading jobs...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {jobs.map((job) => (
        <Card key={job.id} className={styles.jobCard}>
          <div className={styles.cardHeader}>
            <Typography className={styles.postedDate}>Posted on 29/11/23</Typography>
            <div className={styles.actions}>
              <IconButton onClick={() => setShareMenu(shareMenu === job.id ? null : job.id)}>
                <ShareOutlined />
              </IconButton>
              <IconButton onClick={() => handleSaveJob(job.id)}>
                {savedJobs.has(job.id) ? <Bookmark /> : <BookmarkBorderOutlined />}
              </IconButton>
            </div>
          </div>

          <div className={styles.jobHeader}>
            <Typography variant="h6" className={styles.jobTitle}>
              {job.title}
            </Typography>
            <Button 
              variant="outlined" 
              className={styles.locationButton}
              startIcon={<LocationOnOutlined />}
            >
              {job.location}
            </Button>
          </div>

          <Typography className={styles.companyName}>{job.company}</Typography>
          <Typography className={styles.salary}>₹{job.salary}+</Typography>

          <div className={styles.chipContainer}>
            <Chip label="Remote" />
            <Chip label="Full Time" />
            <Chip label="Non-technical" />
            <Chip label="Entry level/Junior" />
          </div>

          <Typography className={styles.description}>{job.description}</Typography>

          <Button
            variant="contained"
            className={styles.applyButton}
            onClick={() => navigate(`/job-details/${job.id}`)}
          >
            View Details
          </Button>
        </Card>
      ))}

      <Modal open={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <Box className={styles.authModal}>
          <AuthComponents onLoginSuccess={() => setShowAuthModal(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default FullCardList;

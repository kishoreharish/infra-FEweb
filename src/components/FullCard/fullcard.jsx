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
  const [savedJobs, setSavedJobs] = useState(new Set()); // Track saved jobs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shareMenu, setShareMenu] = useState(null); // Track which job's share menu is open
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const navigate = useNavigate();
  const { authToken, user } = useContext(AuthContext);


  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/public/jobs/")
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
      const response = await axios.get("http://127.0.0.1:8000/api/saved-jobs/", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const savedJobIds = new Set(response.data.map((job) => job.job__id));
      setSavedJobs(savedJobIds);
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      console.log("🟢 Checking User & Token in FullCardList:");
console.log("User:", user);
console.log("AuthToken:", authToken);
console.log("LocalStorage Token:", localStorage.getItem("authToken"));

    }
  };

  // ✅ Save or Unsave Job
  const handleSaveJob = async (jobId) => {
    const token = authToken ?? localStorage.getItem("authToken"); // ✅ Ensure token is always used
  
    if (!token) {
      alert("You need to log in to save jobs.");
      setShowAuthModal(true);
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/save-job/",
        { job_id: jobId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.status === 201 || response.status === 200) {
        setSavedJobs(new Set(savedJobs).add(jobId));
        alert(response.data.message);
      }
    } catch (err) {
      console.error("❌ Error saving job:", err);
    }
  };
  
  

  // ✅ Handle "View Details" Click
  const handleViewDetails = (jobId) => {
    navigate(`/job-details/${jobId}`);
  };

  // ✅ Handle Copy Link
  const handleCopyLink = (id) => {
    navigator.clipboard.writeText(`http://127.0.0.1:8000/public/jobs/${id}`);
    alert("Job link copied!");
    setShareMenu(null);
  };

  return (
    <Box className={styles.jobContainer}>
      {loading && <Typography>Loading jobs...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {jobs.map((job) => (
        <Card key={job.id} className={styles.jobCard}>
          {/* ✅ Job Header */}
          <div className={styles.cardHeader}>
            <Typography className={styles.postedDate}>Posted on 29/11/23</Typography>
            <div className={styles.actions}>
              {/* 🔄 Share Job */}
              <IconButton onClick={() => setShareMenu(shareMenu === job.id ? null : job.id)}>
                <ShareOutlined />
              </IconButton>

              {/* 🔄 Save Job */}
              <IconButton onClick={() => handleSaveJob(job.id)}>
                {savedJobs.has(job.id) ? <Bookmark /> : <BookmarkBorderOutlined />}
              </IconButton>
            </div>
          </div>

          {/* ✅ Job Title & Location */}
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

          {/* ✅ Job Details */}
          <Typography className={styles.companyName}>{job.company}</Typography>
          <Typography className={styles.salary}>₹{job.salary}+</Typography>

          {/* ✅ Job Tags */}
          <div className={styles.chipContainer}>
            <Chip label="Remote" />
            <Chip label="Full Time" />
            <Chip label="Non-technical" />
            <Chip label="Entry level/Junior" />
          </div>

          {/* ✅ Description */}
          <Typography className={styles.description}>{job.description}</Typography>

          {/* ✅ Share Menu */}
          {shareMenu === job.id && (
            <div className={styles.shareMenu}>
              <IconButton onClick={() => handleCopyLink(job.id)}>
                <ContentCopy />
                <span>Copy link</span>
              </IconButton>
              <IconButton>
                <Facebook />
              </IconButton>
              <IconButton>
                <LinkedIn />
              </IconButton>
            </div>
          )}

          {/* ✅ View Details Button */}
          <Button
            variant="contained"
            className={styles.applyButton}
            onClick={() => handleViewDetails(job.id)}
          >
            View Details
          </Button>
        </Card>
      ))}

      {/* 🔐 Auth Modal for Login/Signup */}
      <Modal open={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <Box className={styles.authModal}>
          <AuthComponents onLoginSuccess={() => setShowAuthModal(false)} />
        </Box>
      </Modal>
    </Box>
  );
};

export default FullCardList;

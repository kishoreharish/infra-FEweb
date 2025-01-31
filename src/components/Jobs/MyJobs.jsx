import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  CircularProgress,
  Card,
  Button,
} from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./MyJobs.module.scss";

const MyJobs = () => {
  const { authToken, user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Retrieve token from localStorage if Context token is missing
  const token = authToken || localStorage.getItem("authToken");

  console.log("🔍 Checking Auth Token in MyJobs:", token);
  console.log("👤 User Data:", user);

  // ✅ API Endpoints for different job categories
  const endpoints = [
    "applied-jobs",
    "saved-jobs",
    "interviewed-jobs",
    "achieved-jobs",
  ];

  // ✅ Fetch Jobs Function (Handles Auth & API Calls)
  const fetchJobs = useCallback(async () => {
    if (!token) {
      console.error("❌ No Auth Token Found. Please Log In.");
      setError("❌ Unauthorized. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log(`🚀 Fetching: http://127.0.0.1:8000/api/${endpoints[activeTab]}/`);

      const response = await axios.get(`http://127.0.0.1:8000/api/${endpoints[activeTab]}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ API Response:", response.data);
      setJobs(response.data);
      setError(null);
    } catch (err) {
      console.error("❌ Error fetching jobs:", err.response?.data || err.message);
      setError("Failed to fetch jobs.");
    } finally {
      setLoading(false);
    }
  }, [activeTab, token]);

  // ✅ Fetch jobs when activeTab changes
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <Box className={styles.container}>
      <Typography variant="h4" className={styles.heading}>My Jobs</Typography>

      {/* ✅ Job Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        className={styles.tabs}
      >
        <Tab label="Jobs Applied" />
        <Tab label="Saved Jobs" />
        <Tab label="Interviewed" />
        <Tab label="Achieved" />
      </Tabs>

      {/* ✅ Job Listings */}
      <Box className={styles.jobsContainer}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : jobs.length === 0 ? (
          <Typography>No jobs found in this category.</Typography>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} className={styles.jobCard}>
              <Typography variant="h6" className={styles.jobTitle}>{job.title}</Typography>
              <Typography className={styles.company}>{job.company}</Typography>
              <Typography className={styles.location}>{job.location}</Typography>
              <Typography className={styles.salary}>₹{job.salary} per month</Typography>
              <Button variant="contained" className={styles.viewButton}>
                View Details
              </Button>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
};

export default MyJobs;

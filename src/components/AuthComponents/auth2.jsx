import React, { useState } from "react";
import styles from "./Postajob.module.scss";
import axios from "axios";
import { TextField, Select, MenuItem, Button, Box, Typography } from "@mui/material";

const PostAJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    experience: "",
    salary: "",
    location: "",
    description: "",
    skills: "",
    email: "",
    jobType: "",
    deadline: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    // Validation check
    if (!formData.title || !formData.company || !formData.salary || !formData.location || !formData.description || !formData.skills) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "http://127.0.0.1:8000/users/jobs/post/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Job posted successfully!");
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.heading}>Post a New Job</Typography>
      <Typography variant="body2" className={styles.subHeading}>Fill in the job details below</Typography>

      {error && <Typography className={styles.error}>{error}</Typography>}
      {success && <Typography className={styles.success}>{success}</Typography>}

      <Box className={styles.form}>
        <TextField label="Job Title" name="title" value={formData.title} onChange={handleChange} fullWidth required />
        <TextField label="Company Name" name="company" value={formData.company} onChange={handleChange} fullWidth required />
        
        <Box className={styles.row}>
          <TextField label="Experience (Years)" name="experience" value={formData.experience} onChange={handleChange} fullWidth required />
          <TextField label="Salary (LPA)" name="salary" value={formData.salary} onChange={handleChange} fullWidth required />
        </Box>

        <TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth required />
        
        <TextField label="Email Address" name="email" value={formData.email} onChange={handleChange} fullWidth required />

        <Box className={styles.row}>
          <Select name="jobType" value={formData.jobType} onChange={handleChange} displayEmpty fullWidth>
            <MenuItem value="">Select Job Type</MenuItem>
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </Select>

          <TextField type="date" label="Application Deadline" name="deadline" value={formData.deadline} onChange={handleChange} fullWidth required />
        </Box>

        <TextField
          label="Job Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField label="Required Skills (comma separated)" name="skills" value={formData.skills} onChange={handleChange} fullWidth required />

        <Box className={styles.buttonContainer}>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PostAJob;

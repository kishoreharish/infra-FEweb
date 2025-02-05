import React, { useState } from "react";
import axios from "axios";
import styles from "./Postajob.module.scss";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Input,
} from "@mui/material";

const PostAJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    experience: "",
    salary: "",
    location: "",
    description: "",
    skills: "",
    job_type: "",
    deadline: "",
    required_skills: "",
    company_logo: null,
    created_date: new Date().toISOString().split("T")[0], // Default to today
    expire_date: "",
    status: "Active",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle File Uploads
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "expire_date") {
      // Auto-update status
      const today = new Date().toISOString().split("T")[0];
      setFormData({
        ...formData,
        [name]: value,
        status: value < today ? "Inactive" : "Active",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle Form Submission
  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    // Validation
    if (
      !formData.title ||
      !formData.company ||
      !formData.salary ||
      !formData.location ||
      !formData.description ||
      !formData.skills ||
      !formData.deadline
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Unauthorized. Please log in first.");
        setLoading(false);
        return;
      }

      const jobData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          jobData.append(key, value);
        }
      });

      const response = await axios.post(
        "http://127.0.0.1:8000/api/jobs/post/", // ✅ Correct API endpoint
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("✅ Job posted successfully!");
        setTimeout(() => setSuccess(null), 3000);
        // Reset form
        setFormData({
          title: "",
          company: "",
          experience: "",
          salary: "",
          location: "",
          description: "",
          skills: "",
          job_type: "",
          deadline: "",
          required_skills: "",
          company_logo: null,
          created_date: new Date().toISOString().split("T")[0],
          expire_date: "",
          status: "Active",
        });
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to post job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.heading}>
        Post a New Job
      </Typography>
      <Typography variant="body2" className={styles.subHeading}>
        Fill in the job details below
      </Typography>

      {error && <Typography className={styles.error}>{error}</Typography>}
      {success && <Typography className={styles.success}>{success}</Typography>}

      <Box className={styles.form}>
        <TextField
          label="Job Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange}
          fullWidth
          required
        />

        <Box className={styles.row}>
          <TextField
            label="Experience (Years)"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Salary (LPA)"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
        />

        <Box className={styles.row}>
          <Select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            displayEmpty
            fullWidth
          >
            <MenuItem value="">Select Job Type</MenuItem>
            <MenuItem value="Full-Time">Full-Time</MenuItem>
            <MenuItem value="Part-Time">Part-Time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
          </Select>

          <TextField
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            fullWidth
            required
          />
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

        <TextField
          label="Required Skills (comma separated)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          label="Required Fields"
          name="required_skills"
          value={formData.required_skills}
          onChange={handleChange}
          fullWidth
          required
        />

        <Box className={styles.row}>
          <TextField
            label="Created Date"
            name="created_date"
            value={formData.created_date}
            disabled
            fullWidth
          />

          <TextField
            type="date"
            name="expire_date"
            value={formData.expire_date}
            onChange={handleChange}
            fullWidth
            required
          />
        </Box>

        <Box className={styles.row}>
          <Typography variant="body1">Upload Company Logo:</Typography>
          <Input
            type="file"
            name="company_logo"
            onChange={handleChange}
            fullWidth
          />
        </Box>

        <Box className={styles.row}>
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            disabled
            fullWidth
          />
        </Box>

        <Box className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Job"}
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PostAJob;

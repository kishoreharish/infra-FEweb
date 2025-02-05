import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Typography,
  MenuItem,
  Select,
  Box,
  Input,
  Alert
} from "@mui/material";

const JobDetails = ({ open, onClose, jobData, onSave }) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (jobData) {
      setJob({ ...jobData });
      setEditing(false);
      setSuccessMessage(""); // ✅ Clear success message when switching jobs
    }
  }, [jobData]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpdateJob = async () => {
    if (!job) return;

    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      const formData = new FormData();

      formData.append("title", job.title);
      formData.append("company", job.company);
      formData.append("experience", job.experience);
      formData.append("salary", job.salary);
      formData.append("location", job.location);
      formData.append("description", job.description);
      formData.append("skills", typeof job.skills === "string" ? job.skills : job.skills?.join(", "));
      formData.append("required_skills", typeof job.required_skills === "string" ? job.required_skills : job.required_skills?.join(", "));
      formData.append("job_type", job.job_type);
      formData.append("deadline", job.deadline ? new Date(job.deadline).toISOString().split("T")[0] : "");
      formData.append("expire_date", job.expire_date ? new Date(job.expire_date).toISOString().split("T")[0] : "");

      // Automatically set status based on expiration date
      const today = new Date().toISOString().split("T")[0];
      formData.append("status", job.expire_date && job.expire_date < today ? "Inactive" : "Active");

      if (selectedFile) {
        formData.append("company_logo", selectedFile);
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/employer/jobs/${job.id}/`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );

      setJob(response.data);
      setSuccessMessage("Job updated successfully!");
      setEditing(false);

      // ✅ Delay closing modal to show success message
      setTimeout(() => {
        onSave(response.data);
        onClose(); // ✅ Close the modal
      }, 1500); // ✅ Give user time to see the message

    } catch (err) {
      setError("Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Job Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : job ? (
          <>
            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            <TextField label="Job Title" fullWidth value={job.title || ""} onChange={(e) => setJob({ ...job, title: e.target.value })} disabled={!editing} margin="dense"/>
            <TextField label="Company Name" fullWidth value={job.company || ""} onChange={(e) => setJob({ ...job, company: e.target.value })} disabled={!editing} margin="dense"/>
            <TextField label="Experience (Years)" fullWidth value={job.experience || ""} onChange={(e) => setJob({ ...job, experience: e.target.value })} disabled={!editing} margin="dense"/>
            <TextField label="Salary (LPA)" fullWidth value={job.salary || ""} onChange={(e) => setJob({ ...job, salary: e.target.value })} disabled={!editing} margin="dense"/>
            <TextField label="Location" fullWidth value={job.location || ""} onChange={(e) => setJob({ ...job, location: e.target.value })} disabled={!editing} margin="dense"/>

            <Box mt={2}>
              <Typography variant="subtitle1">Job Type</Typography>
              <Select fullWidth value={job.job_type || ""} onChange={(e) => setJob({ ...job, job_type: e.target.value })} disabled={!editing}>
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </Select>
            </Box>

            <TextField label="Job Description" fullWidth multiline rows={4} value={job.description || ""} onChange={(e) => setJob({ ...job, description: e.target.value })} disabled={!editing} margin="dense"/>
            
            {/* Upload Company Logo */}
            <Box mt={2}>
              <Typography variant="subtitle1">Upload Company Logo</Typography>
              <Input type="file" name="company_logo" onChange={handleFileChange} fullWidth disabled={!editing}/>
              {job.company_logo && !selectedFile && (
                <Box mt={1}>
                  <img src={`http://127.0.0.1:8000${job.company_logo}`} alt="Company Logo" width={100} />
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Typography>No job data available</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Close</Button>
        {!editing ? (
          <Button onClick={() => setEditing(true)} color="primary">Edit</Button>
        ) : (
          <Button onClick={handleUpdateJob} color="primary" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default JobDetails;

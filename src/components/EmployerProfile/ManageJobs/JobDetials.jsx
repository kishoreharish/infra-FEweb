import React, { useState } from "react";
import styles from "./JobDetails.module.scss";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Box, 
  Input, 
  Alert 
} from "@mui/material";
import axios from "axios";

const JobDetails = ({ open, onClose, jobData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(jobData);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "company_logo" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        company_logo: files[0],  // Store the file object directly
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSave = async () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setLoading(true);
  
    try {
      const updatedData = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach((key) => {
        if (key === "company_logo" && formData[key] instanceof File) {
          updatedData.append(key, formData[key]);  // Append file properly
        } else {
          updatedData.append(key, formData[key]);
        }
      });
  
      const token = localStorage.getItem("authToken");
  
      console.log("Sending PUT request to:", `http://127.0.0.1:8000/users/jobs/update/${formData.id}/`);
      console.log("Form data being sent:", [...updatedData.entries()]);
  
      const response = await axios.put(
        `http://127.0.0.1:8000/users/jobs/update/${formData.id}/`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",  // Important for file uploads
          },
        }
      );
  
      console.log("API Response:", response.data);
      setSuccessMessage("Job updated successfully!");
      onSave(formData);
    } catch (error) {
      console.error("Error updating job:", error);
      setErrorMessage(
        error.response?.data?.company_logo?.[0] || 
        `Error updating job. Status: ${error.response?.status}. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle className={styles.dialogTitle}>
        {isEditing ? "Edit Job Details" : "Job Details"}
      </DialogTitle>
      <DialogContent dividers>
        <Box className={styles.detailsContainer}>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <Typography variant="h6" className={styles.sectionTitle}>Job Information</Typography>

          <TextField 
            label="Job Title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Company" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Experience" 
            name="experience" 
            value={formData.experience} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Salary" 
            name="salary" 
            value={formData.salary} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Job Description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            fullWidth 
            multiline 
            rows={4} 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Required Skills" 
            name="skills" 
            value={formData.skills} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Job Type" 
            name="job_type" 
            value={formData.job_type} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

          <TextField 
            label="Expire Date" 
            name="expire_date" 
            type="date"
            value={formData.expire_date} 
            onChange={handleChange} 
            fullWidth 
            disabled={!isEditing} 
            className={styles.inputField}
          />

<Typography variant="body2" className={styles.sectionTitle}>Company Logo:</Typography>
{!isEditing ? (
  <img 
    src={formData.company_logo.startsWith('http') ? formData.company_logo : `http://127.0.0.1:8000${formData.company_logo}`} 
    alt="Company Logo" 
    className={styles.companyLogo} 
  />
) : (
  <>
    {formData.company_logo && typeof formData.company_logo === "string" ? (
      <img 
        src={`http://127.0.0.1:8000${formData.company_logo}`} 
        alt="Preview" 
        className={styles.companyLogo} 
      />
    ) : formData.company_logo instanceof File ? (
      <img 
        src={URL.createObjectURL(formData.company_logo)} 
        alt="Preview" 
        className={styles.companyLogo} 
      />
    ) : null}

    <Input 
      type="file" 
      name="company_logo" 
      onChange={handleChange} 
      fullWidth 
    />
  </>
)}

        </Box>
      </DialogContent>
      <DialogActions className={styles.actions}>
        {isEditing ? (
          <>
            <Button onClick={handleSave} color="primary" variant="contained" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button onClick={() => setIsEditing(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)} color="primary" variant="contained">
              Edit
            </Button>
            <Button onClick={onClose} color="secondary" variant="outlined">
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default JobDetails;

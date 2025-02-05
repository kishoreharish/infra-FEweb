import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ManageJobs.module.scss";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  MenuItem,
  Select,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert
} from "@mui/material";
import JobDetails from "../ManageJobs/JobDetails"; // ✅ Correct import
import DeleteIcon from "@mui/icons-material/Delete";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Last 6 Months");
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      console.log("Fetching employer jobs...", token);
      
      const response = await axios.get("http://127.0.0.1:8000/api/jobs/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Jobs fetched successfully:", response.data);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setOpenDialog(true); // ✅ Open modal when View/Edit is clicked
  };

  const handleDeleteConfirmation = (jobId) => {
    setJobToDelete(jobId);
    setConfirmDelete(true);
  };

  const handleDelete = async () => {
    if (!jobToDelete) return;

    try {
      const token = localStorage.getItem("authToken");
      setDeleting(true);

      await axios.delete(`http://127.0.0.1:8000/api/jobs/${jobToDelete}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobToDelete));
      setSuccessMessage("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error.message);
    } finally {
      setDeleting(false);
      setConfirmDelete(false);
      setJobToDelete(null);
    }
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title}>Manage Jobs</Typography>
      <Typography variant="body2" className={styles.subtitle}>Ready to jump back in?</Typography>

      <Box className={styles.filterBox}>
        <Typography variant="h6">My Job Listings</Typography>
        <Select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
          <MenuItem value="Last 6 Months">Last 6 Months</MenuItem>
          <MenuItem value="Last Year">Last Year</MenuItem>
          <MenuItem value="All Time">All Time</MenuItem>
        </Select>
      </Box>

      {loading ? (
        <Box className={styles.loaderContainer}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow className={styles.tableHeader}>
                <TableCell>Title</TableCell>
                <TableCell>Applications</TableCell>
                <TableCell>Created & Expired</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <TableRow key={job.id} className={styles.tableRow}>
                    <TableCell>
                      <Box className={styles.jobInfo}>
                        <img 
                          src={`http://127.0.0.1:8000${job.company_logo}`} 
                          alt={job.title} 
                          className={styles.jobLogo} 
                        />
                        <Box>
                          <Typography className={styles.jobTitle}>{job.title}</Typography>
                          <Typography className={styles.companyLocation}>{job.company} | {job.location}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.link}>{job.application_counter}</TableCell>
                    <TableCell>
                      <Typography>{new Date(job.created_date).toLocaleDateString()}</Typography>
                      <Typography>{job.expire_date ? new Date(job.expire_date).toLocaleDateString() : "N/A"}</Typography>
                    </TableCell>
                    <TableCell className={styles.status}>
                      {new Date(job.expire_date) < new Date() ? "Inactive" : "Active"}
                    </TableCell>
                    <TableCell>
                      <div className={styles.actionButtons}>
                        <Button onClick={() => handleViewJob(job)}>View/Edit</Button>
                        <Button 
                          onClick={() => handleDeleteConfirmation(job.id)} 
                          color="error" 
                          disabled={deleting}
                        >
                          <DeleteIcon />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography>No jobs found</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* JobDetails Modal */}
      {selectedJob && (
      <JobDetails
      open={openDialog} 
      onClose={() => setOpenDialog(false)} 
      jobData={selectedJob} 
      onSave={(updatedJob) => {
        setJobs((prevJobs) => prevJobs.map(j => j.id === updatedJob.id ? updatedJob : j));
        fetchJobs(); // ✅ Refresh job list
      }}
    />
    
     
      )}

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Snackbar for success message */}
      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success">{successMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default ManageJobs;

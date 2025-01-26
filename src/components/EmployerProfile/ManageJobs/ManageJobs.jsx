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
  CircularProgress
} from "@mui/material";
import JobDetails from "./JobDetials";
import DeleteIcon from '@mui/icons-material/Delete';


const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("Last 6 Months");
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleting] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("http://127.0.0.1:8000/users/jobs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setOpenDialog(true);
  };

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://127.0.0.1:8000/jobs/${jobId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
      console.log("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error.response?.data || error.message);
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
                        {/* <IconButton 
  onClick={() => handleDelete(job.id)} 
  color="error" 
  disabled={deleting}
>
  <DeleteIcon />
</IconButton> */}
                        <Button onClick={() => handleDelete(job.id)} 
  color="error" 
  disabled={deleting}><DeleteIcon /></Button>
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
            {selectedJob && (
              <JobDetails 
                open={openDialog} 
                onClose={() => setOpenDialog(false)} 
                jobData={selectedJob} 
                onSave={(updatedJob) => {
                  setJobs((prevJobs) => prevJobs.map(j => j.id === updatedJob.id ? updatedJob : j));
                  setOpenDialog(false);
                }}
              />
            )}
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ManageJobs;

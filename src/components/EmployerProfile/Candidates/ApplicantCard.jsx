import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";
import styles from "./Candidates.module.scss";

const ApplicantCard = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/job-applications/?job_id=${jobId}`);
      setApplicants(response.data);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  return (
    <Box>
      {applicants.length > 0 ? (
        applicants.map((applicant) => (
          <Box className={styles.card} key={applicant.id}>
            <img src={applicant.profile_pic} alt={applicant.name} className={styles.profilePic} />
            <Box className={styles.details}>
              <Typography variant="h6">{applicant.name}</Typography>
              <Typography variant="body2" color="primary">{applicant.title}</Typography>
              <Typography variant="body2">{applicant.location}</Typography>
              <Typography variant="body2">{applicant.salary}</Typography>
            </Box>
            <Box className={styles.actions}>
              <IconButton><VisibilityIcon /></IconButton>
              <IconButton><CheckCircleIcon color="success" /></IconButton>
              <IconButton><CancelIcon color="error" /></IconButton>
              <IconButton><InfoIcon /></IconButton>
            </Box>
          </Box>
        ))
      ) : (
        <Typography>No applicants yet.</Typography>
      )}
    </Box>
  );
};

export default ApplicantCard;

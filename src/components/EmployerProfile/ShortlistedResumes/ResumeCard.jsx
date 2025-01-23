import React from "react";
import styles from "./ShortlistedResume.module.scss";
import { Box, Typography, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoIcon from "@mui/icons-material/Info";

const ResumeCard = ({ data }) => {
  return (
    <Box className={styles.card}>
      <img src={data.profilePic} alt={data.name} className={styles.profilePic} />
      <Box className={styles.details}>
        <Typography variant="h6">{data.name}</Typography>
        <Typography variant="body2" color="primary">
          {data.title}
        </Typography>
        <Typography variant="body2">{data.location}</Typography>
        <Typography variant="body2">{data.salary}</Typography>
        <div className={styles.tags}>
          {data.tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </Box>
      <Box className={styles.actions}>
        <IconButton>
          <VisibilityIcon />
        </IconButton>
        <IconButton>
          <CheckCircleIcon color="success" />
        </IconButton>
        <IconButton>
          <CancelIcon color="error" />
        </IconButton>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ResumeCard;

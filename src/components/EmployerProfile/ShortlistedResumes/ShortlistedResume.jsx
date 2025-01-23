import React, { useState } from "react";
import styles from "./ShortlistedResume.module.scss";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import ResumeCard from "./ResumeCard";

const ShortlistedResume = () => {
  const [timePeriod, setTimePeriod] = useState("5 years");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const shortlistedCandidates = [
    {
      id: 1,
      name: "Darlene Robertson",
      title: "UI Designer",
      location: "London, UK",
      salary: "$44 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Wade Warren",
      title: "Developer",
      location: "London, UK",
      salary: "$99 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
    },
    {
      id: 3,
      name: "Leslie Alexander",
      title: "Digital Marketer",
      location: "London, UK",
      salary: "$88 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
    },
    {
      id: 4,
      name: "Floyd Miles",
      title: "Frontend Developer",
      location: "London, UK",
      salary: "$44 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
    },
  ];

  return (
    <div className={styles.shortlistedContainer}>
      <Typography variant="h4" className={styles.title}>
        Shortlisted Resumes
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Ready to jump back in?
      </Typography>

      <div className={styles.filterRow}>
        <Typography variant="h6">Candidates</Typography>
        <div className={styles.filters}>
          <Select value={timePeriod} onChange={handleTimePeriodChange}>
            <MenuItem value="5 years">Last 5 year</MenuItem>
            <MenuItem value="1 year">Last 1 year</MenuItem>
          </Select>
          <Select value={statusFilter} onChange={handleStatusChange}>
            <MenuItem value="All">All Status</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </div>
      </div>

      <div className={styles.summary}>
        <Typography variant="body1" color="primary">
          <strong>Shortlisted Candidates</strong>
        </Typography>
        <Typography variant="body1" color="blue">
          Total(s): 6
        </Typography>
        <Typography variant="body1" color="green">
          Approved: 2
        </Typography>
        <Typography variant="body1" color="red">
          Rejected(s): 4
        </Typography>
      </div>

      <div className={styles.cardsContainer}>
        {shortlistedCandidates.map((candidate) => (
          <ResumeCard key={candidate.id} data={candidate} />
        ))}
      </div>
    </div>
  );
};

export default ShortlistedResume;

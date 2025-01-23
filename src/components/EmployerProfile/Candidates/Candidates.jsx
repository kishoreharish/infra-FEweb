import React, { useState } from "react";
import styles from "./Candidates.module.scss";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import ApplicantCard from "./ApplicantCard";

const Candidates = () => {
  const [timePeriod, setTimePeriod] = useState("5 years");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const applicants = [
    {
      id: 1,
      name: "Darlene Robertson",
      title: "UI Designer",
      location: "London, UK",
      salary: "$44 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
      status: "Approved",
    },
    {
      id: 2,
      name: "Wade Warren",
      title: "Developer",
      location: "London, UK",
      salary: "$99 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
      status: "Rejected",
    },
    {
      id: 3,
      name: "Leslie Alexander",
      title: "Digital Marketer",
      location: "London, UK",
      salary: "$88 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
      status: "Approved",
    },
    {
      id: 4,
      name: "Floyd Miles",
      title: "Frontend Developer",
      location: "London, UK",
      salary: "$44 / hour",
      tags: ["App", "Design", "Digital"],
      profilePic: "https://via.placeholder.com/60",
      status: "Rejected",
    },
  ];

  return (
    <div className={styles.candidatesContainer}>
      <Typography variant="h4" className={styles.title}>
        All Applicants!
      </Typography>
      <Typography variant="body2" className={styles.subtitle}>
        Ready to jump back in?
      </Typography>

      <div className={styles.filterRow}>
        <Typography variant="h6">Applicant</Typography>
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
          <strong>Senior Product Designer</strong>
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
        {applicants.map((applicant) => (
          <ApplicantCard key={applicant.id} data={applicant} />
        ))}
      </div>
    </div>
  );
};

export default Candidates;

import React from "react";
import styles from "./CandidateSkills.module.scss";
import { Chip } from "@mui/material";

const CandidateSkills = () => {
  const skills = [
    "React",
    "JavaScript",
    "Node.js",
    "AWS",
    "MongoDB",
    "Python",
    "HTML & CSS",
    "Docker",
    "Kubernetes",
    "GraphQL",
  ];

  return (
    <div className={styles.skillsContainer}>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.skillsList}>
        {skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            className={styles.skillChip}
            variant="outlined"
          />
        ))}
      </div>
    </div>
  );
};

export default CandidateSkills;

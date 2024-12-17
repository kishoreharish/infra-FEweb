import React from "react";
import styles from "./CandidateLanguages.module.scss";
import { Box, Typography, LinearProgress } from "@mui/material";

const CandidateLanguages = () => {
  const languages = [
    { name: "English", proficiency: 90 },
    { name: "Spanish", proficiency: 70 },
    { name: "French", proficiency: 60 },
    { name: "German", proficiency: 40 },
  ];

  return (
    <div className={styles.languagesCard}>
      <Typography variant="h6" className={styles.title}>
        Languages
      </Typography>
      <div className={styles.languagesList}>
        {languages.map((language, index) => (
          <Box key={index} className={styles.languageItem}>
            <Typography className={styles.languageName}>
              {language.name}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={language.proficiency}
              className={styles.progressBar}
            />
            <Typography className={styles.proficiencyText}>
              {language.proficiency}% Proficiency
            </Typography>
          </Box>
        ))}
      </div>
    </div>
  );
};

export default CandidateLanguages;

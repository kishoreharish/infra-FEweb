import React from "react";
import styles from "./CandidateEducation.module.scss";

const educationData = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "Stanford University",
    year: "2018 - 2022",
  },
  {
    degree: "High School Diploma",
    institution: "San Francisco High School",
    year: "2016 - 2018",
  },
  {
    degree: "Certification in Data Structures and Algorithms",
    institution: "Coursera",
    year: "2020",
  },
];

const CandidateEducation = () => {
  return (
    <div className={styles.educationCard}>
      <h2 className={styles.title}>Education</h2>
      {educationData.map((edu, index) => (
        <div key={index} className={styles.educationItem}>
          <h3 className={styles.degree}>{edu.degree}</h3>
          <p className={styles.institution}>{edu.institution}</p>
          <p className={styles.year}>{edu.year}</p>
        </div>
      ))}
    </div>
  );
};

export default CandidateEducation;

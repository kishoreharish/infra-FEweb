import React from "react";
import styles from "./CandidateWorkExperience.module.scss";

const CandidateWorkExperience = () => {
  const workExperiences = [
    {
      title: "Senior Software Engineer",
      company: "Google Inc.",
      duration: "Jan 2020 - Present",
      responsibilities: [
        "Developed scalable web applications using React and Node.js.",
        "Led a team of 5 developers to successfully deliver critical projects.",
        "Implemented CI/CD pipelines to enhance deployment efficiency.",
      ],
    },
    {
      title: "Software Developer",
      company: "Amazon Web Services",
      duration: "Jul 2017 - Dec 2019",
      responsibilities: [
        "Designed and maintained cloud solutions for enterprise clients.",
        "Collaborated with cross-functional teams to improve product performance.",
        "Enhanced backend APIs to support new product features.",
      ],
    },
    {
      title: "Intern Developer",
      company: "Tech Solutions Inc.",
      duration: "Jan 2016 - Jun 2017",
      responsibilities: [
        "Assisted in building user-friendly interfaces using React.",
        "Performed software testing and fixed bugs.",
        "Contributed to documentation for development processes.",
      ],
    },
  ];

  return (
    <div className={styles.workExperienceCard}>
      <h2 className={styles.title}>Work Experience</h2>
      <div className={styles.experienceList}>
        {workExperiences.map((work, index) => (
          <div key={index} className={styles.experienceItem}>
            <h3 className={styles.jobTitle}>{work.title}</h3>
            <p className={styles.company}>{work.company}</p>
            <p className={styles.duration}>{work.duration}</p>
            <ul className={styles.responsibilities}>
              {work.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateWorkExperience;

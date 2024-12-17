import React from "react";
import styles from "./CandidateAbout.module.scss";

const CandidateAbout = () => {
  return (
    <div className={styles.aboutCard}>
      {/* Title Section */}
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>About / Personal Summary</h2>
      </div>

      {/* About Content */}
      <div className={styles.contentWrapper}>
        <p className={styles.aboutContent}>
          I am a passionate and highly skilled Full Stack Developer with over 5
          years of experience building web applications. I specialize in
          JavaScript, React, Node.js, and cloud technologies like AWS. I take
          pride in delivering scalable and user-friendly solutions that solve
          real-world problems. My professional journey reflects dedication to
          continuous learning and collaboration to achieve project goals.
        </p>
        <p className={styles.aboutContent}>
          Outside of work, I enjoy contributing to open-source projects, writing
          technical blogs, and mentoring aspiring developers. I believe in
          creating a positive impact through technology and innovation.
        </p>
      </div>
    </div>
  );
};

export default CandidateAbout;

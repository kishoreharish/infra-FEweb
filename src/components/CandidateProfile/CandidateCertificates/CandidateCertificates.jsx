import React from "react";
import styles from "./CandidateCertificates.module.scss";

const certificatesData = [
  { title: "Certified React Developer", program: "Udemy", year: "2023" },
  { title: "AWS Solutions Architect", program: "AWS Training", year: "2022" },
  { title: "Frontend Master", program: "Coursera", year: "2021" },
  { title: "Advanced JavaScript", program: "Pluralsight", year: "2020" },
];

const CandidateCertificates = () => {
  return (
    <div className={styles.certificatesCard}>
      <h2 className={styles.title}>Certificates</h2>
      <div className={styles.certificatesGrid}>
        {certificatesData.map((certificate, index) => (
          <div key={index} className={styles.certificateItem}>
            <div>
              <h3 className={styles.certificateTitle}>{certificate.title}</h3>
              <p className={styles.programDetails}>
                {certificate.program} - <span className={styles.year}>{certificate.year}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateCertificates;

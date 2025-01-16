import React, { useState, useEffect } from "react";
import styles from "./CandidateCertificates.module.scss";

const CandidateCertificates = ({ uid }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get the token from localStorage
        const response = await fetch(`/api/user/certificates/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch certificates data");
        }

        const data = await response.json();
        setCertificates(data.certificates || []); // Assume API returns { certificates: [...] }
      } catch (err) {
        setError(err.message || "Error loading certificates");
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchCertificates();
    }
  }, [uid]);

  if (loading) return <div>Loading certificates...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.certificatesCard}>
      <h2 className={styles.title}>Certificates</h2>
      <div className={styles.certificatesGrid}>
        {certificates.length > 0 ? (
          certificates.map((certificate, index) => (
            <div key={index} className={styles.certificateItem}>
              <div>
                <h3 className={styles.certificateTitle}>{certificate.title}</h3>
                <p className={styles.programDetails}>
                  {certificate.program} - <span className={styles.year}>{certificate.year}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No certificates available.</p>
        )}
      </div>
    </div>
  );
};

export default CandidateCertificates;

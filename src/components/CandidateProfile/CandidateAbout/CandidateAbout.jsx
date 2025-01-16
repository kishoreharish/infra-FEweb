import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CandidateAbout.module.scss";

const CandidateAbout = ({ userId }) => {
  const [aboutContent, setAboutContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidateAbout = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage
        const response = await axios.get(`/api/candidates/${userId}/about`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        setAboutContent(response.data.about || "No summary available.");
      } catch (err) {
        setError("Failed to fetch candidate details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidateAbout();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.aboutCard}>
      {/* Title Section */}
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>About / Personal Summary</h2>
      </div>

      {/* About Content */}
      <div className={styles.contentWrapper}>
        <p className={styles.aboutContent}>{aboutContent}</p>
      </div>
    </div>
  );
};

export default CandidateAbout;

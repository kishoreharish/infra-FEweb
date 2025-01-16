import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CandidateEducation.module.scss";

const CandidateEducation = ({ uid }) => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!uid) {
          setError("User UID not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/user/education/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEducationData(response.data.educations); // Assuming the API response includes an `educations` array
      } catch (err) {
        setError("Failed to fetch education data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, [uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.educationCard}>
      <h2 className={styles.title}>Education</h2>
      {educationData.length > 0 ? (
        educationData.map((edu, index) => (
          <div key={index} className={styles.educationItem}>
            <h3 className={styles.degree}>{edu.degree || edu.title}</h3>
            <p className={styles.institution}>{edu.institution || edu.college_name}</p>
            <p className={styles.year}>{edu.year || `${edu.start_date} - ${edu.end_date}`}</p>
          </div>
        ))
      ) : (
        <p>No education records available.</p>
      )}
    </div>
  );
};

export default CandidateEducation;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../EmployerProfile/Jobs/jobs.module.scss";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:8000/users/jobs/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch jobs. Please try again.");
      }
    };

    fetchJobs();
  }, []);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.jobsContainer}>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <div className={styles.header}>
              <img src="https://via.placeholder.com/50" alt="Logo" />
              <div>
                <h3>{job.title}</h3>
                <p>{job.company} | {job.experience}</p>
              </div>
              <button className={styles.deleteBtn}>Delete</button>
            </div>
            <p>{job.description}</p>
            <p><strong>Skills:</strong> {job.skills}</p>
            <div className={styles.footer}>
              <span>{job.salary}</span>
              <span>{job.location}</span>
            </div>
            <button className={styles.editBtn}>Edit Job</button>
          </div>
        ))
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

export default Jobs;

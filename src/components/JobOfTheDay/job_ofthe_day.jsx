import React, { useState } from "react";
import styles from "./job_of_the_day.module.scss"; // Import SCSS for styling

const JobOfTheDay = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample job data
  const jobs = [
    { id: 1, title: "Frontend Developer", type: "Full-Time", tab: "all" },
    { id: 2, title: "Backend Developer", type: "Part-Time", tab: "popular" },
    { id: 3, title: "UI/UX Designer", type: "Remote", tab: "recent" },
    { id: 4, title: "Project Manager", type: "Internship", tab: "popular" },
    { id: 5, title: "DevOps Engineer", type: "Remote", tab: "all" },
  ];

  // Filtered jobs based on the active tab
  const filteredJobs = jobs.filter(
    (job) => activeTab === "all" || job.tab === activeTab
  );

  return (
    <div className={styles.jobOfTheDay}>
      {/* Section Title */}
      <div className={styles.header}>
        <h2>Jobs of the Day</h2>
        {/* Navigation Tabs */}
        <div className={styles.navTabs}>
          <button
            className={`${styles.tab} ${activeTab === "all" ? styles.active : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`${styles.tab} ${activeTab === "popular" ? styles.active : ""}`}
            onClick={() => setActiveTab("popular")}
          >
            Popular
          </button>
          <button
            className={`${styles.tab} ${activeTab === "recent" ? styles.active : ""}`}
            onClick={() => setActiveTab("recent")}
          >
            Recent
          </button>
        </div>
      </div>

      {/* Job Listings */}
      <div className={styles.jobList}>
        {filteredJobs.map((job) => (
          <div key={job.id} className={styles.jobCard}>
            <h4>{job.title}</h4>
            <p>{job.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOfTheDay;

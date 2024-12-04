import React, { useState } from "react";
import styles from "../Job_Filter/job_filter.module.scss"; // SCSS for styling

const JobFilter = ({ onApplyFilters }) => {
  // States for filters
  const [jobType, setJobType] = useState([]);
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState("");

  const jobTypes = ["Full-Time", "Part-Time", "Remote", "Internship"];
  const categories = ["Engineering", "Design", "Marketing", "Finance"];
  const experiences = ["Entry Level", "Mid Level", "Senior Level"];

  // Handle filter updates
  const handleJobTypeChange = (type) => {
    setJobType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({ jobType, category, experience });
  };

  return (
    <div className={styles.sidebarFilters}>
      <h4 className={styles.title}>Filter Jobs</h4>

      {/* Job Type Filter */}
      <div className={styles.filterGroup}>
        <h5 className={styles.filterTitle}>Job Type</h5>
        {jobTypes.map((type) => (
          <label key={type} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={jobType.includes(type)}
              onChange={() => handleJobTypeChange(type)}
            />
            {type}
          </label>
        ))}
      </div>

      {/* Category Filter */}
      <div className={styles.filterGroup}>
        <h5 className={styles.filterTitle}>Category</h5>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Level Filter */}
      <div className={styles.filterGroup}>
        <h5 className={styles.filterTitle}>Experience Level</h5>
        {experiences.map((exp) => (
          <label key={exp} className={styles.radioLabel}>
            <input
              type="radio"
              name="experience"
              value={exp}
              checked={experience === exp}
              onChange={(e) => setExperience(e.target.value)}
            />
            {exp}
          </label>
        ))}
      </div>

      {/* Apply Filters Button */}
      <button className={styles.applyButton} onClick={handleApplyFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default JobFilter;

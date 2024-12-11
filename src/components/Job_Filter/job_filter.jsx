import React, { useState } from "react";
import styles from "../Job_Filter/job_filter.module.scss";
import { Slider } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const JobFilter = ({ onApplyFilters }) => {
  const [jobType, setJobType] = useState([]);
  const [category, setCategory] = useState("");
  const [experience, setExperience] = useState([0, 30]); // Range slider for experience
  const [salary, setSalary] = useState([0, 15]); // Range slider for salary
  const [location, setLocation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [workMode, setWorkMode] = useState([]);
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [showAllDepartments, setShowAllDepartments] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // State to handle collapse

  const jobTypes = ["Full-Time", "Part-Time", "Remote", "Internship"];
  const categories = ["Management", "Engineer", "Finance"];
  const locations = ["Bengaluru", "Hyderabad", "Pune", "Delhi / NCR", "Mumbai", "Chennai"];
  const departments = ["Engineering", "IT & Information", "Sales & Business", "Architect", "HR", "Operations"];
  const workModes = ["Work from Office", "Hybrid", "Remote", "Temp WFH"];

  const handleToggleFilter = (filter, value, setFilter) => {
    setFilter((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      jobType,
      category,
      experience,
      salary,
      location,
      department,
      workMode,
    });
  };

  return (
    <div className={styles.sidebarFilters}>
      <div className={styles.filterHeader}>
        <h4 className={styles.title}>Filter Jobs</h4>
        <button
          className={styles.collapseButton}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </button>
      </div>

      {/* Only show the filter options when not collapsed */}
      <div className={isCollapsed ? styles.collapsedContent : styles.expandedContent}>
        {/* Job Type Filter */}
        <div className={styles.filterGroup}>
          <h5 className={styles.filterTitle}>Job Type</h5>
          {jobTypes.map((type) => (
            <label key={type} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={jobType.includes(type)}
                onChange={() => handleToggleFilter(jobType, type, setJobType)}
              />
              {type}
            </label>
          ))}
        </div>

        {/* Location Filter */}
        <div className={styles.filterGroup}>
          <h5 className={styles.filterTitle}>Location</h5>
          {locations.slice(0, showAllLocations ? locations.length : 4).map((place) => (
            <label key={place} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={location.includes(place)}
                onChange={() => handleToggleFilter(location, place, setLocation)}
              />
              {place}
            </label>
          ))}
          <span
            className={styles.viewMoreLink}
            onClick={() => setShowAllLocations(!showAllLocations)}
          >
            {showAllLocations ? "View Less" : "View More"}
          </span>
        </div>

        {/* Department Filter */}
        <div className={styles.filterGroup}>
          <h5 className={styles.filterTitle}>Department</h5>
          {departments.slice(0, showAllDepartments ? departments.length : 4).map((dept) => (
            <label key={dept} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={department.includes(dept)}
                onChange={() => handleToggleFilter(department, dept, setDepartment)}
              />
              {dept}
            </label>
          ))}
          <span
            className={styles.viewMoreLink}
            onClick={() => setShowAllDepartments(!showAllDepartments)}
          >
            {showAllDepartments ? "View Less" : "View More"}
          </span>
        </div>

        {/* Work Mode Filter */}
        <div className={styles.filterGroup}>
          <h5 className={styles.filterTitle}>Work Mode</h5>
          {workModes.map((mode) => (
            <label key={mode} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={workMode.includes(mode)}
                onChange={() => handleToggleFilter(workMode, mode, setWorkMode)}
              />
              {mode}
            </label>
          ))}
        </div>

        {/* Experience Slider */}
        <div className={styles.filterGroup}>
          <h5 className={styles.filterTitle}>Experience (Years)</h5>
          <Slider
            value={experience}
            onChange={(e, newValue) => setExperience(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={40}
          />
          <p>
            {experience[0]} yrs - {experience[1]} yrs
          </p>
        </div>

        {/* Salary Slider */}
        <div className={styles.filterGroup}>
          <h5 className={styles.filterTitle}>Salary (LPA)</h5>
          <Slider
            value={salary}
            onChange={(e, newValue) => setSalary(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={15}
          />
          <p>
            ₹{salary[0]}L - ₹{salary[1]}L
          </p>
        </div>

        {/* Job Category Filter */}
        <div className={styles.filterGroup}>
          <h5 className={styles.filterTitle}>Job Category</h5>
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

        {/* Apply Filters Button */}
        <button className={styles.applyButton} onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilter;

import React, { useState } from "react";
import { AiOutlineSearch, AiOutlineEnvironment } from "react-icons/ai"; // Icons for modern design
import styles from "./SearchBar.module.scss"; // Import SCSS file for styling

const SearchBar = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ jobTitle, location });
  };

  return (
    <form className={styles["search-bar"]} onSubmit={handleSubmit}>
      <div className={styles["input-container"]}>
        <AiOutlineSearch className={styles["icon"]} />
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job title, keywords, or company"
          className={styles["input"]}
        />
      </div>
      <div className={styles["input-container"]}>
        <AiOutlineEnvironment className={styles["icon"]} />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder='City, state, zip code, or "remote"'
          className={styles["input"]}
        />
      </div>
      <button type="submit" className={styles["search-button"]}>
        Find jobs
      </button>
    </form>
  );
};

export default SearchBar;

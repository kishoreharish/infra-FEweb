import React from "react";
import { Box, Typography } from "@mui/material"; // Material UI components
import SearchBar from "../SearchBar/SearchBar"; // SearchBar component
import styles from "./Hero.module.scss"; // SCSS for additional styling

const Hero = () => {
  const backgroundImage =
    "https://plus.unsplash.com/premium_photo-1661635138935-be92ac0e309d?q=80&w=2474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Background image URL

  return (
    <section
      className={styles.hero}
      style={{
        background: `url(${backgroundImage}) center/cover no-repeat`,
      }}
    >
      {/* Overlay */}
      <Box className={styles.overlay} />

      {/* Hero content */}
      <Box className={styles.content}>
        {/* Heading */}
        <Typography variant="h3" className={styles.title}>
          The #1 Job Board for Hiring or <br />
          Find your next job
        </Typography>

        {/* Subheading */}
        <Typography variant="h6" className={styles.subtitle}>
          Each month, more than 3 million job seekers turn to website in their
          search for work, <br />
          making over 140,000 applications every single day
        </Typography>

        {/* SearchBar Component */}
        <Box className={styles.searchBarContainer}>
          <SearchBar />
        </Box>

        {/* Popular Searches */}
        <Typography className={styles.popularSearches}>
          <strong>Popular Searches:&nbsp;</strong>
          <span>
            <a href="/search?query=Project+Manager">Project Manager</a>&nbsp;
            <a href="/search?query=Civil+Engineer">Civil Engineer</a>&nbsp;
            <a href="/search?query=Architect">Architect</a>&nbsp;
            <a href="/search?query=Safety+Manager">Safety Manager</a>
          </span>
        </Typography>
      </Box>
    </section>
  );
};

export default Hero;

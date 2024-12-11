import React from "react";
import { Box, Typography } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";
import HeroCards from "./Cards/herocards";
import styles from "./Hero.module.scss";

const Hero = () => {
  const backgroundImage =
    "https://plus.unsplash.com/premium_photo-1661635138935-be92ac0e309d?q=80&w=2474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const sampleCards = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Job ${index + 1}`,
    description: `A job description provides candidates with an outline of the main duties and responsibilities of the role for which they are applying, as well as an. ${index + 1}`,
  }));

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
      <Box className={styles.container}>
        {/* Left Column */}
        <Box className={styles.left}>
          <Typography variant="h3" className={styles.title}>
            The #1 Job Board for Hiring or <br />
            Find your next job
          </Typography>

          <Typography variant="h6" className={styles.subtitle}>
            Each month, more than 3 million job seekers turn to the website in their
            search for work, <br />
            making over 140,000 applications every single day.
          </Typography>

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

        {/* Right Column - Scrollable Cards */}
        <Box className={styles.right}>
          <Typography variant="h6" className={styles.title}>
            Current Openings
          </Typography>
          <HeroCards cards={sampleCards} />
        </Box>
      </Box>
    </section>
  );
};

export default Hero;

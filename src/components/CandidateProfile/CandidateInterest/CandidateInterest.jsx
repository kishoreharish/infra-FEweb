import React from "react";
import styles from "./CandidateInterest.module.scss";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import BrushIcon from "@mui/icons-material/Brush";
import CodeIcon from "@mui/icons-material/Code";

const CandidateInterest = () => {
  const interests = [
    { icon: <SportsSoccerIcon />, title: "Football" },
    { icon: <MusicNoteIcon />, title: "Music" },
    { icon: <FlightTakeoffIcon />, title: "Traveling" },
    { icon: <BrushIcon />, title: "Painting" },
    { icon: <CodeIcon />, title: "Coding" },
  ];

  return (
    <Card className={styles.interestsCard}>
      <CardContent>
      <Typography
  variant="h6"
  className={styles.title}
  style={{ marginTop: "0" }} // Ensures no top margin
>
  Interests & Hobbies
</Typography>
        <Grid container spacing={2} className={styles.interestsGrid}>
          {interests.map((interest, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box className={styles.interestItem}>
                <div className={styles.icon}>{interest.icon}</div>
                <Typography className={styles.text}>{interest.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CandidateInterest;

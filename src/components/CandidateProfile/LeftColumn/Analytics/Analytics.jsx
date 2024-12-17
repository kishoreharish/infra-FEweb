import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./Analytics.module.scss";

const Analytics = () => {
  const stats = [
    {
      title: "Profile Views",
      value: 1128,
      suffix: "views",
      color: "#3f8600",
      icon: <ArrowUpwardIcon style={{ color: "#3f8600", fontSize: "18px" }} />,
    },
    {
      title: "Followers",
      value: 932,
      color: "#cf1322",
      icon: <ArrowDownwardIcon style={{ color: "#cf1322", fontSize: "18px" }} />,
    },
    {
      title: "Connects",
      value: 300,
      suffix: "connects",
      color: "#1890ff",
      icon: <ArrowUpwardIcon style={{ color: "#1890ff", fontSize: "18px" }} />,
    },
    {
      title: "Search Appearance",
      value: 750,
      suffix: "times",
      color: "#fa8c16",
      icon: <ArrowUpwardIcon style={{ color: "#fa8c16", fontSize: "18px" }} />,
    },
  ];

  return (
    <Box className={styles.analyticsContainer}>
      <Grid container spacing={2} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card className={styles.card}>
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="h7" className={styles.title}>
                    {stat.title}
                  </Typography>
                  {stat.icon}
                </Box>
                <Typography
                  variant="h7"
                  style={{ color: stat.color }}
                  className={styles.value}
                >
                  {stat.value} {stat.suffix}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Analytics;

import React from "react";
import styles from "./EmployerDashboard.module.scss";
import { Box, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Avatar, Divider, Button, MenuItem, Select } from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import MessageIcon from "@mui/icons-material/Message";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LineChart from "./LineChart"; // A separate chart component
import { applicants } from "./dummyData"; // Example data for recent applicants
import EmployerSearchBar from "../../EmployerSearchBar/EmployerSearchBar";

const EmployerDashboard = () => {
  return (
    <Box className={styles.dashboardContainer}>
      <Typography variant="h4" className={styles.dashboardTitle}>
        Dashboard Home!
      </Typography>
      <Typography variant="body2" color="textSecondary" className={styles.dashboardSubtitle}>
        Ready to jump back in?
      </Typography>
<EmployerSearchBar />
      {/* Summary Cards */}
      <Grid container spacing={3} className={styles.summaryCards}>
        <Grid item xs={12} sm={3}>
          <Card className={styles.card}>
            <CardContent>
              <WorkOutlineIcon className={styles.cardIcon} />
              <Typography variant="h5" className={styles.cardNumber}>
                22
              </Typography>
              <Typography variant="body1">Posted Jobs</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={styles.card}>
            <CardContent>
              <DescriptionIcon className={styles.cardIcon} />
              <Typography variant="h5" className={styles.cardNumber}>
                9382
              </Typography>
              <Typography variant="body1">Applications</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={styles.card}>
            <CardContent>
              <MessageIcon className={styles.cardIcon} />
              <Typography variant="h5" className={styles.cardNumber}>
                74
              </Typography>
              <Typography variant="body1">Messages</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Card className={styles.card}>
            <CardContent>
              <BookmarkIcon className={styles.cardIcon} />
              <Typography variant="h5" className={styles.cardNumber}>
                32
              </Typography>
              <Typography variant="body1">Shortlisted</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Profile Views and Notifications */}
      <Grid container spacing={3} className={styles.analyticsSection}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6">Your Profile Views</Typography>
                <Select defaultValue="6months">
                  <MenuItem value="6months">Last 6 Months</MenuItem>
                  <MenuItem value="1year">Last 1 Year</MenuItem>
                </Select>
              </Box>
              <LineChart />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Notifications</Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Henry Wilson applied for a job"
                    secondary="Product Designer"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Raul Costa applied for a job"
                    secondary="Product Manager, Risk"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Jack Milk applied for a job"
                    secondary="Technical Architect"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Michel Ariana applied for a job"
                    secondary="Software Engineer"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Applicants */}
      <Typography variant="h6" className={styles.sectionTitle}>
        Recent Applicants
      </Typography>
      <Grid container spacing={3}>
        {applicants.map((applicant, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card className={styles.applicantCard}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar src={applicant.image} alt={applicant.name} className={styles.avatar} />
                  <Box ml={2}>
                    <Typography variant="h6">{applicant.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {applicant.role}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {applicant.location}
                    </Typography>
                    <Typography variant="body2">${applicant.salary} / hour</Typography>
                  </Box>
                </Box>
                <Box mt={2}>
                  <Button variant="outlined" size="small" className={styles.actionButton}>
                    View Profile
                  </Button>
                  <Button variant="contained" size="small" color="primary" className={styles.actionButton}>
                    Shortlist
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EmployerDashboard;

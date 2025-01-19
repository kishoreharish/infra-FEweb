import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import WorkIcon from "@mui/icons-material/Work";
import CallIcon from "@mui/icons-material/Call";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import ToolIcon from "@mui/icons-material/Build";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Jobs from "../../components/EmployerProfile/Jobs/jobs";
import PostAJob from "../../components/EmployerProfile/Postajob/Postajob";

const Sidebar = styled(Box)(({ theme }) => ({
  width: 240,
  height: "100vh",
  backgroundColor: "#f5f5f5",
  padding: theme.spacing(2),
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: "#fff",
  minHeight: "100vh",
}));

const EmployerProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPostJob, setShowPostJob] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Box display="flex">
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          InfraJobs
        </Typography>
        <List>
          <ListItem button>
            <WorkIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Jobs" />
          </ListItem>
          <ListItem button>
            <CallIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Phone Calls" />
          </ListItem>
          <ListItem button>
            <PeopleIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Candidates" />
          </ListItem>
          <ListItem button>
            <BarChartIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem button>
            <ToolIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Tools" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Sidebar>

      <MainContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center">
            <MenuIcon style={{ marginRight: "10px" }} />
            <Typography variant="h6">Jobs</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <NotificationsIcon style={{ marginRight: "15px", cursor: "pointer" }} />
            <Button variant="contained" color="primary" onClick={() => setShowPostJob(true)}>
              Post a Job
            </Button>
          </Box>
        </Box>

        <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
          <Tab label="Open and Paused (0)" />
          <Tab label="Closed (1)" />
        </Tabs>

        {activeTab === 0 ? <Jobs /> : <Typography variant="body1">Closed Jobs will appear here.</Typography>}

        <Box mt={5}>
          <Typography variant="h6">Manage Billing Details</Typography>
          <Divider />
          <List>
            <ListItem button>
              <ListItemText primary="View billing history" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Update payment method" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="View performance report" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Update monthly budget limit" />
            </ListItem>
          </List>
        </Box>
      </MainContent>

      {showPostJob && <PostAJob closePopup={() => setShowPostJob(false)} refreshJobs={() => {}} />}
    </Box>
  );
};

export default EmployerProfile;

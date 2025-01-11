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
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
  const { logout } = useContext(AuthContext); // Get logout from AuthContext
  const navigate = useNavigate(); // Initialize navigate

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout from AuthContext
      navigate("/"); // Redirect to home screen after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <MainContent>
        {/* Top Navigation */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box display="flex" alignItems="center">
            <MenuIcon style={{ marginRight: "10px" }} />
            <Typography variant="h6">Jobs</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <NotificationsIcon style={{ marginRight: "15px", cursor: "pointer" }} />
            <Button variant="contained" color="primary">
              Post a Job
            </Button>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Open and Paused (0)" />
          <Tab label="Closed (1)" />
        </Tabs>

        {/* Tab Content */}
        {activeTab === 0 ? (
          <Box textAlign="center" mt={5}>
            <img
              src="https://via.placeholder.com/150"
              alt="No jobs"
              style={{ marginBottom: "20px" }}
            />
            <Typography variant="body1">
              We couldn’t find any jobs that match your search criteria.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Update your search and try again.
            </Typography>
          </Box>
        ) : (
          <Box mt={5}>
            <Typography variant="body1">Closed Jobs will appear here.</Typography>
          </Box>
        )}

        {/* Billing Section */}
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
    </Box>
  );
};

export default EmployerProfile;

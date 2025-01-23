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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import PostAJob from "../../components/EmployerProfile/Postajob/Postajob";
import EmployerDashboard from "../../components/EmployerProfile/Dashboard/EmployerDashboard/EmployerDashboard";
import Candidates from "../../components/EmployerProfile/Candidates/Candidates";
import ShortlistedResume from "../../components/EmployerProfile/ShortlistedResumes/ShortlistedResume";
import CompanyProfile from "../../components/EmployerProfile/CompanyProfile/CompanyProfile";
import ManageJobs from "../../components/EmployerProfile/ManageJobs/ManageJobs";

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
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
          <ListItem button onClick={() => handleTabChange("dashboard")}>
            <DashboardIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => handleTabChange("postJob")}>
            <WorkIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Post a Job" />
          </ListItem>
          <ListItem button onClick={() => handleTabChange("manageJobs")}>
            <WorkIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Manage Jobs" />
          </ListItem>
          <ListItem button onClick={() => handleTabChange("candidates")}>
            <PeopleIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Candidates" />
          </ListItem>
          <ListItem button onClick={() => handleTabChange("shortlisted")}>
            <PeopleIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Shortlisted Resumes" />
          </ListItem>
          <ListItem button onClick={() => handleTabChange("companyProfile")}>
            <BusinessIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Company Profile" />
          </ListItem>
          <Divider />
          <ListItem button>
            <SettingsIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <LogoutIcon style={{ marginRight: "10px" }} />
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Sidebar>

      <MainContent>
        {activeTab === "dashboard" && 
        <div>
          {/* <Typography variant="h4">Welcome to the Dashboard</Typography> */}
          <EmployerDashboard />
        </div>
        }
        {activeTab === "postJob" && <PostAJob />}
        {activeTab === "manageJobs" && 
        <div><ManageJobs />
        </div>
        }
        {activeTab === "candidates" && 
        <div>
          {/* <Typography variant="h4">Candidates Section</Typography> */}
          <Candidates />
          </div>
          }
        {activeTab === "shortlisted" && 
        <div>
          {/* <Typography variant="h4">Shortlisted Resumes</Typography> */}
          <ShortlistedResume />
          </div>
          }
        {activeTab === "companyProfile" && 
        <div>
          {/* <Typography variant="h4">Company Profile Section</Typography> */}
          <CompanyProfile />
          </div>
          }
      </MainContent>
    </Box>
  );
};

export default EmployerProfile;

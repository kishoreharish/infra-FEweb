import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext"; // AuthContext
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Avatar,
  Divider,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./Topbar.module.scss";
import logo from "../../assets/images/infrajobs.jpg";
import AuthComponents from "../AuthComponents/authcomponents";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu

  const menuItems = [
    { label: "Home", path: "/" }, // Add a path for each menu item
    { label: "Jobs", path: "/jobs" },
    { label: "Companies", path: "/companies" },
    { label: "Services", path: "/services" },
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate(); // Initialize navigate

  // Toggle mobile drawer
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    toggleBodyScroll(!drawerOpen);
  };

  // Show login modal
  const handleLoginClick = () => {
    setModalContent("login");
    setShowModal(true);
  };

  // Show job post modal
  const handleJobPostClick = () => {
    setModalContent("jobPost");
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Open menu for authenticated users
  const handleMenuIconClick = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget); // Open dropdown menu
    }
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Redirect to candidate profile
  const goToCandidateProfile = () => {
    handleMenuClose();
    navigate("/candidate-profile");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout(); // Use AuthContext logout
      handleMenuClose(); // Close dropdown menu
      navigate("/"); // Redirect after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  // Disable/enable body scroll when drawer is open/closed
  const toggleBodyScroll = (disable) => {
    if (disable) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Box className={styles.outerContainer}>
          <Toolbar className={styles.toolbar}>
            {/* Logo */}
            <Box className={styles.logoContainer}>
              <img
                src={logo}
                alt="InfraJobs Logo"
                className={styles.logo}
                onClick={() => navigate("/")} // Navigate to Home when the logo is clicked
                style={{ cursor: "pointer" }}
              />
            </Box>

            {/* Desktop Menu */}
            {!isMobile && (
              <Box className={styles.menu}>
                {menuItems.map((item, index) => (
                  <Typography
                    key={index}
                    className={styles.menuItem}
                    onClick={() => navigate(item.path)} // Navigate to the corresponding path
                    style={{ cursor: "pointer" }}
                  >
                    {item.label}
                  </Typography>
                ))}

                {/* Show login buttons or user menu */}
                {!user ? (
                  <>
                    <button
                      className={styles.drawerButtonOutline}
                      onClick={handleLoginClick}
                    >
                      Login / Sign Up
                    </button>
                    <Button
                      variant="contained"
                      className={styles.buttonContained}
                      onClick={handleJobPostClick}
                    >
                      Employers / Job Post
                    </Button>
                  </>
                ) : (
                  <Box display="flex" alignItems="center">
                    <IconButton>
                      <NotificationsIcon />
                    </IconButton>
                    <Avatar
                      alt={user.username || "User"}
                      src={user.photoURL || ""}
                      sx={{ width: 30, height: 30, cursor: "pointer", mx: 1 }}
                      onClick={goToCandidateProfile}
                    />
                    <IconButton onClick={handleMenuIconClick}>
                      <MenuIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Box>
      </AppBar>

      {/* Dropdown Menu for Authenticated Users */}
      {user && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          disableScrollLock={true} // Prevent body scroll lock
          PaperProps={{
            style: {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Optional: custom shadow
              margin: 0, // Ensure no extra margin
              padding: 0, // Ensure no extra padding
            },
          }}
        >
          <MenuItem onClick={goToCandidateProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box className={styles.drawer}>
            <IconButton
              onClick={handleDrawerToggle}
              className={styles.closeIcon}
            >
              <CloseIcon />
            </IconButton>
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  button
                  key={index}
                  onClick={() => {
                    navigate(item.path); // Navigate to the corresponding path
                    handleDrawerToggle(); // Close drawer
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
              <Divider />
              {!user ? (
                <>
                  <ListItem>
                    <button
                      className={styles.drawerButtonOutline}
                      onClick={() => {
                        handleLoginClick();
                        handleDrawerToggle();
                      }}
                    >
                      Login / Sign Up
                    </button>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="contained"
                      className={styles.drawerButtonContained}
                      onClick={() => {
                        handleJobPostClick();
                        handleDrawerToggle();
                      }}
                    >
                      Employers / Job Post
                    </Button>
                  </ListItem>
                </>
              ) : (
                <>
                  <ListItem button onClick={goToCandidateProfile}>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Settings" />
                  </ListItem>
                  <ListItem>
                    <button
                      className={styles.drawerButtonOutline}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      )}

      {/* Auth Modal */}
      {showModal && (
        <div
          className={styles.modalOverlay}
          style={{ zIndex: 1300 }}
          onClick={handleCloseModal}
        >
          <div
            className={styles.modalContent}
            style={{ zIndex: 1301 }}
            onClick={(e) => e.stopPropagation()}
          >
            <AuthComponents closeModal={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;

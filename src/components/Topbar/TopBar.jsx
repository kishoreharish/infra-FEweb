import React, { useState, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styles from "./Topbar.module.scss";
import logo from "../../assets/images/infrajobs.jpg";
import AuthComponents from "../AuthComponents/authcomponents";

const TopBar = () => {
  const { user, logout } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Jobs", path: "/jobs" },
    { label: "Companies", path: "/companies" },
    { label: "Services", path: "/services" },
  ];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
    toggleBodyScroll(!drawerOpen);
  };

  const handleLoginClick = () => {
    setModalContent("login");
    setShowModal(true);
  };

  const handleJobPostClick = () => {
    setModalContent("jobPost");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const goToCandidateProfile = () => {
    handleMenuClose();
    navigate("/candidate-profile");
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleMenuClose();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

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
            <Box className={styles.logoContainer}>
              <img
                src={logo}
                alt="InfraJobs Logo"
                className={styles.logo}
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              />
            </Box>

            {!isMobile && (
              <Box className={styles.menu}>
                {menuItems.map((item, index) => (
                  <Typography
                    key={index}
                    className={styles.menuItem}
                    onClick={() => navigate(item.path)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.label}
                  </Typography>
                ))}

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
                      onClick={
                        user.role === "candidate"
                          ? handleMenuIconClick // Open the menu for candidates
                          : undefined
                      }
                    />
                    {user.role === "candidate" && (
                      <IconButton onClick={handleMenuIconClick}>
                        <MenuIcon />
                      </IconButton>
                    )}
                  </Box>
                )}
              </Box>
            )}

            {isMobile && (
              <IconButton edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Box>
      </AppBar>

      {user && user.role === "candidate" && (
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
          disableScrollLock={true}
          PaperProps={{
            style: {
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              margin: 0,
              padding: 0,
            },
          }}
        >
          <MenuItem onClick={goToCandidateProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}

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
                    navigate(item.path);
                    handleDrawerToggle();
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

import React, { useState, useEffect } from "react";
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import styles from "./Topbar.module.scss";
import logo from "../../assets/images/infrajobs.jpg";
import AuthComponents from "../AuthComponents/authcomponents";

const TopBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const menuItems = ["Home", "Jobs", "Companies", "Services"];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      setUser(null);
      handleMenuClose();
      setDrawerOpen(false);
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const handleMenuIconClick = (event) => {
    if (!isMobile && user) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToCandidateProfile = () => {
    handleMenuClose();
    navigate("/candidate-profile");
  };

  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Box className={styles.outerContainer}>
          <Toolbar className={styles.toolbar}>
            {/* Logo */}
            <Box className={styles.logoContainer}>
              <img src={logo} alt="InfraJobs Logo" className={styles.logo} />
            </Box>

            {/* Inline Menu Items (Wide screens) */}
            {!isMobile && (
              <Box className={styles.menu}>
                {menuItems.map((item, index) => (
                  <Typography key={index} className={styles.menuItem}>
                    {item}
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
                      alt={user.displayName || "User"}
                      src={user.photoURL || ""}
                      sx={{ width: 40, height: 40, cursor: "pointer", mx: 1 }}
                      onClick={goToCandidateProfile}
                    />
                    <IconButton onClick={handleMenuIconClick}>
                      <MenuIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            )}

            {/* Burger Icon for Mobile */}
            {isMobile && (
              <IconButton edge="end" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Box>
      </AppBar>

      {/* Dropdown Menu (Wide Screen) */}
      {!isMobile && user && (
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
        >
          <MenuItem onClick={goToCandidateProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}

      {/* Drawer for Mobile Only */}
      {isMobile && (
        <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
          <Box className={styles.drawer}>
            <IconButton onClick={handleDrawerToggle} className={styles.closeIcon}>
              <CloseIcon />
            </IconButton>
            <List>
              {menuItems.map((item, index) => (
                <ListItem button key={index} onClick={handleDrawerToggle}>
                  <ListItemText primary={item} />
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

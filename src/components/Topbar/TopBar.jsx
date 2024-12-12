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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";
import styles from "./Topbar.module.scss";
import logo from "../../assets/images/infrajobs.jpg";
import AuthComponents from "../AuthComponents/authcomponents";

const TopBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("login");
  const [user, setUser] = useState(null);

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
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const menuItems = ["Home", "Jobs", "Companies", "Services"];

  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Box className={styles.outerContainer}>
          <Toolbar className={styles.toolbar}>
            <Box className={styles.logoContainer}>
              <img src={logo} alt="InfraJobs Logo" className={styles.logo} />
            </Box>

            <Box className={styles.menu}>
              {menuItems.map((item, index) => (
                <Typography key={index} className={styles.menuItem}>
                  {item}
                </Typography>
              ))}

              {!user ? (
                <button
                  className={styles.drawerButtonOutline}
                  onClick={handleLoginClick}
                >
                  Login / Sign Up
                </button>
              ) : (
                <>
                  <IconButton>
                    <Avatar
                      alt={user.displayName}
                      src={user.photoURL || ""}
                    />
                  </IconButton>
                  {/* <Typography className={styles.userName}>{user.displayName}</Typography> */}
                  <button
                    className={styles.drawerButtonOutline}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}

              <Button
                variant="contained"
                className={styles.buttonContained}
                onClick={handleJobPostClick}
              >
                Employers / Job Post
              </Button>
            </Box>

            <IconButton
              edge="end"
              onClick={handleDrawerToggle}
              className={styles.hamburger}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>

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
              <ListItem button key={index} onClick={handleDrawerToggle}>
                <ListItemText
                  primary={item}
                  className={styles.drawerItem}
                />
              </ListItem>
            ))}

            <ListItem>
              {!user ? (
                <button
                  className={styles.drawerButtonOutline}
                  onClick={handleLoginClick}
                >
                  Login / Sign Up
                </button>
              ) : (
                <>
                  <button
                    className={styles.drawerButtonOutline}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </ListItem>

            <ListItem>
              <Button
                variant="contained"
                className={styles.drawerButtonContained}
                onClick={handleJobPostClick}
              >
                Employers / Job Post
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {showModal && (
        <div className={styles.modalOverlay} style={{ zIndex: 1300 }} onClick={handleCloseModal}>
          <div
            className={styles.modalContent}
            style={{ zIndex: 1301 }}
            onClick={(e) => e.stopPropagation()}
          >
            {modalContent === "login" ? (
              <AuthComponents closeModal={handleCloseModal} />
            ) : (
              <AuthComponents closeModal={handleCloseModal} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;

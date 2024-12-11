import React, { useState } from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./Topbar.module.scss";
import logo from "../../assets/images/infrajobs.jpg"; // Import the logo image
import AuthComponents from "../AuthComponents/authcomponents"; // Import AuthComponents (ensure the path is correct)

const TopBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // Drawer state
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLoginClick = () => {
    setShowModal(true); // Show modal when Login button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
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

            {/* Desktop Menu */}
            <Box className={styles.menu}>
              {menuItems.map((item, index) => (
                <Typography key={index} className={styles.menuItem}>
                  {item}
                </Typography>
              ))}

              {/* Login Button */}
              <button
                variant="outlined"
                className={styles.drawerButtonOutline}
                onClick={handleLoginClick}
              >
                Login / Sign Up
              </button>

              {/* Modal */}
              {showModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                  <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <AuthComponents closeModal={handleCloseModal} />
                  </div>
                </div>
              )}

              <Button variant="contained" className={styles.buttonContained}>
                Job Post
              </Button>
            </Box>

            {/* Hamburger Menu */}
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

      {/* Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box className={styles.drawer}>
          <IconButton onClick={handleDrawerToggle} className={styles.closeIcon}>
            <CloseIcon />
          </IconButton>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={handleDrawerToggle}>
                <ListItemText primary={item} className={styles.drawerItem} />
              </ListItem>
            ))}
            <ListItem>
              {/* Login Button */}
              <button
                variant="outlined"
                className={styles.drawerButtonOutline}
                onClick={handleLoginClick}
              >
                Login / Sign Up
              </button>

              {/* Modal */}
              {showModal && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                  <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    
                    <AuthComponents closeModal={handleCloseModal} />
                  </div>
                </div>
              )}
            </ListItem>
            <ListItem>
              <Button variant="contained" className={styles.drawerButtonContained}>
                Job Post
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;

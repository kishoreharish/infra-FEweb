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

const TopBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = ["Home", "Jobs", "Companies", "Services"];

  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Box className={styles.outerContainer}>
          <Toolbar className={styles.toolbar}>
            {/* Logo */}
            <Typography variant="h6" className={styles.logo}>
              JobPortal
            </Typography>

            {/* Desktop Menu */}
            <Box className={styles.menu}>
              {menuItems.map((item, index) => (
                <Typography key={index} className={styles.menuItem}>
                  {item}
                </Typography>
              ))}
              <Button variant="outlined" className={styles.buttonOutline}>
                Login / Signup
              </Button>
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
              <Button variant="outlined" className={styles.drawerButtonOutline}>
                Login / Signup
              </Button>
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

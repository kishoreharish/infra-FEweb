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
import MenuIcon from "@mui/icons-material/Menu"; // Hamburger menu icon
import CloseIcon from "@mui/icons-material/Close"; // Close icon for drawer

const TopBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = ["Home", "Jobs", "Companies", "Services"]; // Main menu items

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white", // White background
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", // Subtle shadow for better visibility
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo or Brand */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "#3B3B3B", // Hard grey color for text
              fontWeight: "bold",
            }}
          >
            JobPortal
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" }, // Hidden on small screens
              gap: 3,
              alignItems: "center",
            }}
          >
            {menuItems.map((item, index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  cursor: "pointer",
                  color: "#3B3B3B", // Hard grey font color for menu items
                  fontWeight: "500",
                  "&:hover": {
                    color: "black", // Slightly darker grey on hover
                  },
                }}
              >
                {item}
              </Typography>
            ))}

            {/* Buttons */}
            <Button
              variant="outlined"
              sx={{
                borderColor: "#636363",
                color: "#3B3B3B",
                fontWeight: "500",
                textTransform: "none", // Prevent uppercase transformation
                "&:hover": {
                  borderColor: "black",
                  color: "black",
                },
              }}
            >
              Login / Signup
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2", // Primary color for Employers button
                color: "white",
                fontWeight: "500",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#115293", // Darker shade on hover
                },
              }}
            >
              Job Post
            </Button>
            
          </Box>

          {/* Hamburger Menu Icon */}
          <IconButton
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" }, color: "gray" }} // Grey icon for the hamburger
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Hamburger Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, padding: 2 }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: "gray" }}>
            <CloseIcon />
          </IconButton>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={handleDrawerToggle}>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    style: { color: "#636363", fontWeight: "500" }, // Grey font color for drawer menu items
                  }}
                />
              </ListItem>
            ))}
            {/* Buttons in the Drawer */}
            <ListItem>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "#636363",
                  color: "#636363",
                  width: "100%",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "black",
                    color: "black",
                  },
                }}
              >
                Login / Signup
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  width: "100%",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                Job Post
              </Button>
            </ListItem>
            <ListItem>
              
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default TopBar;

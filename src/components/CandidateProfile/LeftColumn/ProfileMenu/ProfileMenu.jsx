import React, { useState } from "react";
import styles from "./ProfileMenu.module.scss";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const ProfileMenu = ({ setActiveContent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMenuClick = (item) => {
    setActiveContent(item); // Update the active content in CandidateProfile
  };

  return (
    <div className={styles.profileMenu}>
      {/* Toggle Button for Mobile */}
      <div className={styles.toggleButton} onClick={toggleCollapse}>
        <h2 className={styles.title}>Menu</h2>
        {isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </div>

      {/* Menu Content */}
      <div
        className={`${styles.menuContent} ${
          isCollapsed ? styles.collapsed : ""
        }`}
      >
        {/* My Profile Section */}
        <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={() => handleMenuClick("Profile Home")}>
            Profile Home
          </li>
          <li className={styles.menuItem} onClick={() => handleMenuClick("My Profile")}>
            My Profile
          </li>
          <li className={styles.menuItem} onClick={() => handleMenuClick("Contact Info")}>
            Contact Info
          </li>
          <li className={styles.menuItem} onClick={() => handleMenuClick("Job Alerts")}>
            Job Alerts
          </li>
          <li className={styles.menuItem} onClick={() => handleMenuClick("My Jobs")}>
            My Jobs
          </li>
          <li className={styles.menuItem} onClick={() => handleMenuClick("Saved Jobs")}>
            Saved Jobs
          </li>
         
        </ul>

        <hr className={styles.divider} />

        {/* My Resume Section */}
        <ul className={styles.menuList}>
          <li className={styles.menuItem} onClick={() => handleMenuClick("My Resume")}>
            My Resume
          </li>
          <li className={styles.menuItem} onClick={() => handleMenuClick("Build Resume")}>
            Build Resume
          </li>
          <li className={styles.menuItem} onClick={() => handleMenuClick("Premium Profile")}>
            Premium Profile
          </li>
        </ul>

        <hr className={styles.divider} />

        {/* Settings Section */}
        <ul className={styles.menuList}>
          <li className={styles.menuItem} onClick={() => handleMenuClick("Settings")}>
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;

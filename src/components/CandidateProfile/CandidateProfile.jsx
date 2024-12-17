import React, { useState } from "react";
import styles from "./CandidateProfile.module.scss";

// Importing components
import SquareAdBox from "./LeftColumn/SquareAdBox/SquareAdBox";
import ProfileMenu from "./LeftColumn/ProfileMenu/ProfileMenu";
import MyProfile from "./MyProfile/MyProfile";
import ContactInfo from "./LeftColumn/ContactInfo/ContactInfo";
import ProfileHome from "./ProfileHome/ProfileHome";

const CandidateProfile = () => {
  const [activeContent, setActiveContent] = useState("Profile Home");

  const renderContent = () => {
    switch (activeContent) {
      case "Profile Home":
        return <ProfileHome />;
      case "My Profile":
        return <MyProfile />;
      case "Contact Info":
        return <ContactInfo />;
       
      default:
        return <div>Select a menu item.</div>;
    }
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.leftColumn}>
        <SquareAdBox />
        <ProfileMenu setActiveContent={setActiveContent} />
      </div>
      <div className={styles.rightColumn}>{renderContent()}</div>
    </div>
  );
};

export default CandidateProfile;

import React from "react";
import { Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import styles from "./ProfileCard.module.scss";

// Importing components for ProfileCard
import CandidateCoverAvatar from "../CandidateCoverAvatar/CandidateCoverAvatar";
import CandidateBio from "../CandidateBio/CandidateBio";
import CandidateCertificates from "../CandidateCertificates/CandidateCertificates";
import CandidateFollowerConnect from "../CandidateFollowerConnect/CandidateFollowerConnect";

const ProfileCard = () => {
  return (
    <div className={styles.profileCard}>
      {/* Cover Image */}
      <div className={styles.coverImageWrapper}>
        <img
          src="https://via.placeholder.com/1200x180"
          alt="Cover"
          className={styles.coverImage}
        />
      </div>

      {/* Avatar overlapping cover image */}
      <div className={styles.avatarWrapper}>
        <CandidateCoverAvatar />
      </div>

      {/* Content below the avatar */}
      <div className={styles.cardContent}>
        <h2 className={styles.name}>John Doe</h2>
        <p className={styles.title}>Full Stack Developer</p>

        {/* Certificates */}
        <div className={styles.certificates}>
          <span className={styles.certItem}>Certified React Developer</span>
          <span className={styles.certItem}>AWS Solutions Architect</span>
        </div>

        {/* Bio */}
        <div className={styles.bio}>
          <CandidateBio />
        </div>

        {/* Place */}
        <p className={styles.place}>San Francisco, CA</p>

        {/* Footer Section */}
        <div className={styles.footerSection}>
          <div className={styles.followConnect}>
            <CandidateFollowerConnect />
          </div>

          {/* Update Links */}
          <div className={styles.updateLinks}>
            <Link href="#" underline="none" className={styles.updateLink}>
              <EditIcon fontSize="small" />
              <span>Update Profile</span>
            </Link>
            <Link href="#" underline="none" className={styles.updateLink}>
              <DescriptionIcon fontSize="small" />
              <span>Update Resume</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

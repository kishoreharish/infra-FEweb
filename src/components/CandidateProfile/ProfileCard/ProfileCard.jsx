import React, { useEffect, useState } from "react";
import { Link } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DescriptionIcon from "@mui/icons-material/Description";
import styles from "./ProfileCard.module.scss";

// Importing components for ProfileCard
import CandidateCoverAvatar from "../CandidateCoverAvatar/CandidateCoverAvatar";
import CandidateBio from "../CandidateBio/CandidateBio";
import CandidateFollowerConnect from "../CandidateFollowerConnect/CandidateFollowerConnect";

const ProfileCard = ({ uid }) => {
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateUserDetails = async (updatedData) => {
    const token = localStorage.getItem("authToken");
    
    try {
      const response = await fetch("/api/candidates/update/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert("User details updated successfully!");
      } else {
        console.error("Failed to update user details.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    // Fetch candidate data dynamically based on the uid
    const fetchCandidateData = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage

        const response = await fetch(`/api/user/profile/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch candidate data");
        }

        const data = await response.json();
        setCandidateData(data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    if (uid) {
      fetchCandidateData();
    }
  }, [uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const {
    full_name,
    title,
    certifications,
    bio,
    avatar,
    cover_image,
    followers,
    connects,
  } = candidateData;

  return (
    <div className={styles.profileCard}>
      {/* Cover Image */}
      <div className={styles.coverImageWrapper}>
        <img
          src={cover_image || "https://via.placeholder.com/1200x180"}
          alt="Cover"
          className={styles.coverImage}
        />
      </div>

      {/* Avatar overlapping cover image */}
      <div className={styles.avatarWrapper}>
        <CandidateCoverAvatar avatarUrl={avatar} />
      </div>

      {/* Content below the avatar */}
      <div className={styles.cardContent}>
        <h2 className={styles.name}>{full_name || "Full Name"}</h2>
        <p className={styles.title}>{title || "Title"}</p>

        {/* Certifications */}
        <div className={styles.certifications}>
          {certifications?.length > 0 ? (
            certifications.map((cert, index) => (
              <span key={index} className={styles.certItem}>
                {cert}
              </span>
            ))
          ) : (
            <span>No Certifications</span>
          )}
        </div>

        {/* Bio */}
        <div className={styles.bio}>
          <CandidateBio bio={bio} />
        </div>

        {/* Followers and Connects */}
        <div className={styles.followersConnect}>
          <span>{followers} Followers</span> | <span>{connects} Connects</span>
        </div>

        {/* Footer Section */}
        <div className={styles.footerSection}>
          <div className={styles.followConnect}>
            <CandidateFollowerConnect />
          </div>

          {/* Update Links */}
          <div className={styles.updateLinks}>
            <Link
              href="/components/CandidateProfile/EditCandidate"
              underline="none"
              className={styles.updateLink}
            >
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

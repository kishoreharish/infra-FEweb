import React, { useState, useEffect } from "react";
import styles from "./MyProfile.module.scss";
import CandidateWorkExperience from "../WorkExperience/CandidateWorkExperience";
import CandidateReferTest from "../CandidateReferTest/CandidateReferTest";
import CandidateAbout from "../CandidateAbout/CandidateAbout";
import CandidateLanguages from "../CandidateLanguages/CandidateLanguages";
import CandidateInterest from "../CandidateInterest/CandidateInterest";

const MyProfile = () => {
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const uid = localStorage.getItem("uid");

        // Check if token or UID is missing
        if (!token || !uid) {
          setError("Authentication error. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/users/candidate/details/${uid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch user details.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("An error occurred while fetching user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.myProfile}>
      {/* Dynamically render components with the fetched data */}
      <CandidateWorkExperience workExperiences={userData?.work_experiences || []} />
      <CandidateReferTest references={userData?.references || []} />
      <CandidateAbout about={userData?.bio || "No bio available"} />
      <CandidateLanguages languages={userData?.languages || []} />
      <CandidateInterest interest={userData?.interest || []} />
    </div>
  );
};

export default MyProfile;

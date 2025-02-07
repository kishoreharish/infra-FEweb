import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Alert, Card, Tabs, Avatar, message } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./CandidateProfile.module.scss";
import ProfileHome from "./ProfileHome/ProfileHome";
import MyProfile from "./MyProfile/MyProfile";
import MyResume from "./MyResume/MyResume";
import MyJobs from "../Jobs/MyJobs";
import axiosInstance from "../../utils/axiosInstance"; // ✅ Import axios instance with auto-refresh

const { TabPane } = Tabs;

const CandidateProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("users/candidate/profile/");
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          setError("Failed to load profile data.");
        }
      } catch (err) {
        console.error("API Error:", err.response || err.message);
        setError("An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Function to handle profile update
  const handleProfileUpdate = async (updatedData) => {
    try {
      const response = await axiosInstance.post(
        "users/candidate/profile/update/",
        updatedData
      );

      if (response.status === 200) {
        message.success("Profile updated successfully!");
        setUserData(response.data);

        // If a new token is returned, update localStorage
        if (response.data.authToken) {
          localStorage.setItem("authToken", response.data.authToken);
        }
      } else {
        message.error("Failed to update profile.");
      }
    } catch (err) {
      console.error("Update Error:", err.response || err.message);
      message.error("An error occurred while updating profile.");
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Loading Profile..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Alert message={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      <Card className={styles.profileCard}>
        {/* Avatar and Basic Information */}
        <div className={styles.profileHeader}>
          <Avatar size={100} icon={<UserOutlined />} src={userData.avatar || ""} />
          <h2>{userData.full_name || "Candidate Name"}</h2>
          <p>{userData.title || "Candidate Title"}</p>
        </div>

        {/* Contact Information */}
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <PhoneOutlined /> {userData.phone_number || "N/A"}
          </div>
          <div className={styles.contactItem}>
            <MailOutlined /> {userData.email || "N/A"}
          </div>
        </div>
      </Card>

      {/* Tabs for Additional Information */}
      <Tabs defaultActiveKey="1" className={styles.profileTabs}>
        <TabPane tab="Profile Home" key="1">
          <ProfileHome userData={userData} />
        </TabPane>

        <TabPane tab="My Profile" key="2">
          {/* Pass `handleProfileUpdate` to `MyProfile` */}
          <MyProfile userData={userData} onUpdateProfile={handleProfileUpdate} />
        </TabPane>

        <TabPane tab="My Resume" key="3">
          <MyResume userData={userData} />
        </TabPane>

        <TabPane tab="My Jobs" key="4">
          <div className={styles.tabContent}>
            <h3>My Jobs</h3>
            <MyJobs />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CandidateProfile;

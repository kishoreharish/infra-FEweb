import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, Alert, Card, Tabs, Avatar } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import styles from "./CandidateProfile.module.scss";
import ProfileHome from "./ProfileHome/ProfileHome";

const { TabPane } = Tabs;

const CandidateProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authentication error. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/users/candidate/profile/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          setError("Failed to load profile data.");
        }
      } catch (err) {
        console.error("API Error:", err.response || err.message);
        setError(
          err.response?.data?.error ||
            "An error occurred while fetching profile data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
          <Avatar
            size={100}
            icon={<UserOutlined />}
            src={userData.avatar || ""}
          />
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
          <div className={styles.tabContent}>
            <h3>My Profile</h3>
            <p>
              <strong>Skills:</strong>
              <ul>
                {userData.skills
                  ? userData.skills.split(",").map((skill, index) => (
                      <li key={index}>{skill.trim()}</li>
                    ))
                  : "No skills provided."}
              </ul>
            </p>
            <p>
              <strong>Languages:</strong> {userData.languages || "No languages provided."}
            </p>
          </div>
        </TabPane>

        <TabPane tab="My Resume" key="3">
          <div className={styles.tabContent}>
            <h3>My Resume</h3>
            <p>{userData.resume || "No resume uploaded yet."}</p>
          </div>
        </TabPane>

        <TabPane tab="My Jobs" key="4">
          <div className={styles.tabContent}>
            <h3>My Jobs</h3>
            <p>{userData.jobs || "No job applications found."}</p>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default CandidateProfile;

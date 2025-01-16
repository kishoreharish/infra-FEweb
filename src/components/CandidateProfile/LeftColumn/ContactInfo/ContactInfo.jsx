import React, { useState, useEffect } from "react";
import styles from "./ContactInfo.module.scss";
import { Phone, Email, LocationOn } from "@mui/icons-material";
import axios from "axios";

const ContactInfo = ({ uid }) => {
  const [contactInfo, setContactInfo] = useState(null); // Store contact info
  const [loading, setLoading] = useState(true); // Show loading state
  const [error, setError] = useState(null); // Show error state

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Get auth token

        if (!uid || !token) {
          setError("Authentication error. Please log in again.");
          setLoading(false);
          return;
        }

        // Make API call to fetch contact information
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/candidate/contact-info/${uid}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in headers
            },
          }
        );

        if (response.status === 200) {
          setContactInfo(response.data); // Set fetched contact info
        } else {
          setError("Failed to fetch contact information.");
        }
      } catch (err) {
        console.error("Error fetching contact info:", err.response || err.message);
        setError("An error occurred while fetching contact information.");
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, [uid]);

  if (loading) return <div className={styles.loading}>Loading contact information...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.contactCard}>
      <h2 className={styles.title}>Contact Information</h2>
      <div className={styles.contactFields}>
        {/* Phone */}
        {contactInfo?.phone_number && (
          <div className={styles.contactItem}>
            <Phone className={styles.icon} />
            <span className={styles.text}>{contactInfo.phone_number}</span>
          </div>
        )}

        {/* Email */}
        {contactInfo?.email && (
          <div className={styles.contactItem}>
            <Email className={styles.icon} />
            <span className={styles.text}>{contactInfo.email}</span>
          </div>
        )}

        {/* Address */}
        {(contactInfo?.address_line1 || contactInfo?.address_line2 || contactInfo?.city) && (
          <div className={styles.contactItem}>
            <LocationOn className={styles.icon} />
            <span className={styles.text}>
              {contactInfo.address_line1 || ""}
              {contactInfo.address_line2 ? `, ${contactInfo.address_line2}` : ""}
              {contactInfo.city ? `, ${contactInfo.city}` : ""}
              {contactInfo.state ? `, ${contactInfo.state}` : ""}
              {contactInfo.pincode ? ` - ${contactInfo.pincode}` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInfo;

import React from "react";
import styles from "./ContactInfo.module.scss";
import { Phone, Email, LocationOn, Language } from "@mui/icons-material";

const ContactInfo = () => {
  return (
    <div className={styles.contactCard}>
      <h2 className={styles.title}>Contact Information</h2>
      <div className={styles.contactFields}>
        {/* Phone */}
        <div className={styles.contactItem}>
          <Phone className={styles.icon} />
          <span className={styles.text}>+1 234 567 890</span>
        </div>

        {/* Email */}
        <div className={styles.contactItem}>
          <Email className={styles.icon} />
          <span className={styles.text}>johndoe@example.com</span>
        </div>

        {/* Address */}
        <div className={styles.contactItem}>
          <LocationOn className={styles.icon} />
          <span className={styles.text}>1234 Main St, San Francisco, CA</span>
        </div>

        {/* Website */}
        <div className={styles.contactItem}>
          <Language className={styles.icon} />
          <a
            href="https://www.johndoeportfolio.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            www.johndoeportfolio.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;

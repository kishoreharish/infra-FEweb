import styles from "./MyProfile.module.scss";
import React, { useState } from "react";
import EditProfile from "./EditProfile";

const MyProfile = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => setIsEditing(true);
  const handleCloseEditProfile = () => setIsEditing(false);

  // Provide default values to avoid errors
  const {
    full_name = "Not Available",
    title = "Not Available",
    gender = "Not Available",
    dob = "Not Available",
    cover_letter = "Not Available",
    skills = "",
    technical_skills = "",
    experience = "Not Available",
    education = "Not Available",
    interest = "Not Available",
    languages = "Not Available",
    about = "Not Available",
  } = userData || {};

  // Convert comma-separated strings to arrays (if not already arrays)
  const skillsArray = typeof skills === "string" ? skills.split(",") : skills;
  const technicalSkillsArray =
    typeof technical_skills === "string"
      ? technical_skills.split(",")
      : technical_skills;
  const experiencesArray =
    typeof experience === "string" ? experience.split(",") : experience;
  const educationsArray =
    typeof education === "string" ? education.split(",") : education;
  const interestsArray =
    typeof interest === "string" ? interest.split(",") : interest;
  const languagesArray =
    typeof languages === "string" ? languages.split(",") : languages;

  return (
    <div className={styles.myProfileContainer}>
      {/* Edit Profile Button */}
      <div className={styles.header}>
        <h1>My Profile</h1>
        <button className={styles.editButton} onClick={handleEditProfile}>Edit Profile</button>
        {isEditing && (
          <EditProfile
            userData={userData}
            onClose={handleCloseEditProfile}
            onSave={(updatedData) => {
              console.log("Saving data:", updatedData); // Debugging info
              // Save to the backend API here
            }}
          />
        )}
      </div>

      {/* Personal Details */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Personal Details</h2>
        <div className={styles.detailsRow}>
          <div className={styles.field}>
            <strong>Full Name:</strong> {full_name}
          </div>
          <div className={styles.field}>
            <strong>Title:</strong> {title}
          </div>
          <div className={styles.field}>
            <strong>Gender:</strong> {gender}
          </div>
          <div className={styles.field}>
            <strong>Date of Birth:</strong> {dob}
          </div>
        </div>
        <div className={styles.divider} />
      </div>

      {/* Cover Letter */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Cover Letter</h2>
        <p className={styles.content}>{cover_letter}</p>
        <div className={styles.divider} />
      </div>

      {/* Skills */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Skills</h2>
        <h4 className={styles.sectionTitle}>Professional Skills</h4>
        <div className={styles.skills}>
          {skillsArray && skillsArray.length > 0 ? (
            skillsArray.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill.trim()}
              </span>
            ))
          ) : (
            <p className={styles.content}>No skills available.</p>
          )}
        </div>
        <h4 className={styles.sectionTitle}>Technical Skills</h4>
        <div className={styles.skills}>
          {technicalSkillsArray && technicalSkillsArray.length > 0 ? (
            technicalSkillsArray.map((skill, index) => (
              <span key={index} className={styles.skill}>
                {skill.trim()}
              </span>
            ))
          ) : (
            <p className={styles.content}>No technical skills available.</p>
          )}
        </div>
        <div className={styles.divider} />
      </div>

      {/* Professional Certifications */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Professional Certifications</h2>
        {experiencesArray && experiencesArray.length > 0 ? (
          experiencesArray.map((exp, index) => <p key={index}>{exp.trim()}</p>)
        ) : (
          <p className={styles.content}>No certificates available.</p>
        )}
        <div className={styles.divider} />
      </div>

      {/* Experiences */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Experiences</h2>
        {experiencesArray && experiencesArray.length > 0 ? (
          experiencesArray.map((exp, index) => <p key={index}>{exp.trim()}</p>)
        ) : (
          <p className={styles.content}>No experiences available.</p>
        )}
        <div className={styles.divider} />
      </div>

      {/* Educations */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Educations</h2>
        {educationsArray && educationsArray.length > 0 ? (
          educationsArray.map((edu, index) => <p key={index}>{edu.trim()}</p>)
        ) : (
          <p className={styles.content}>No education history available.</p>
        )}
        <div className={styles.divider} />
      </div>

      {/* Interests */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Interests</h2>
        {interestsArray && interestsArray.length > 0 ? (
          interestsArray.map((int, index) => <p key={index}>{int.trim()}</p>)
        ) : (
          <p className={styles.content}>No interests available.</p>
        )}
        <div className={styles.divider} />
      </div>

      {/* Languages */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Languages</h2>
        {languagesArray && languagesArray.length > 0 ? (
          languagesArray.map((lang, index) => <p key={index}>{lang.trim()}</p>)
        ) : (
          <p className={styles.content}>No languages available.</p>
        )}
        <div className={styles.divider} />
      </div>

      {/* About */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.content}>{about}</p>
        <div className={styles.divider} />
      </div>
    </div>
  );
};

export default MyProfile;

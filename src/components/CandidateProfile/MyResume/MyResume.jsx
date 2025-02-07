import React from "react";
import styles from "./MyResume.module.scss";
import { Avatar } from "antd";

const MyResume = ({ userData }) => {
  // ✅ Ensure all these fields are arrays before mapping
  const certifications = Array.isArray(userData?.certifications) ? userData.certifications : [];
  const educations = Array.isArray(userData?.education) ? userData.education : [];
  const experiences = Array.isArray(userData?.experience) ? userData.experience : [];
  const awards = Array.isArray(userData?.awards) ? userData.awards : [];
  const professionalSkills = Array.isArray(userData?.professionalSkills) ? userData.professionalSkills : [];
  const technicalSkills = Array.isArray(userData?.technicalSkills) ? userData.technicalSkills : [];
  const references = Array.isArray(userData?.references) ? userData.references : [];
  const description = userData?.description || "No description available.";

  return (
    <div className={styles.resumeContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{userData?.full_name || "Full Name"}</h1>
          <h2>{userData?.title || "Your Professional Title"}</h2>
        </div>
        <div className={styles.headerRight}>
          <Avatar size={80} src={userData?.avatar || ""} />
        </div>
      </div>

      {/* Bio Section */}
      <div className={styles.bio}>
        <p>{description}</p>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Certifications */}
          <section>
            <h3>Professional Certifications</h3>
            {certifications.length > 0 ? (
              <ul>
                {certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            ) : (
              <p>No certifications available.</p>
            )}
            <hr />
          </section>

          {/* Education */}
          <section>
            <h3>Education</h3>
            {educations.length > 0 ? (
              educations.map((edu, index) => (
                <div key={index}>
                  <h4>
                    {edu.degree} / {edu.major} <span>{edu.year}</span>
                  </h4>
                  <p>{edu.description}</p>
                  {index < educations.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <p>No education information available.</p>
            )}
            <hr />
          </section>

          {/* Work Experience */}
          <section>
            <h3>Work Experiences</h3>
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <div key={index}>
                  <h4>
                    {exp.position} at {exp.company} <span>{exp.year}</span>
                  </h4>
                  <p>{exp.description}</p>
                  {index < experiences.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <p>No work experience available.</p>
            )}
            <hr />
          </section>

          {/* Awards */}
          <section>
            <h3>Awards</h3>
            {awards.length > 0 ? (
              <ul>
                {awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            ) : (
              <p>No awards available.</p>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Skills */}
          <section>
            <h3>Skills</h3>
            <h4>Professional Skills</h4>
            {professionalSkills.length > 0 ? (
              <ul>
                {professionalSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No professional skills available.</p>
            )}
            <h4>Technical Skills</h4>
            {technicalSkills.length > 0 ? (
              <ul>
                {technicalSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            ) : (
              <p>No technical skills available.</p>
            )}
          </section>

          {/* References */}
          <section>
            <h3>References</h3>
            {references.length > 0 ? (
              references.map((ref, index) => (
                <div key={index}>
                  <p>{ref.name}</p>
                  <p>{ref.title}</p>
                  <p>{ref.phone}</p>
                  <p>{ref.email}</p>
                  {index < references.length - 1 && <hr />}
                </div>
              ))
            ) : (
              <p>No references available.</p>
            )}
          </section>
        </div>
      </div>

      {/* Footer Section */}
      <div className={styles.footer}>
        <div className={styles.footerSection}>
          <p>{userData?.phone || "Phone not available"}</p>
          <p>{userData?.email || "Email not available"}</p>
          <p>{userData?.website || "Website not available"}</p>
        </div>
        <div className={styles.footerSection}>
          <p>{userData?.addressLine1 || "Address Line 1"}</p>
          <p>{userData?.addressLine2 || "Address Line 2"}</p>
          <p>
            {userData?.city || "City"}, {userData?.state || "State"},{" "}
            {userData?.country || "Country"}
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact Me</h3>
        </div>
      </div>
    </div>
  );
};

export default MyResume;

import React, { useState } from "react";
import axios from "axios";
import styles from "./EditProfile.module.scss";

const EditProfile = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    full_name: userData?.full_name || "",
    phone_number: userData?.phone_number || "",
    title: userData?.title || "",
    about: userData?.about || "",
    interest: userData?.interest || "",
    languages: userData?.languages || "",
    skills: userData?.skills || "",
    professional_skills: userData?.professional_skills || "",
    technical_skills: userData?.technical_skills || "",
    address_line1: userData?.address_line1 || "",
    address_line2: userData?.address_line2 || "",
    area: userData?.area || "",
    city: userData?.city || "",
    state: userData?.state || "",
    pincode: userData?.pincode || "",
    description: userData?.description || "",
    cover_letter: userData?.cover_letter || "",
    experience: userData?.experience || "",
    education: userData?.education || "",
    gender: userData?.gender || "",
    dob: userData?.dob || "",
    reference: userData?.reference || "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Track successful save

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/users/candidate/update-profile/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to save profile. Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Profile updated successfully:", result);
      setSuccess(true); // Set success to true
      onSave(formData); // Trigger save callback
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupContent}>
        <div className={styles.header}>
          <h2>Edit Profile</h2>
          <button type="button" onClick={onClose}>
            &times;
          </button>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
        {success && (
          <div className={styles.successMessage}>
            Profile updated successfully!
          </div>
        )}
        {!success && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.scrollableContainer}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Gender</label>
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>About</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Interest</label>
                <input
                  type="text"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Languages</label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Technical Skills</label>
                <input
                  type="text"
                  name="technical_skills"
                  value={formData.technical_skills}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Address Line 1</label>
                <input
                  type="text"
                  name="address_line1"
                  value={formData.address_line1}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Address Line 2</label>
                <input
                  type="text"
                  name="address_line2"
                  value={formData.address_line2}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.formActions}>
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        )}
        {success && (
          <div className={styles.formActions}>
            <button className={styles.editButton}
              type="button"
              onClick={() => {
                onClose();
                window.location.reload();
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;

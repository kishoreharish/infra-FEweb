import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // ✅ Auto-refresh token
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
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "users/candidate/update-profile/",
        formData
      );

      if (response.status === 200 && response.data.message === "Profile updated successfully!") {
        setSuccess(true);

        // ✅ Pass the updated profile data to both MyProfile & CandidateProfile
        onSave(response.data.userData);  

        // ✅ Save new token if returned
        if (response.data.authToken) {
          localStorage.setItem("authToken", response.data.authToken);
        }
      } else {
        setError("Unexpected response format. Profile updated, but check logs.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.response?.data?.error || "Failed to save profile. Please try again.");
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
              {Object.keys(formData).map((field, index) => (
                <div key={index} className={styles.formGroup}>
                  <label>{field.replace(/_/g, " ")}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
            <div className={styles.formActions}>
              <button type="button" onClick={onClose}>Cancel</button>
              <button type="submit">Save</button>
            </div>
          </form>
        )}
        {success && (
          <div className={styles.formActions}>
            <button className={styles.editButton} type="button" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./EditCandidate.module.scss";

const EditCandidate = ({ candidateId }) => {
  const [candidateData, setCandidateData] = useState({
    full_name: "",
    title: "",
    bio: "",
    about: "",
    avatar: null,
    cover_image: null,
    education: [{ college_name: "", city: "", university: "", title: "" }],
    interest: "",
    languages: "",
    work_experience: [{ company_name: "", role: "", description: "" }],
    reference: [{ name: "", contact: "", title: "" }],
    skills: "",
    address: {
      line1: "",
      line2: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
    },
    followers: 0,
    connects: 0,
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch candidate data
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`/api/candidates/${candidateId}/`);
        setCandidateData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch candidate data.");
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle nested fields (e.g., education, work experience, etc.)
  const handleNestedChange = (field, index, key, value) => {
    setCandidateData((prevData) => ({
      ...prevData,
      [field]: prevData[field].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(candidateData).forEach((key) => {
      if (key === "education" || key === "work_experience" || key === "reference") {
        formData.append(key, JSON.stringify(candidateData[key]));
      } else if (key === "avatar" || key === "cover_image") {
        if (candidateData[key]) {
          formData.append(key, candidateData[key]);
        }
      } else {
        formData.append(key, candidateData[key]);
      }
    });

    try {
      await axios.put(`/api/candidates/${candidateId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Candidate updated successfully!");
    } catch (err) {
      setError("Failed to update candidate data.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.editCandidateContainer}>
      <h2>Edit Candidate</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="full_name"
            value={candidateData.full_name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={candidateData.title}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Bio:
          <textarea
            name="bio"
            value={candidateData.bio}
            onChange={handleInputChange}
          ></textarea>
        </label>

        <label>
          Avatar:
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <label>
          Cover Image:
          <input
            type="file"
            name="cover_image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        <h3>Education</h3>
        {candidateData.education.map((edu, index) => (
          <div key={index} className={styles.educationItem}>
            <label>
              College Name:
              <input
                type="text"
                value={edu.college_name}
                onChange={(e) =>
                  handleNestedChange("education", index, "college_name", e.target.value)
                }
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={edu.city}
                onChange={(e) =>
                  handleNestedChange("education", index, "city", e.target.value)
                }
              />
            </label>
            <label>
              University:
              <input
                type="text"
                value={edu.university}
                onChange={(e) =>
                  handleNestedChange("education", index, "university", e.target.value)
                }
              />
            </label>
            <label>
              Title:
              <input
                type="text"
                value={edu.title}
                onChange={(e) =>
                  handleNestedChange("education", index, "title", e.target.value)
                }
              />
            </label>
          </div>
        ))}

        {/* Add more fields for work experience, reference, etc. similarly */}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCandidate;

import React, { useState } from 'react';
import styles from './Postajob.module.scss';
import axios from 'axios';

const PostAJob = ({ closePopup, refreshJobs }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    experience: '',
    salary: '',
    location: '',
    description: '',
    skills: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    // Validation: Check for empty fields
    if (!formData.title || !formData.company || !formData.experience || !formData.salary || 
        !formData.location || !formData.description || !formData.skills) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await axios.post(
        'http://127.0.0.1:8000/users/jobs/post/', 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        setSuccess('Job posted successfully!');
        refreshJobs();
        setTimeout(() => closePopup(), 2000);
      } else {
        setError('Unexpected error. Please try again.');
      }
    } catch (err) {
      console.error('Error posting job:', err);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Failed to post job. Please try again.');
      } else {
        setError('Failed to connect to the server. Please check your internet connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <h2>Post a Job</h2>
        
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
        />
        
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g. 0-2 years)"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary (e.g. 8-12 LPA)"
          value={formData.salary}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location (e.g. Bangalore, Remote)"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Required Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
          required
        />

        <div className={styles.buttonContainer}>
          <button 
            onClick={handleSubmit} 
            className={styles.saveButton} 
            disabled={loading}
          >
            {loading ? 'Posting...' : 'Save'}
          </button>
          <button 
            onClick={closePopup} 
            className={styles.cancelButton}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAJob;

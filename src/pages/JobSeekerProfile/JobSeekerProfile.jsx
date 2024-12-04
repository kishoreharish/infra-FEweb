import React, { useState } from "react";
import "./JobSeekerProfile.module.scss";

const JobSeekerProfile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  return (
    <div className="profile">
      <h2 className="profile__title">Job Seeker Profile</h2>
      <div className="profile__info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
      {/* You can add a form to edit the profile */}
    </div>
  );
};

export default JobSeekerProfile;

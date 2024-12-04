import React, { useState } from "react";
import "./EmployerProfile.module.scss";

const EmployerProfile = () => {
  const [companyName, setCompanyName] = useState("ABC Corp");
  const [contactEmail, setContactEmail] = useState("contact@abccorp.com");

  return (
    <div className="profile">
      <h2 className="profile__title">Employer Profile</h2>
      <div className="profile__info">
        <p><strong>Company Name:</strong> {companyName}</p>
        <p><strong>Contact Email:</strong> {contactEmail}</p>
      </div>
      {/* You can add a form to edit the employer profile */}
    </div>
  );
};

export default EmployerProfile;

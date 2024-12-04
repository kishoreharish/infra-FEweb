import React from "react";
import "./Services.module.scss";

const Services = () => {
  return (
    <div className="services">
      <h2 className="services__title">Our Services</h2>
      <ul className="services__list">
        <li>Job Matching</li>
        <li>Resume Building</li>
        <li>Interview Coaching</li>
        <li>Job Alerts</li>
      </ul>
    </div>
  );
};

export default Services;

import React from "react";
import "./FeaturedJobs.module.scss";

const FeaturedJobs = () => {
  return (
    <section className="featured-jobs">
      <h2 className="featured-jobs__title">Featured Jobs</h2>
      <div className="featured-jobs__list">
        <div className="featured-job">
          <h3 className="featured-job__title">Software Engineer</h3>
          <p className="featured-job__company">ABC Corp</p>
          <button className="featured-job__button">Apply Now</button>
        </div>
        <div className="featured-job">
          <h3 className="featured-job__title">Product Manager</h3>
          <p className="featured-job__company">XYZ Ltd.</p>
          <button className="featured-job__button">Apply Now</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;

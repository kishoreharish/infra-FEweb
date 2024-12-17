import React from "react";
import styles from "./CandidateReferTest.module.scss";

const references = [
  {
    id: 1,
    name: "Jane Smith",
    role: "Project Manager, ABC Corp",
    testimonial:
      "John is a dedicated and highly skilled developer. His attention to detail and problem-solving abilities are exceptional.",
  },
  {
    id: 2,
    name: "Michael Brown",
    role: "Senior Architect, XYZ Ltd",
    testimonial:
      "John consistently delivered high-quality work under tight deadlines. A true asset to any team.",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Team Lead, LMN Inc",
    testimonial:
      "Working with John was a pleasure. His technical skills and teamwork made a huge impact on our project’s success.",
  },
];

const CandidateReferTest = () => {
  return (
    <div className={styles.referContainer}>
      {/* Title */}
      <h2 className={styles.title}>References / Testimonials</h2>

      {/* Reference Cards */}
      <div className={styles.cardContainer}>
        {references.map((ref) => (
          <div key={ref.id} className={styles.referenceCard}>
            <h3 className={styles.name}>{ref.name}</h3>
            <p className={styles.role}>{ref.role}</p>
            <p className={styles.testimonial}>"{ref.testimonial}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidateReferTest;

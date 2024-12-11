import React from "react";
import styles from "./herocards.module.scss";

const HeroCards = ({ cards = [] }) => {
  if (cards.length === 0) {
    return <div className={styles.noJobs}>No jobs available right now!</div>;
  }

  return (
    <div className={styles.verticalCarousel}>
      {cards.map((card) => (
        <div key={card.id} className={styles.card}>
          {/* Logo and Title Container */}
          <div className={styles.logoTitleContainer}>
            <div className={styles.logo}>
              <img
                src="https://via.placeholder.com/25"
                alt="Logo"
                className={styles.logoImage}
              />
            </div>
            <h4 className={styles.cardTitle}>{card.title}</h4>
          </div>

          {/* Card Content */}
          <div className={styles.cardContent}>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>

          {/* Right Arrow */}
          <div className={styles.rightArrow}>
            <span>→</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCards;

import React, { useState } from "react";
import { Carousel } from "antd";
import styles from "./ProfileHomeAds.module.scss";

const ProfileHomeAds = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const onChange = (currentSlide) => {
    setCurrentSlide(currentSlide);
  };

  return (
    <div className={styles.carouselContainer}>
      <Carousel autoplay afterChange={onChange} dots={false}>
        <div className={styles.slide}>
          <img
            src="https://via.placeholder.com/1200x300?text=Ad+1"
            alt="Ad 1"
            className={styles.carouselImage}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="https://via.placeholder.com/1200x300?text=Ad+2"
            alt="Ad 2"
            className={styles.carouselImage}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="https://via.placeholder.com/1200x300?text=Ad+3"
            alt="Ad 3"
            className={styles.carouselImage}
          />
        </div>
        <div className={styles.slide}>
          <img
            src="https://via.placeholder.com/1200x300?text=Ad+4"
            alt="Ad 4"
            className={styles.carouselImage}
          />
        </div>
      </Carousel>

      {/* Dash-style navigation */}
      <div className={styles.customNavigation}>
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={`${styles.dash} ${
              currentSlide === index ? styles.active : ""
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ProfileHomeAds;

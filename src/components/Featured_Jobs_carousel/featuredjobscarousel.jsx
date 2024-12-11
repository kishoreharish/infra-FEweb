import React, { useRef } from "react";
import styles from "./featuredjobscarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

// Sample job data
const featuredJobs = [
  { id: 1, title: "Frontend Developer", company: "Company A", location: "Remote" },
  { id: 2, title: "Backend Developer", company: "Company B", location: "New York" },
  { id: 3, title: "UI/UX Designer", company: "Company C", location: "San Francisco" },
  { id: 4, title: "Project Manager", company: "Company D", location: "Chicago" },
  { id: 5, title: "DevOps Engineer", company: "Company E", location: "Austin" },
];

const FeaturedJobsCarousel = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current?.swiper.slidePrev();
  const handleNext = () => swiperRef.current?.swiper.slideNext();

  return (
    <div className={styles.featuredJobs}>
      {/* Section Header with Title and Navigation */}
      <div className={styles.header}>
        <h4 className={styles.title}>Top Companies</h4>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.arrow} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>

      {/* Carousel Section */}
      <Swiper
  ref={swiperRef}
  modules={[Navigation]}
  spaceBetween={5}
  slidesPerView={4} // Default to 4 cards on large screens
  autoplay={true}
  loop={true}
  breakpoints={{
    1024: {
      slidesPerView: 3, // 3 cards on large screens
    },
    768: {
      slidesPerView: 2, // 2 cards on medium screens
    },
    480: {
      slidesPerView: 1, // 1 card on small screens (mobile)
    },
  }}
>
  {featuredJobs.map((job) => (
    <SwiperSlide key={job.id}>
      <div className={styles.jobCard}>
        <h3 className={styles.jobTitle}>{job.title}</h3>
        <p className={styles.company}>{job.company}</p>
        <p className={styles.location}>{job.location}</p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
};

export default FeaturedJobsCarousel;

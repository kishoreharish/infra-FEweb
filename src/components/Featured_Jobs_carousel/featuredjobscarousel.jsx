import React from "react";
import styles from "./featuredjobscarousel.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Correct import for Swiper CSS

// Sample job data
const featuredJobs = [
  { id: 1, title: "Frontend Developer", company: "Company A", location: "Remote" },
  { id: 2, title: "Backend Developer", company: "Company B", location: "New York" },
  { id: 3, title: "UI/UX Designer", company: "Company C", location: "San Francisco" },
  { id: 4, title: "Project Manager", company: "Company D", location: "Chicago" },
  { id: 5, title: "DevOps Engineer", company: "Company E", location: "Austin" },
];

const FeaturedJobsCarousel = () => {
  return (
    <div className={styles.featuredJobs}>
      {/* Section Title */}
      <h4 className={styles.title}>Featured Jobs</h4>

      {/* Carousel Section */}
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
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
            slidesPerView: 1, // 1 card on small screens
          },
        }}
      >
        {/* Loop through job data to display each job card */}
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

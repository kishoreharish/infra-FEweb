import React, { useRef } from "react";
import styles from "./paidpost.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import "swiper/swiper-bundle.css";
import { Box, Card, Typography, Divider, Button, IconButton } from '@mui/material';

// Sample paid job data
const paidJobs = [
  {
    id: 1,
    logo: "https://via.placeholder.com/50",
    title: "Frontend Developer",
    company: "Company A",
    type: "Full Time",
    description: "Develop and maintain web applications.",
    location: "Remote",
  },
  {
    id: 2,
    logo: "https://via.placeholder.com/50",
    title: "Backend Developer",
    company: "Company B",
    type: "Full Time",
    description: "Build server-side applications and APIs.",
    location: "New York",
  },
  {
    id: 3,
    logo: "https://via.placeholder.com/50",
    title: "Backend Developer",
    company: "Company B",
    type: "Full Time",
    description: "Build server-side applications and APIs.",
    location: "New York",
  },
  {
    id: 4,
    logo: "https://via.placeholder.com/50",
    title: "Backend Developer",
    company: "Company B",
    type: "Full Time",
    description: "Build server-side applications and APIs.",
    location: "New York",
  },
  {
    id: 5,
    logo: "https://via.placeholder.com/50",
    title: "Backend Developer",
    company: "Company B",
    type: "Full Time",
    description: "Build server-side applications and APIs.",
    location: "New York",
  },
  {
    id: 6,
    logo: "https://via.placeholder.com/50",
    title: "Backend Developer",
    company: "Company B",
    type: "Full Time",
    description: "Build server-side applications and APIs.",
    location: "New York",
  },
  // Add more job posts as necessary
];

const PaidPost = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current?.swiper.slidePrev();
  const handleNext = () => swiperRef.current?.swiper.slideNext();

  return (
    <div className={styles.paidJobs}>
      {/* Section Header with Title and Navigation Arrows */}
      <div className={styles.header}>
        <h4 className={styles.title}>Featured Paid Jobs</h4>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.arrow} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>

      {/* Swiper Carousel Section */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={10} // Space between cards
        slidesPerView={2} // Display 3 cards per view
        loop={true} // Looping enabled
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        breakpoints={{
          1024: {
            slidesPerView: 2, // 3 cards on large screens
          },
          768: {
            slidesPerView: 2, // 2 cards on medium screens
          },
          480: {
            slidesPerView: 1, // 1 card on small screens
          },
        }}
      >
        {paidJobs.map((job) => (
          <SwiperSlide key={job.id}>
          <div className={styles.jobCard}>
            {/* Save Button */}
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                color: 'primary.main',
              }}
              aria-label="Save job"
            >
              <BookmarkOutlinedIcon />
            </IconButton>
        
            <div className={styles.jobHeader}>
              <img
                src={job.logo}
                alt={`${job.title} logo`}
                className={styles.jobLogo}
              />
              <h4 className={styles.jobTitle}>
                {job.title}
                <p className={styles.company}>
                  {job.company} | {job.type}
                </p>
              </h4>
            </div>
        
            <p className={styles.jobDescription}>{job.description}</p>
            <p className={styles.jobLocation}>{job.location}</p>
        
            <Button
              variant="contained"
              size="small"
              sx={{ textTransform: "none" }}
            >
              Apply Now
            </Button>
          </div>
        </SwiperSlide>
        
        ))}
      </Swiper>
    </div>
  );
};

export default PaidPost;

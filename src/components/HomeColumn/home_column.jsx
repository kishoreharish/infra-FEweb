import React from "react";
import styles from "../HomeColumn/home_column.module.scss"; // Import SCSS file for styling
import JobFilter from "../Job_Filter/job_filter";
import JobOfTheDay from "../JobOfTheDay/job_ofthe_day";
import FeaturedJobsCarousel from "../Featured_Jobs_carousel/featuredjobscarousel";
import ImageCarouselAds from "../ImageCarouselAds/image_carousel_ads";
import ArticlePost from "../ArticlesPost/articles_post";
import PaidPost from "../PaidPost/paidpost";
import FullCard from "../FullCard/fullcard";

const HomeColumn = () => {
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <JobFilter />
        </div>
        <div className={styles.centerColumn}>
          <JobOfTheDay />
          <FeaturedJobsCarousel />
          <ImageCarouselAds />
          <ArticlePost />
          <PaidPost />
          <FullCard />
        </div>
        <div className={styles.rightColumn}>
          <p>Right Column (20%)</p>
        </div>
      </div>
    </div>
  );
};

export default HomeColumn;

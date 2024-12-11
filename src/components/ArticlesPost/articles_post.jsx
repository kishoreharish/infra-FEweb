import React, { useRef } from "react";
import { Card } from "antd";
import styles from "../ArticlesPost/articles_post.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

const { Meta } = Card;

const articles = [
  {
    id: 1,
    title: "The Future of AI",
    description: "Discover how AI is transforming industries.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&auto=format&fit=crop&q=60",
    link: "https://example.com",
  },
  {
    id: 2,
    title: "Exploring Space",
    description: "Space exploration and its benefits.",
    image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=500&auto=format&fit=crop&q=60",
    link: "https://example.com",
  },
  {
    id: 3,
    title: "Sustainable Living",
    description: "Tips for an eco-friendly lifestyle.",
    image: "https://images.unsplash.com/photo-1653669486634-cfac2c3f0937?w=500&auto=format&fit=crop&q=60",
    link: "https://example.com",
  },
  {
    id: 4,
    title: "New Horizons",
    description: "Exploring new challenges in technology.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60",
    link: "https://example.com",
  },
  {
    id: 5,
    title: "New Horizons",
    description: "Exploring new challenges in technology.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60",
    link: "https://example.com",
  },
  {
    id: 6,
    title: "New Horizons",
    description: "Exploring new challenges in technology.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60",
    link: "https://example.com",
  },
];

const ArticlePost = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => swiperRef.current.swiper.slidePrev();
  const handleNext = () => swiperRef.current.swiper.slideNext();

  return (
    <div className={styles.articleSection}>
      {/* Title with Navigation Arrows */}
      <div className={styles.articleHeader}>
        <h4 className={styles.articleTitle}>Articles</h4>
        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={handlePrev}>
            &lt;
          </button>
          <button className={styles.arrow} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>

      {/* Articles Carousel */}
      <Swiper
  ref={swiperRef}
  modules={[Navigation]}
  spaceBetween={5}
  slidesPerView={3}
  loop={false}
  breakpoints={{
    1024: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    },
  }}
  navigation={{
    prevEl: `.slick-prev`,
    nextEl: `.slick-next`,
  }}
  className={styles.carouselContainer}
>
  {articles.map((article) => (
    <SwiperSlide key={article.id}>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.articleCardLink}
      >
        <Card
          hoverable
          cover={<img alt={article.title} src={article.image} />}
          className={styles.articleCard}
        >
          <Meta
            title={article.title}
            description={article.description}
            className={styles.cardMeta}
          />
        </Card>
      </a>
    </SwiperSlide>
  ))}
</Swiper>

    </div>
  );
};

export default ArticlePost;

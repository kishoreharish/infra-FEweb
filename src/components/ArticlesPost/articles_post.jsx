import React from "react";
import { Card } from "antd";
import Slider from "react-slick";
import styles from "../ArticlesPost/articles_post.module.scss";

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
  const settings = {
    dots: false, // No dots
    infinite: false,
    speed: 500,
    slidesToShow: 3.5, // Show 3.5 cards on larger screens
    slidesToScroll: 1,
    arrows: true, // Enable arrows
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Small screens
        settings: {
          slidesToShow: 1, // Full width for smaller screens
        },
      },
    ],
  };

  return (
    <div className={styles.articleSection}>
      {/* Title with Navigation Arrows */}
      <div className={styles.articleHeader}>
        <h2 className={styles.articleTitle}>Articles</h2>
        <div className={styles.carouselArrows}>
          <button
            className={`${styles.arrow} ${styles.prevArrow}`}
            onClick={() => document.querySelector(".slick-prev").click()}
          >
            &#9664;
          </button>
          <button
            className={`${styles.arrow} ${styles.nextArrow}`}
            onClick={() => document.querySelector(".slick-next").click()}
          >
            &#9654;
          </button>
        </div>
      </div>

      {/* Articles Carousel */}
      <Slider {...settings} className={styles.carouselContainer}>
        {articles.map((article) => (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            key={article.id}
            className={styles.articleCardLink}
          >
            <Card
  hoverable
  cover={<img alt={article.title} src={article.image} />}
  className={`${styles.articleCard}`}
>
  <Meta
    title={article.title}
    description={article.description}
    className={styles.cardMeta}
  />
</Card>

          </a>
        ))}
      </Slider>
    </div>
  );
};

export default ArticlePost;

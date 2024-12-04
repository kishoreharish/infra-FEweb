import React from "react";
import { Card } from "antd";
import styles from "../ArticlesPost/articles_post.module.scss";

const { Meta } = Card;

const articles = [
  {
    id: 1,
    title: "The Future of AI",
    description: "Discover how AI is transforming industries.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8am9ic3xlbnwwfHwwfHx8MA%3D%3D/240x150",
    link: "https://example.com",
  },
  {
    id: 2,
    title: "Exploring Space",
    description: "Space exploration and its benefits.",
    image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGpvYnN8ZW58MHx8MHx8fDA%3D/240x150",
    link: "https://example.com",
  },
  {
    id: 3,
    title: "Sustainable Living",
    description: "Tips for an eco-friendly lifestyle.",
    image: "https://images.unsplash.com/photo-1653669486634-cfac2c3f0937?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE4fHxqb2JzfGVufDB8fDB8fHww/240x150",
    link: "https://example.com",
  },
  {
    id: 4,
    title: "Sustainable Living",
    description: "Tips for an eco-friendly lifestyle.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk2fHxqb2JzfGVufDB8fDB8fHww/240x150",
    link: "https://example.com",
  },
];

const ArticlePost = () => {
  return (
    <div className={styles.articleSection}>
      {/* Title */}
      <h2 className={styles.articleTitle}>Articles</h2>

      {/* Articles */}
      <div className={styles.articleContainer}>
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
              cover={
                <img
                  alt={article.title}
                  src={article.image}
                  className={styles.articleImage}
                />
              }
              className={styles.articleCard}
            >
              <Meta
                title={article.title}
                description={article.description}
              />
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ArticlePost;

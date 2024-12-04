import React, { useRef } from 'react';
import { Card, Carousel } from 'antd';
import './paidpost.module.scss';

const PaidPost = () => {
  const carouselRef = useRef(null);

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <div className="paid-post-container">
      {/* Header with title and navigation */}
      <div className="header">
        <h2 className="title">Paid Posts</h2>
        <div className="navigation">
          <button className="arrow left" onClick={handlePrev}>
            &lt;
          </button>
          <button className="arrow right" onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>

      {/* Carousel with cards */}
      <Carousel
        ref={carouselRef}
        dots={false}
        slidesToShow={3}
        slidesToScroll={1}
        infinite
        responsive={[
          {
            breakpoint: 768, // For small screens
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        <div className="card-wrapper">
          <Card title="Card 1" bordered={false}>
            Card content 1
          </Card>
        </div>
        <div className="card-wrapper">
          <Card title="Card 2" bordered={false}>
            Card content 2
          </Card>
        </div>
        <div className="card-wrapper">
          <Card title="Card 3" bordered={false}>
            Card content 3
          </Card>
        </div>
        <div className="card-wrapper">
          <Card title="Card 4" bordered={false}>
            Card content 4
          </Card>
        </div>
        <div className="card-wrapper">
          <Card title="Card 5" bordered={false}>
            Card content 5
          </Card>
        </div>
      </Carousel>
    </div>
  );
};

export default PaidPost;

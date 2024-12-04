import React from "react";
import { Card } from "antd";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Basic Swiper styles
import "swiper/css/pagination"; // Optional pagination styles

const PartnerLogos = () => {
  const cardItems = Array(12).fill({ content: ["Card content"] });

  return (
    <section style={{ padding: "20px", width: "100%" }}>
      <Swiper
        slidesPerView={8} // Number of visible slides
        spaceBetween={10} // Space between slides
        pagination={{ clickable: true }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile
          768: { slidesPerView: 3, spaceBetween: 10 }, // Tablet
          1024: { slidesPerView: 8, spaceBetween: 10 }, // Desktop
        }}
        style={{ width: "100%" }}
      >
        {cardItems.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card style={{ width: 150 }}>
              {item.content.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PartnerLogos;

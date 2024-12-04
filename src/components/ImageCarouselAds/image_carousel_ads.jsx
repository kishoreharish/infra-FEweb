import React from "react";
import styles from "./image_carousel_ads.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css"; // Swiper core styles
import "swiper/css/pagination"; // Swiper pagination styles

const images = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56YXmnCJ1gPCUe1FbZMggJdPvOCuBg738GQR1QPKeAYfRmISIG7pKOH6FmW-c2VOAdQ&usqp=CAU",
  "https://templates.simplified.co/usetldr/971678/thumb/cef7ca0f-34ee-4934-a05f-26dcf92bc5cd.jpg",
  "https://templates.simplified.co/thumb/e8344d03-756f-4b1b-bead-738fd27682e5.jpg",
];

const ImageCarouselAds = () => {
  return (
    <div className={styles.imageCarousel}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.carouselImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageCarouselAds;

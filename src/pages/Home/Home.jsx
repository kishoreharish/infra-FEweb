import React, { useState } from "react";
import Hero from "../../components/Hero/Hero"; // Ensure this path is correct
import HomeColumn from "../../components/HomeColumn/home_column"; // Ensure this path is correct

import styles from "./Home.module.scss"; // Ensure correct SCSS usage

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.stopPropagation(); // Avoid closing when clicking inside the modal
    setShowModal(false);
  };

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <Hero />
      <HomeColumn />

      {/* Login Button
      <button className={styles.loginBtn} onClick={handleLoginClick}>
        Login / Sign Up
      </button> */}

      {/* Modal */}
      {/* {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={handleCloseModal}>
              Close
            </button>
            <AuthComponents closeModal={handleCloseModal} />
          </div>
        </div>
      )}  */}
    </div>
  );
};

export default Home;

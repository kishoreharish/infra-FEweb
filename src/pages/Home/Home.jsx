import React from "react";
import Hero from "../../components/Hero/Hero";
import Topbar from "../../components/Topbar/TopBar";
import HomeColumn from "../../components/HomeColumn/home_column";
import PartnerLogos from "../../components/PartnerLogos/PartnerLogos";
import "./Home.module.scss";

const Home = () => {
  return (
    <div className="home">
      {/* <Topbar /> */}
      <Hero />
      {/* <PartnerLogos /> */}
      <HomeColumn />
     
    
      
    </div>
  );
};

export default Home;

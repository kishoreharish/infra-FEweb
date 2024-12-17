import React from "react";

const CandidateCoverAvatar = () => {
  return (
    <img 
      src="https://via.placeholder.com/100" 
      alt="Candidate Avatar" 
      style={{
        borderRadius: "50%",
        width: "100px",
        height: "100px",
        border: "3px solid #fff",
        objectFit: "cover"
      }}
    />
  );
};

export default CandidateCoverAvatar;

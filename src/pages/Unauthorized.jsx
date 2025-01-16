import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Access Denied</h1>
      <p>You are not authorized to access this page.</p>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
};

export default Unauthorized;

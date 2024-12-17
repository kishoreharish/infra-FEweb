import React from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config"; // Adjust path to your Firebase config file
import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set to true if user exists, otherwise false
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Prevent rendering until auth state is confirmed
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

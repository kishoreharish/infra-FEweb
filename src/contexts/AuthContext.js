import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state to prevent flashing during initialization

  // Monitor Firebase Authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.getIdTokenResult().then((idTokenResult) => {
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            role: idTokenResult.claims.role || "candidate", // Role if custom claims are set
          });
        });
      } else {
        setUser(null);
      }
      setLoading(false); // End loading once auth state is determined
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setUser(data.user); // Update the user state
        return true; // Successful login
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
      return false; // Failed login
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth); // Firebase sign out
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null); // Reset user state
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // AuthContext value
  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export default AuthProvider;

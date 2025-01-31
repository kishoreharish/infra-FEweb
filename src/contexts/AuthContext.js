import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Ensure token is loaded from local storage
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("authToken");
    if (tokenFromStorage && !authToken) {
      setAuthToken(tokenFromStorage);
    }
  }, []);

  // ✅ Fetch User Data When Token is Available
  useEffect(() => {
    console.log("🔄 Checking Auth Token:", authToken);

    if (!authToken) {
      setLoading(false);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/user-profile/", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then(response => {
        console.log("🟢 User Data:", response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.error("❌ Error fetching user:", error);
        setAuthToken(null);
        localStorage.removeItem("authToken");
      })
      .finally(() => setLoading(false));
  }, [authToken]);

  // ✅ Login Function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email,
        password,
      });

      if (response.status !== 200) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = response.data;
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      setAuthToken(data.access);
      setUser(data.user);
      console.log("✅ Login Successful:", data.user);

      return data.user;
    } catch (error) {
      console.error("❌ Login Error:", error);
      throw error;
    }
  };

  // ✅ Logout Function
  const logout = async () => {
    try {
      await signOut(auth); // Firebase Signout
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      setAuthToken(null);
      setUser(null);
      console.log("✅ Successfully Logged Out");
    } catch (error) {
      console.error("❌ Logout Error:", error.message);
    }
  };

  // ✅ AuthContext Value
  const value = {
    user,
    authToken,
    setUser,
    setAuthToken,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children after loading is complete */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

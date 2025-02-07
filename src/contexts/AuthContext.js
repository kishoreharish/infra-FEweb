import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase-config";
import { signOut } from "firebase/auth";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    // ✅ Fetch user data from token on app load
    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem("authToken");
  
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }
  
        try {
          const response = await axiosInstance.get("/users/profile/");
          if (response.status === 200) {
            setUser(response.data);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);
    

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("authToken");

    if (tokenFromStorage && !authToken) {
      console.log("🔄 Restoring authToken from localStorage...");
      setAuthToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    console.log("🔄 Checking Auth Token:", authToken);
    console.log("🟢 User Data:", user);

    if (!authToken) {
      console.log("⚠️ No Token Found, Skipping API Call");
      setLoading(false);
      return;
    }

    axios.get("http://127.0.0.1:8000/api/user-profile/", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((response) => {
        console.log("🟢 User Data Loaded:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching user:", error);
        setAuthToken(null);
        localStorage.removeItem("authToken");
      })
      .finally(() => {
        console.log("✅ Auth Check Completed");
        setLoading(false);
      });
  }, [authToken]);

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
      console.log("✅ Login Successful:", data.user);

      localStorage.setItem("authToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      setAuthToken(data.access);
      setUser(data.user);
      
      return data.user;
    } catch (error) {
      console.error("❌ Login Error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log("🚪 Logging Out...");

      await signOut(auth); // Firebase Logout

      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");

      setAuthToken(null);
      setUser(null);

      console.log("✅ Successfully Logged Out");
    } catch (error) {
      console.error("❌ Logout Error:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, authToken, setUser, setAuthToken, login, logout }}>
      {!loading && children} {/* Ensure content always renders */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

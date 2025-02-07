import axios from "axios";

const refreshToken = async () => {
  const refresh = localStorage.getItem("refreshToken");

  if (!refresh) {
    console.error("No refresh token found.");
    return null;
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/users/token/refresh/", {
      refresh,
    });

    if (response.status === 200) {
      const newAccessToken = response.data.access;
      localStorage.setItem("authToken", newAccessToken); // ✅ Save new token
      return newAccessToken;
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken"); // Clear tokens if refresh fails
    return null;
  }
};

export default refreshToken;

import axios from "axios";
import refreshToken from "./refreshToken";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Access token expired, trying to refresh...");

      const newToken = await refreshToken();

      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(error.config); // Retry the original request
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

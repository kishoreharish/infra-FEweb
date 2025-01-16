import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/users/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  login: (endpoint, data) => apiClient.post(endpoint, data),
  getProfile: (endpoint, token) =>
    apiClient.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  updateProfile: (endpoint, data, token) =>
    apiClient.put(endpoint, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  deleteAccount: (endpoint, token) =>
    apiClient.delete(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

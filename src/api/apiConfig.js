const API_BASE_URL = "http://127.0.0.1:8000/users/";

export const endpoints = {
  candidate: {
    login: `${API_BASE_URL}candidate/login/`,
    profile: `${API_BASE_URL}candidate/profile/`,
    updateProfile: `${API_BASE_URL}candidate/update-profile/`,
    deleteAccount: `${API_BASE_URL}candidate/delete-account/`,
  },
  employer: {
    login: `${API_BASE_URL}employer/login/`,
    profile: `${API_BASE_URL}employer/profile/`,
    updateProfile: `${API_BASE_URL}employer/update-profile/`,
    deleteAccount: `${API_BASE_URL}employer/delete-account/`,
  },
  register: `${API_BASE_URL}register/`,
  tokenRefresh: `${API_BASE_URL}token/refresh/`,
};

// src/api/auth.js
import axios from 'axios';

// The base URL for your API
const API_URL = 'http://127.0.0.1:8000/api/users/';

// Login Function to get JWT Token
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}token/`, {
      username,
      password,
    });

    // Save the access and refresh token to localStorage or cookies
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);

    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

// Refresh Token Function to get a new access token
export const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');

    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh,
    });

    // Save the new access token
    localStorage.setItem('access', response.data.access);

    return response.data;
  } catch (error) {
    console.error('Token refresh failed', error);
    throw error;
  }
};

// Axios interceptor for handling expired token
axios.interceptors.response.use(
  response => response, // pass through successful response
  async error => {
    const originalRequest = error.config;

    // If token has expired (status code 401), try refreshing the token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newTokens = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access}`;
        return axios(originalRequest); // Retry original request
      } catch (refreshError) {
        // If refresh fails, log the user out
        console.error('Refresh token failed', refreshError);
        // Redirect user to login page or logout
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// After Firebase successful sign up
const handleSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      // Send the user data to your Django backend
      const response = await fetch('http://127.0.0.1:8000/api/users/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          firebaseUid: user.uid,
          displayName: user.displayName,
          // other data you want to send (e.g., profile type)
        }),
      });
  
      if (response.ok) {
        // Successfully created the user in Django
        console.log('User created in Django');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };
  
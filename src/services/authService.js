import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Login API
export const login = async (credentials) => {
  try {
    await axios.post(`${API_URL}/login`, credentials, { withCredentials: true });
    return true;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    return false;
  }
};

// Signup API
export const signup = async (userData) => {
  try {
    await axios.post(`${API_URL}/signup`, userData, { withCredentials: true });
    return true;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    return false;
  }
};
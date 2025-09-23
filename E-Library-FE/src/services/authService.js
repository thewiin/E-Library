import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Flask API base URL

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; // { token, user }
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

export const signup = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, { name, email, password });
    return res.data; // { message, user }
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

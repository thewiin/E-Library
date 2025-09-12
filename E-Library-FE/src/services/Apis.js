import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:5000/api"; // Flask API base URL

export const endpoints = {
  login: "/auth/login",
  signup: "/auth/signup",

  books: "/books",
  users: "/users",
  "user-by-id": (userId) => `/users/${userId}`, // Đường dẫn động cho user
};

export const authApis = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${cookie.load("token")}`,
      "Content-Type": "application/json",
    },
  });
};

const apis = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apis;

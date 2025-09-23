import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://127.0.0.1:5000/api";

export const endpoints = {
  books: "/books",

  login: "/auth/login",
  register: "/auth/register",
  profile: "/users/profile",
};

export const authApis = () => {
  let token = cookie.load("token");
  return axios.create({
    baseURL: BASE_URL,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      : { "Content-Type": "application/json" },
  });
};

export default axios.create({
  baseURL: BASE_URL,
});

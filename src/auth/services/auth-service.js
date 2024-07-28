import { Navigate, useNavigate } from "react-router-dom";
import api from "./privateAxios";
import TokenService from "./token-service";
// import axios from "axios";

// const API_URL = "/auth";

const signup = (name, email, password) => {
  return api
    .post("/api/v1/user/signup", { name, email, password })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const login = (email, password) => {
  return api
    .post("/api/v1/user/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // localStorage.setItem("user", JSON.stringify(response.data));
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  // logout in browser
  // localStorage.removeItem("user");
  TokenService.removeUser();

  // const n = useNavigate();
  // n("/login");

  // logout in Api
  return api.delete("/api/v1/user/logout");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;

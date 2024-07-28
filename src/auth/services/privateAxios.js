import axios from "axios";
import TokenService from "./token-service";
import AuthService from "./auth-service";
import { useNavigate, Navigate, useNavigation } from "react-router-dom";
// var navigate = useNavigate();

const privateAxios = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Before making request, do the following
privateAxios.interceptors.request.use(
  (req) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      req.headers["accessToken"] = token;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// With response data, do the following
privateAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // const navigate = useNavigate();
    console.log("@@accessToken has expired");
    let originalRequest = err?.config;

    if (err.response.data === "accessToken expired" && !originalRequest.retry) {
      originalRequest.retry = true;
      try {
        let callRes = await privateAxios.post(
          "/api/v1/user/tokenRefresh",
          {},
          {
            headers: {
              refreshToken: TokenService.getLocalRefreshToken(),
            },
          }
        );

        const { accessToken } = callRes.data;
        console.log("new accessToken has created with refreshToken");

        TokenService.updateNewAccessToken(accessToken);
        const newApiCall = await privateAxios(originalRequest);
        // console.log("@@newApiCall", newApiCall); // after accessToken update in localStorage
        return newApiCall;
      } catch (e) {
        console.log("@@refreshToken also got expired");
        //  { // TokenService.removeUser();}
        AuthService.logout();
        window.location.reload();
        // AuthService.useLogout();
        // var navigate = useNavigate();
        // navigate("/gubk");
        // Navigate("/login");

        // mothod 2
        // const navigation = useNavigation();
        // console.log("navigation", navigation);
        // navigation.location("/vjhjv");
        // navigation.state;
        // navigation.location;
        // navigation.formData;
        // navigation.formAction;
        // navigation.formMethod;

        return Promise.reject(e);
      }
    }

    return Promise.reject(err);
  }
);

export default privateAxios;

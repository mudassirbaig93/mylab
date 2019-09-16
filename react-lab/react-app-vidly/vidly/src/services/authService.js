import config from "../config.json";
import httpService from "./httpService";
import jwtDecode from "jwt-decode";

const apiEp = config.apiUrl + "/auth";

httpService.setJwt(getAuthToken());

export function login(user) {
  return httpService.post(apiEp, {
    email: user.username,
    password: user.password
  });
}

export function performLogin(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getActiveUser() {
  try {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    return user;
  } catch (error) {
    // No user logged in
    return null;
  }
}

function getAuthToken() {
  return localStorage.getItem("token");
}

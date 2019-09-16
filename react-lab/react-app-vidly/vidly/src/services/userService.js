import config from "../config.json";
import httpService from "./httpService";

const apiEp = config.apiUrl + "/users";

export function register(user) {
  return httpService.post(apiEp, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}

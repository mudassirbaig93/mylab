import httpService from "./httpService";
import config from "../config.json";

export function getGenres() {
  //return genres.filter(g => g);
  return httpService.get(config.apiUrl + "/genres");
}

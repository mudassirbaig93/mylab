import config from "../config.json";
import httpService from "./httpService";

const movies_ep = config.apiUrl + "/movies";

export function getMovies() {
  return httpService.get(movies_ep);
}

export function getMovie(id) {
  return httpService.get(movies_ep + `/${id}`);
}

export function saveMovie(movie) {
  const headers = {
    "Content-Type": "application/json",
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDdiZTM1MTFmZjIyODEyYzMxZTI5M2YiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1Njg2MzE0NDl9.TLo-pl2K_GvVn60d-vnox07zLqOEeT72ABHB1OzXSUg"
  };
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService.put(movies_ep + `/${movie._id}`, body, {
      headers: headers
    });
  }
  return httpService.post(movies_ep, movie, { headers: headers });
}

export function deleteMovie(id) {
  return httpService.delete(movies_ep + `/${id}`);
}

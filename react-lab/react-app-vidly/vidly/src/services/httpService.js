import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, error => {
  logger.log(error);
  const clientError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!clientError) {
    toast.error("Unexpected error occrued...");
  } else if (error.response) toast.error(error.response.data);
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt: setJwt
};

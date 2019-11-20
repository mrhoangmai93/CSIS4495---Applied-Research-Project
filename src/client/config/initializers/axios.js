import axios from "axios";
import { BASE_URL, REQUEST_TIMEOUT } from "../constants/api";
import Qs from "qs";
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

axios.defaults.timeout = REQUEST_TIMEOUT;

// Routing request interception
// http request Interceptor
axios.interceptors.request.use(config => {
  // Only parse if its Json
  // if (typeof config.data === "object") config.data = Qs.stringify(config.data);
  // Determine if there is a token. If it exists, then every HTTP header is added to token.
  if (localStorage.token) {
    config.headers["x-auth-token"] = localStorage.token;
  }
  //config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  return config;
});

export default axios;

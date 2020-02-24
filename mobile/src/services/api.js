import axios from "axios";

const api = axios.create({
  baseURL: "http://cdfbe37b.ngrok.io"
});

export default api;

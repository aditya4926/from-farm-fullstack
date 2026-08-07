import axios from "axios";

const api = axios.create({
  baseURL: "https://from-farm.onrender.com/api",
  withCredentials: true,
});

export default api;
import axios from "axios";

const api = axios.create({
  baseURL: "https://from-farm-fullstack.onrender.com/api",
  withCredentials: true,
});

export default api;
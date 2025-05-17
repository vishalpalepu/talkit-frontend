import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  // baseURL: "http://localhost:3030", .
  baseURL: "https://talkit-6k0f.onrender.com",
  withCredentials : true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or get from Zustand
    if (token) {
      // Ensure headers object exists
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log("Authorization header set:", config.headers["Authorization"]);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
import axios, { AxiosInstance } from 'axios';

const apiAi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000", 
  // baseURL: "https://talkit-6k0f.onrender.com",
  withCredentials : true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiAi;
import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3030", 
  withCredentials : true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
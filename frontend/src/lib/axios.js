import axios from 'axios';

export const axiosInstance = axios.create({
    // for development use "localhost:5001/api" , and, for production use "/api"
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
    withCredentials: true,
});
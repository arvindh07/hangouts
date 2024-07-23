import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
    withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage?.getItem("user");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config;
}, (err) => {
    const { status } = err.response;
    if (status === 401) {
        localStorage?.removeItem("user");
    }
    return Promise.reject(err);
})

axiosInstance.interceptors.response.use((config) => {
    return config;
}, (err) => {
    const { status } = err.response;
    
    if (status === 401) {
        localStorage?.removeItem("user");
    }
    return Promise.reject(err);
})
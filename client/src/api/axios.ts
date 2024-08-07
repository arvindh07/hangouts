import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
    withCredentials: true
})

axiosInstance.interceptors.request.use(async (config) => {    
    return config;
}, async (err) => {
    const { status } = err.response;
    if (status === 401) {
    }
    return Promise.reject(err);
})

axiosInstance.interceptors.response.use((config) => {
    return config;
}, async (err) => {
    const { status } = err.response;
    
    if (status === 401) {
    }
    return Promise.reject(err);
})
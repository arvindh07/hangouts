import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
    withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
})

axiosInstance.interceptors.response.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
})

export default axiosInstance;
import axios from "axios";
import { REFRESH_ROUTE } from "./paths";
import { navigate } from "../utils/global";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_DOMAIN,
    withCredentials: true
})

export const refreshInstance = axios.create({
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

refreshInstance.interceptors.response.use(async (config) => {
    return config;
}, async (err) => {
    const { status } = err.response;
    if(status === 401) {
        navigate("/", { replace: true });
    }
})

axiosInstance.interceptors.response.use((config) => {
    return config;
}, async (err: any) => {
    const {config, response} = err;
    const { status } = response;

    if (status === 401) {
        // call refresh token
        try {
            const response = await refreshInstance.get(REFRESH_ROUTE);
            if (response.status === 200) {
                console.log("resp token -> ", response?.data?.token);                
                // retry the original request
                return axiosInstance(config);
            }
        } catch (error) {
            // we can send the current page with navigate, so that, when user logs in, it will redirect to same page
            // navigate("/", {
            //     status: window.location.pathname
            // })
            navigate("/");
        }
    }
    return Promise.reject(err);
})
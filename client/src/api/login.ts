import {axiosInstance} from "./axios"
import { LOGIN_ROUTE, REGISTER_ROUTE } from "./paths"
interface ResponseInterface{
    status: "OK" | "NOT OK";
    data: {
        token?: string;
        msg?: string;
        err?: string;
    };
    error: boolean;
}

export const handleLoginApi = async <T>(payload: T) => {
    let res: ResponseInterface = {
        status: "OK",
        data: {},
        error: false
    };

    try {
        let apiResponse = await axiosInstance.post(LOGIN_ROUTE, payload);
        res.data = apiResponse.data;
    } catch (error) {
        res.status = "NOT OK";
        res.error = true;
    } finally {
        return res;
    }
}

export const handleRegisterApi = async <T>(payload: T) => {
    let res: ResponseInterface = {
        status: "OK",
        data: {},
        error: false
    };

    try {
        let apiResponse = await axiosInstance.post(REGISTER_ROUTE, payload);
        res.data = apiResponse.data;
    } catch (error) {
        res.status = "NOT OK";
        res.error = true;
    } finally {
        return res;
    }
}
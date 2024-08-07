import { useState } from "react"
import { axiosInstance } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REFRESH_ROUTE, REGISTER_ROUTE } from "../api/paths";
import { AxiosResponse } from "axios";

let localAccessToken: any = null;
const useApi = () => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    console.log("token outside", token, localAccessToken);
    const refreshToken = async () => {
        const response: AxiosResponse = await axiosInstance.get(REFRESH_ROUTE);
        if (response.status === 200) {
            setToken(response.data.token);
            return response.data.token;
        }
        localAccessToken = response.data.token;
        return null;
    }

    const callApi = async (api: any, payload: any = null, params: any = null) => {
        // check for token else call refresh
        // if refresh failed, navigate to "/home"
        console.log("in api -> ", api, token, localAccessToken, (!token || !localAccessToken));
        // && !localAccessToken
        if ((!token) && (api !== "LOGIN" && api !== "REGISTER")) {
            console.log("in api #2 -> ", api);
            // on page refresh - wht need to be done?????
            // calling refresh token - we cant keep on asking refresh token if AT is valid/time not expired
            localAccessToken = await refreshToken();
            if (!localAccessToken) {
                navigate("/");
                return;
            } else {
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${localAccessToken}`
            }
        }

        // creating response object
        let res = {
            data: null,
            status: "OK",
            error: false
        }

        switch (api) {
            case "LOGIN": {
                try {
                    let apiResponse = await axiosInstance.post(LOGIN_ROUTE, payload);
                    res.data = apiResponse.data;
                    setToken(apiResponse.data?.token);
                    localAccessToken = apiResponse.data?.token;
                    axiosInstance.defaults.headers.common.Authorization = `Bearer ${localAccessToken}`
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "REGISTER": {
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
            case "GET_USERS": {
                try {
                    const response = await axiosInstance.get("/user");
                    res.data = response.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "SEARCH_USER": {
                try {
                    const response = await axiosInstance.get(`/user?search=${params?.userTerm}`);
                    res.data = response.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "CREATE_MESSAGE": {
                try {
                    const response = await axiosInstance.post("/message", payload);
                    res.data = response.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "GET_MESSAGES": {
                try {
                    const response = await axiosInstance.post("/message/get", payload);
                    res.data = response.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "CREATE_CHAT": {
                try {
                    const response = await axiosInstance.post("/message/get", payload);
                    res.data = response.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "GET_CHATS": {
                try {
                    let apiResponse = await axiosInstance.get("/chat");
                    res.data = apiResponse.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
        }

        return res;
    }

    return { callApi }
}

export default useApi;
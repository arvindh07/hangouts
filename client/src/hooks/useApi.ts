import { axiosInstance } from "../api/axios";
import { LOGIN_ROUTE, LOGOUT_ROUTE, REGISTER_ROUTE, STATUS_ROUTE } from "../api/paths";

const useApi = () => {
    const callApi = async (api: any, payload: any = null, params: any = null) => {
        // creating response object
        let res: any = {
            data: null,
            status: "OK",
            error: null
        }

        switch (api) {
            case "STATUS": {
                try {
                    let apiResponse = await axiosInstance.get(STATUS_ROUTE);
                    res.data = apiResponse.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "LOGIN": {
                let apiResponse;
                try {
                    apiResponse = await axiosInstance.post(LOGIN_ROUTE, payload);
                    res.data = apiResponse.data;
                } catch (error: any) {
                    res.status = "NOT OK";
                    res.error = error?.response?.data?.err;
                } finally {
                    return res;
                }
            }
            case "REGISTER": {
                try {
                    let apiResponse = await axiosInstance.post(REGISTER_ROUTE, payload);
                    res.data = apiResponse.data;
                } catch (error: any) {
                    res.status = "NOT OK";
                    res.error = error?.response?.data?.err;
                } finally {
                    return res;
                }
            }
            case "LOGOUT": {
                try {
                    let apiResponse = await axiosInstance.get(LOGOUT_ROUTE);
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
                let response: any;
                try {
                    response = await axiosInstance.post("/message/get", payload);
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
                    const response = await axiosInstance.post("/chat", payload);
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
                    let apiResponse = await axiosInstance.get("/chat", payload);
                    res.data = apiResponse.data;
                } catch (error) {
                    res.status = "NOT OK";
                    res.error = true;
                } finally {
                    return res;
                }
            }
            case "SEE_CHAT_MSGS": {
                try {
                    let apiResponse = await axiosInstance.post("/chat/seen");
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
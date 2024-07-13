import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import axiosInstance from "../api/axios";
import { useDispatch } from "react-redux";
import { appActions } from "../store/slices/rootSlice";

interface RedirectProps {
    user: boolean
}
const Redirect = ({ user }: RedirectProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const checkStatus = async () => {
        try {
            const response = await axiosInstance.get("/status");
            if (response.statusText === "OK") {
                dispatch(appActions.setLogin(true));
                navigate("/");
            } else {
                throw Error("Unauthorised");
            }
        } catch (error: any) {
            dispatch(appActions.setLogin(false));
            navigate("/auth");
        }
    }

    useEffect(() => {
        if (!user) {
            checkStatus();
        } else {
            navigate("/")
        }
    }, [])

    return <Outlet />
}

export default Redirect
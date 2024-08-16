import { useEffect } from "react";
import useApi from "../hooks/useApi";
import { useDispatch, useSelector } from "react-redux";
import { appActions } from "../store/slices/rootSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";

const Protected = ({children}: any) => {
    const {callApi} = useApi();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLoggedIn = useSelector((state:RootState) => state.app.isLoggedIn);

    const fetchStatus = async () => {
        const response = await callApi("STATUS");
        if(response.status === "OK"){
            dispatch(appActions.setLogin(true));
            dispatch(appActions.setUser(response?.data));
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        if(!userLoggedIn){
            fetchStatus();
        }
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default Protected;
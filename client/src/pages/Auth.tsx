import { useState } from "react";
import { handleLoginApi, handleRegisterApi } from "../api/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appActions } from "../store/slices/rootSlice";

interface AuthStateInterface {
  username?: string;
  email: string;
  password: string
}

const Auth = () => {
  const [authDetails, setAuthDetails] = useState<AuthStateInterface>({} as AuthStateInterface);
  const [loginForm, _] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    
    setAuthDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(loginForm){
      const response = await handleLoginApi({ email: authDetails?.email, password: authDetails?.password });
      if(response.status === "OK") {
        dispatch(appActions.setLogin(true));
        navigate("/");
      } else {
        dispatch(appActions.setLogin(false));
        alert("Login Failed")
      }
    } else {
      const response = await handleRegisterApi({ 
        username: authDetails?.username,
        email: authDetails?.email, 
        password: authDetails?.password 
      });
      if(response.status === "OK") {
        dispatch(appActions.setLogin(true));
        navigate("/");
      } else {
        dispatch(appActions.setLogin(false));
        alert("Registration Failed")
      }
    }
  }

  return (
    <div className="border-2 bg-slate-100 flex flex-col h-screen items-center justify-center">
      <h2 className="text-3xl mx-auto my-4">{loginForm ? "Login" : "Register"}</h2>
      <div className="flex flex-col w-1/3 mx-auto">
        {!loginForm && 
          <input 
            type="text" 
            name="username" 
            id="username" 
            placeholder="Username"
            value={authDetails?.username || ""}
            onChange={(e) => handleChange(e)}
            className="border-2 border-black rounded-md p-2 my-3"/>}
        <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="Email"
          value={authDetails?.email || ""}
          onChange={(e) => handleChange(e)}
          className="border-2 border-black rounded-md p-2 my-3"/>
        <input 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password"
          value={authDetails?.password || ""}
          onChange={(e) => handleChange(e)}
          autoComplete="off"
          className="border-2 border-black rounded-md p-2 my-3" />
        <button 
          className="bg-black text-white inline-block w-fit mx-auto mt-2 px-3 py-1 rounded-md"
          onClick={(e) => handleSubmit(e)}>
            {loginForm ? "Login" : "Signup"}
        </button>
      </div>
    </div>
  )
}

export default Auth
import { useState } from "react";
import { handleLoginApi, handleRegisterApi } from "../api/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { appActions } from "../store/slices/rootSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import axios from "axios";
import { useToast } from "../components/ui/use-toast";
interface AuthStateInterface {
  username?: string;
  email: string;
  password: string;
  profilePic?: string;
}

const Auth = () => {
  const [authDetails, setAuthDetails] = useState<AuthStateInterface>({} as AuthStateInterface);
  const [loginForm, setLoginForm] = useState<boolean>(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {toast} = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAuthDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pic = e.target.files?.[0];
    if(pic?.type === "image/png" || pic?.type === "image/jpeg"){
      const fileData = new FormData();
      fileData.append("file", pic);
      fileData.append("upload_preset", "hangouts");
      const response = 
        await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, fileData);
      setAuthDetails((prev) => ({
        ...prev,
        profilePic: response?.data?.secure_url
      }))
    }
  }

  const handleSubmit = async () => {
    if (loginForm) {
      if(!authDetails?.email || !authDetails?.password){
        toast({
          title: "Login failed",
          description: "Please fill all fields",
        })
        return ;
      }
      const response = await handleLoginApi({ email: authDetails?.email, password: authDetails?.password });
      if (response.status === "OK") {
        dispatch(appActions.setLogin(true));
        localStorage?.setItem("user", response?.data?.token!);
        navigate("/chats");
        return ;
      } else {
        dispatch(appActions.setLogin(false));
        toast({
          title: "Login failed",
          description: "Something went wrong",
        })
        return ;
      }
    } else {
      const response = await handleRegisterApi({
        username: authDetails?.username,
        email: authDetails?.email,
        password: authDetails?.password
      });

      if(response.status === "OK"){
        setLoginForm(true);
        toast({
          title: "Registered successfully",
          description: response?.data?.msg,
        })
      }
      // if (response.status === "OK") {
      //   dispatch(appActions.setLogin(true));
      //   navigate("/");
      // } else {
      //   dispatch(appActions.setLogin(false));
      //   alert("Registration Failed")
      // }
    }
  }

  return (
    <div className="h-screen mx-auto p-4 w-full overflow-hidden">
      <Tabs defaultValue="login" className="w-[400px] mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => setLoginForm((prev) => !prev)}>Login</TabsTrigger>
          <TabsTrigger value="register" onClick={() => setLoginForm((prev) => !prev)}>Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" key={loginForm ? "login" : ""}>
          <Card>
            <CardHeader>
              <CardTitle>Welcome back to Hangouts🚀</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={authDetails?.email || ""} onChange={handleChange} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  name="password"
                  onKeyDown={(e) => {
                    if(e.key === "Enter"){
                      handleSubmit()
                    }
                    return;
                  }}
                  value={authDetails?.password || ""} 
                  onChange={handleChange}/>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Log in</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register" key={!loginForm ? "register" : ""}>
          <Card>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 mb-4">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" value={authDetails?.username || ""} onChange={handleChange}/>
              </div>
              <div className="space-y-1 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={authDetails?.email || ""} onChange={handleChange}/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  onKeyDown={(e) => {
                    if(e.key === "Enter"){
                      handleSubmit()
                    }
                    return;
                  }}
                  value={authDetails?.password || ""} 
                  onChange={handleChange}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profilePic">Upload profile pic</Label>
                <Input id="profilePic" name="profilePic" type="file" onChange={(e) => handleFileChange(e)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit}>Sign up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Auth
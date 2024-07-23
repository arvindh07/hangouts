import { useEffect, useState } from "react"
import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../api/axios"

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    let response;
    try {
      response = await axiosInstance.get("/user");
      setUsers(response?.data);
    } catch (error: any) {
      localStorage.removeItem("user")
      navigate("/");
      return ;
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 ">
        <h1 className="text-2xl mx-auto my-4 border-b-2">Hangouts🚀</h1>
        {/* <ChatList /> */}
        {users?.map((user: any) => {
          return (
            <div key={user?.username}>
              {user?.username}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col w-3/4 mx-3">
        <Navbar />
        <ChatSection />
      </div>
    </div>
  )
}

export default Home
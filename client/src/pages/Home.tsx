import { useEffect, useState } from "react"
import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../api/axios"

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    let response;
    try {
      response = await axiosInstance.get("/user");
      setUsers(response?.data);
    } catch (error: any) {
      localStorage.removeItem("user")
      navigate("/");
      return;
    }
    setLoading(false);
  }

  const handleChat = (username: string) => {
    setCurrentChat(username);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 ">
        <h1 className="text-2xl mx-auto my-4 border-b-2 mb-10">Hangouts🚀</h1>
        {/* <ChatList /> */}
        {users?.map((user: any) => {
          const username = user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)
          return (
            <div key={user?.username} className="flex space-x-2 items-center mb-3 p-2 cursor-pointer hover:bg-black/80 hover:text-white text-gray-500 rounded-md"
              onClick={() => handleChat(username)}>
              <img src={user?.profilePic} alt="" className="w-10 h-10 rounded-full" />
              <span className="text-xl">{username}</span>
            </div>
          )
        })}
      </div>
      {/* show below only if friend is chosen */}
      <div className="flex flex-col w-3/4 mx-3">
        {!currentChat
          ? <div className="flex justify-center items-center h-screen">
            <p>Click to see chat</p>
          </div>
          : <>
            <Navbar currentChat={currentChat} />
            <ChatSection />
          </>}
      </div>
    </div>
  )
}

export default Home
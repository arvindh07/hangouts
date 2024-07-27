import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../api/axios"
import Chat from "./Chat"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { io } from "socket.io-client"

export let socket: any;

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.app.user);

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

  const handleChat = (username: string, friendId: string) => {
    setCurrentChat(username);
    socket.emit("join-room", friendId);
  }

  useEffect(() => {
    fetchUsers();
      socket = io("http://localhost:6999");
      socket.emit("setup", user.id);
      socket.on("connected", () => {
          console.log("Socket connected(Client side)🚀");
      })
  }, [])

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 max-w-[280px]">
        <h1 className="text-2xl mx-auto my-4 border-b-2 mb-10">Hangouts🚀</h1>
        {/* <ChatList /> */}
        {users?.map((user: any) => {
          console.log("user", user);
          const username = user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)
          return (
            <div key={user?.username} className={`flex space-x-2 items-center mb-3 p-2 cursor-pointer hover:bg-black/80 hover:text-white rounded-md ${currentChat === username ? "bg-black/80 text-white" : ""}`}
              onClick={() => handleChat(username, user._id)}>
              <img src={user?.profilePic} alt="" className="w-10 h-10 rounded-full object-contain" />
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
          : <Chat currentChat={currentChat} />}
      </div>
    </div>
  )
}

export default Home
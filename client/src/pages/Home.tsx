import { useEffect, useState } from "react"
import Navbar from "../page_components/Navbar"
import ChatList from "./ChatList"
import ChatSection from "./ChatSection"
import axiosInstance from "../api/axios"

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);

  // put a skeleton later
  if (loading) {
    return <h1>Loading...</h1>
  }

  const fetchUsers = async () => {
    const response = await axiosInstance.get("/user");
    console.log("user resp ", response);
    setUsers(response?.data);
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
            <div>
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
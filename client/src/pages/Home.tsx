import { useEffect, useState } from "react"
import Navbar from "../page_components/Navbar"
import ChatList from "./ChatList"
import ChatSection from "./ChatSection"
import { io, Socket } from "socket.io-client"

export let socket: Socket;

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    socket = io("http://localhost:6999", {
      reconnectionAttempts: 5,
      withCredentials: true
    });

    socket.on("connect", () => {
      setLoading(false);
      console.log("Connected to server✅");
    })

    socket.on("disconnect", () => {
      console.log("Disconnected client side❌");
    })

    return (() => {
      socket.off()
    })
  }, [])

  // put a skeleton later
  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 ">
        <h1 className="text-2xl mx-auto my-4 border-b-2">Hangouts🚀</h1>
        <ChatList />
      </div>
      <div className="flex flex-col w-3/4 mx-3">
        <Navbar />
        <ChatSection />
      </div>
    </div>
  )
}

export default Home
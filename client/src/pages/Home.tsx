import { useEffect } from "react"
import Navbar from "../page_components/Navbar"
import ChatList from "./ChatList"
import ChatSection from "./ChatSection"
import { io } from "socket.io-client"

export const socket = io("http://localhost:6999", {
  reconnectionAttempts: 5
});

const Home = () => {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server✅");
    })

    socket.on("disconnect", () => {
      console.log("Disconnected client side❌");
    })

    return (() => {
      socket.off()
    })
  }, [])

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
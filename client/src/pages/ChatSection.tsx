import { useEffect, useState } from "react"
import MessageSection from "../page_components/MessageSection"
import UserInteraction from "../page_components/UserInteraction"
import { axiosInstance } from "../api/axios"
import { socket } from "./Home"

const ChatSection = ({ currentChat, chatId }: any ) => {
  const [messages, setMessages] = useState<any>([]);

    const fetchMessages = async () => {
        const response: any = await axiosInstance.post("/message/get", {
            chatRoom: chatId
        });
        setMessages(response.data);
    }

    useEffect(() => {
        fetchMessages();
    }, [chatId])

    useEffect(() => {
        socket.on("resend-message", (msgObj: any) => {
            setMessages((prev: any) => [...prev, msgObj])
        })
    }, [])
  
  return (
    <div className="h-screen">
        <MessageSection messages={messages} />
        <UserInteraction chatId={chatId} setMessages={setMessages} />
    </div>
  )
}

export default ChatSection
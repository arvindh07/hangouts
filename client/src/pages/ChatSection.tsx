import { useEffect, useState } from "react"
import MessageSection from "../page_components/MessageSection"
import UserInteraction from "../page_components/UserInteraction"
import { socket } from "./Home"
import useApi from "../hooks/useApi"

const ChatSection = ({ chatId, setChatList }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const { callApi } = useApi();

  const fetchMessages = async () => {
    const response: any = await callApi("GET_MESSAGES", {
      chatRoom: chatId
    });
    setMessages(response.data?.messages);
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
    <div className="h-5/6 flex flex-col">
      <MessageSection messages={messages} chatId={chatId} />
      <UserInteraction chatId={chatId} setMessages={setMessages} setChatList={setChatList} />
    </div>
  )
}

export default ChatSection
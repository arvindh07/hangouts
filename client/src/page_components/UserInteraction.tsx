import { useState } from "react";
import { socket } from "../pages/Home";
import { axiosInstance } from "../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const UserInteraction = ({ chatId, setMessages }: any) => {
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.app.user);

  const handleSendMessage = async () => {
    const response = await axiosInstance.post("/message", {
      content: message,
      sender: user.id,
      chatRoom: chatId
    })
    setMessages((prev: any) => [...prev, response?.data]);
    socket.emit("one-message", message);
    setMessage("");
  }

  return (
    <div className="max-h-[50px] flex w-8/12 mx-auto justify-between">
      <input
        type="text"
        className="border-2 border-black rounded-md py-2 px-4 w-10/12 mr-8"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage()
          }
        }} />
      <button
        className="ml-4 w-2/12 rounded-md cursor-pointer hover:bg-slate-400 bg-gray-950 px-4 text-white"
        onClick={handleSendMessage}>
        Send
      </button>
    </div>
  )
}

export default UserInteraction;
import { useState } from "react";
import { socket } from "../pages/Home";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useApi from "../hooks/useApi";

const UserInteraction = ({ chatId, setMessages, setChatList }: any) => {
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.app.user);
  const { callApi } = useApi();

  const rearrangeChatList = (list: any, latestChat: any) => {
    const findIndex = list?.filter((chat: any) => chat?._id !== latestChat?._id);
    const newList = [latestChat, ...findIndex];

    return newList;
  }

  const handleSendMessage = async () => {
    const response: any = await callApi("CREATE_MESSAGE", {
      content: message,
      sender: user.id,
      chatRoom: chatId
    })
    socket.emit("one-message", response.data?.message);
    setMessages((prev: any) => [...prev, response.data?.message]);
    setMessage("");
    setChatList((prev: any) => rearrangeChatList(prev, response?.data?.chat));
  }

  return (
    <div className="max-h-[45px] flex w-8/12 mx-auto justify-between">
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
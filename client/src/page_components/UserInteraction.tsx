import { useState } from "react";
import { socket } from "../pages/Home";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useApi from "../hooks/useApi";

const UserInteraction = ({ chatId, setMessages, setChatList }: any) => {
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.app.user);
  const { callApi } = useApi();

  const rearrangeChatList = (list: any, latestHalfChatObject: any, chatIdToBeUpdated: string) => {
    const chatObjectToBeUpdated = list?.find((chat: any) => chat?._id === chatIdToBeUpdated);
    const restOfList = list.filter((chat: any) => chat?._id !== chatIdToBeUpdated);
    restOfList.unshift({ ...chatObjectToBeUpdated, ...latestHalfChatObject });
    return restOfList;
  }

  const handleSendMessage = async () => {
    const response: any = await callApi("CREATE_MESSAGE", {
      content: message,
      sender: user.id,
      chatRoom: chatId
    })

    const messageObject = {
      latestMsgObj: response.data?.message,
      latestChatObj: response?.data?.chat
    }

    socket.emit("one-message", messageObject);
    setMessages((prev: any) => [...prev, messageObject.latestMsgObj]);
    setMessage("");
    setChatList((prev: any) => rearrangeChatList(prev, messageObject.latestChatObj, chatId));
  }

  return (
    <div className="bg-gray-50 w-full pb-6">
      <div className="w-8/12 mx-auto flex justify-between">
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
    </div>
  )
}

export default UserInteraction;
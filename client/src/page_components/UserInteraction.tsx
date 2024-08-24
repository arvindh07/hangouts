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
    restOfList.unshift({...chatObjectToBeUpdated, ...latestHalfChatObject});
    console.log("##4.1 inside rearrange final chat list after sending a msg", restOfList);
    return restOfList;
  }

  const handleSendMessage = async () => {
    const response: any = await callApi("CREATE_MESSAGE", {
      content: message,
      sender: user.id,
      chatRoom: chatId
    })
    console.log("##1 create msg api resp-> ", response);
    
    const messageObject = {
      latestMsgObj: response.data?.message,
      latestChatObj: response?.data?.chat
    }
    console.log("##2 send socket event one-msg with msg packet-> ", messageObject);
    socket.emit("one-message", messageObject);
    setMessages((prev: any) => [...prev, messageObject.latestMsgObj]);
    console.log("##3 aftr set msgs -> ");
    setMessage("");
    console.log("##4 before chat list -> ");
    setChatList((prev: any) => rearrangeChatList(prev, messageObject.latestChatObj, chatId));
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
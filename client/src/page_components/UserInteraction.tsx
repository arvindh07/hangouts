import { useState } from "react";
import { socket } from "../pages/Home";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useApi from "../hooks/useApi";
import { Loader2 } from "lucide-react"
import { Button } from "../components/ui/button";

const UserInteraction = ({ chatId, setMessages, setChatList }: any) => {
  const [message, setMessage] = useState<string>("");
  const user = useSelector((state: RootState) => state.app.user);
  const { callApi } = useApi();
  const [loading, setLoading] = useState(false);

  const rearrangeChatList = (list: any, latestHalfChatObject: any, chatIdToBeUpdated: string) => {
    const chatObjectToBeUpdated = list?.find((chat: any) => chat?._id === chatIdToBeUpdated);
    const restOfList = list.filter((chat: any) => chat?._id !== chatIdToBeUpdated);
    restOfList.unshift({ ...chatObjectToBeUpdated, ...latestHalfChatObject });
    return restOfList;
  }

  const handleSendMessage = async () => {
    setLoading(true);
    if (!message) return;
    const response: any = await callApi("CREATE_MESSAGE", {
      content: message,
      sender: user.id,
      chatRoom: chatId
    })

    const messageObject = {
      latestMsgObj: response.data?.message,
      latestChatObj: response?.data?.chat
    }
    setLoading(false);

    socket.emit("one-message", messageObject);
    setMessages((prev: any) => [...prev, messageObject.latestMsgObj]);
    setMessage("");
    setChatList((prev: any) => rearrangeChatList(prev, messageObject.latestChatObj, chatId));
  }

  return (
    <div className="bg-slate-200 w-full py-3 sm:sticky bottom-0 max-w-[500px] mx-auto">
      <div className="mx-auto flex justify-around md:justify-between px-3 md:px-0">
        <input
          type="text"
          className="border-2 border-black rounded-full py-2 px-6 w-10/12 md:mr-8"
          value={message}
          placeholder="Your message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }} />
        <Button
          className="ml-2 md:w-2/12 rounded-md cursor-pointer hover:bg-slate-400 bg-gray-950 px-4 text-white"
          onClick={handleSendMessage}
          disabled={loading}>
          {loading
            ? <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            : <span>Send</span>}
        </Button>
      </div>
    </div>
  )
}

export default UserInteraction;
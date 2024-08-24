import { useEffect, useState } from "react"
import MessageSection from "../page_components/MessageSection"
import UserInteraction from "../page_components/UserInteraction"
import { socket } from "./Home"
import useApi from "../hooks/useApi"

const ChatSection = ({ chatId, setChatList, chatList }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const { callApi } = useApi();

  const fetchMessages = async () => {
    const response: any = await callApi("GET_MESSAGES", {
      chatRoom: chatId
    });
    setMessages(response.data?.messages);

    // rearrange chat list
    const latestHalfChatObj = response?.data?.chat;
    let findChatIndex = chatList?.findIndex((chat: any) => chat?._id === latestHalfChatObj?.latestMessage?.chatRoom);
    let chatObject = chatList[findChatIndex];
    chatObject = { ...chatObject, ...latestHalfChatObj };
    let newList = [...chatList];
    newList[findChatIndex] = chatObject;
    setChatList(newList);
  }

  const rearrangeChatList = (list: any, latestFullChatObject: any) => {
    const restOfChats = list?.filter((chat: any) => chat?._id !== latestFullChatObject?._id);
    const newList = [latestFullChatObject, ...restOfChats];

    return newList;
  }

  useEffect(() => {
    fetchMessages();
  }, [chatId])

  const getChat = (latestMsgObj: any) => {
    const chatIdFromMsg = latestMsgObj?.chatRoom?._id || latestMsgObj?.chatRoom;
    let findChatIndex = chatList?.findIndex((chat: any) => chat?._id === chatIdFromMsg);
    const chatObject = chatList[findChatIndex];

    return chatObject;
  }

  useEffect(() => {
    socket.off("resend-message");

    socket.on("resend-message", async (messageObject: any) => {
      const { latestMsgObj, latestChatObj } = messageObject
      const chatObject = getChat(latestMsgObj);

      // update the chat object with latestMessage
      chatObject.latestMessage = latestChatObj?.latestMessage;

      if (chatId === chatObject?._id) {
        setMessages((prev: any) => [...prev, latestMsgObj])
        // notify false -> unseen: false
        // TODO: make api call to set unseen: false
        chatObject.unseenMessages = false;
        await callApi("SEE_CHAT_MSGS", {
          chatRoom: chatId
        });
      } else {
        // set notification: true
        chatObject.unseenMessages = true;
      }
      // put it on top
      setChatList((prev: any) => rearrangeChatList(prev, chatObject));

      return () => { socket.off("resend-message") }
    })
  }, [chatId])

  return (
    <div className="h-5/6 flex flex-col">
      <MessageSection messages={messages} chatId={chatId} />
      <UserInteraction chatId={chatId} setMessages={setMessages} setChatList={setChatList} />
    </div>
  )
}

export default ChatSection
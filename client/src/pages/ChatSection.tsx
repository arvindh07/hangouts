import { useEffect, useState } from "react"
import MessageSection from "../page_components/MessageSection"
import UserInteraction from "../page_components/UserInteraction"
import { socket } from "./Home"
import useApi from "../hooks/useApi"

const ChatSection = ({ chatId, setChatList, chatList }: any) => {
  const [messages, setMessages] = useState<any>([]);
  const { callApi } = useApi();
  console.log("##2 ******chatID ", chatId);

  const fetchMessages = async () => {
    const response: any = await callApi("GET_MESSAGES", {
      chatRoom: chatId
    });
    console.log("receive ##1 api get all msgs resp ", response);
    setMessages(response.data?.messages);
    console.log("receive ##2 aftr set msgs");
    // rearrange chat list
    const latestHalfChatObj = response?.data?.chat;
    let findChatIndex = chatList?.findIndex((chat: any) => chat?._id === latestHalfChatObj?.latestMessage?.chatRoom);
    let chatObject = chatList[findChatIndex];
    chatObject = {...chatObject, ...latestHalfChatObj};
    let newList = [...chatList];
    newList[findChatIndex] = chatObject;
    console.log("receive ##3 updating last msg with curr chat list, aftr update -> ", newList);
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
      console.log("receive ##1.1 inside resend-msg", messageObject);
      const {latestMsgObj, latestChatObj} = messageObject
      const chatObject = getChat(latestMsgObj);

      // update the chat object with latestMessage
      console.log("receive ##1.2 curr chat id: get that chat from last msg ->", chatId, chatObject);
      chatObject.latestMessage = latestChatObj?.latestMessage;

      if (chatId === chatObject?._id) {
        console.log("receive ##2.1 same chat id, so setting the msgs and unseen false, last msg obj", latestMsgObj);
        setMessages((prev: any) => [...prev, latestMsgObj])
        // notify false -> unseen: false
        chatObject.unseenMessages = false;
        // TODO: make api call to set unseen: false
        await callApi("SEE_CHAT_MSGS", {
          chatRoom: chatId
        });
      } else {
        console.log("receive ##2.2 diff chat id, so unseenMsgs: true");
        // set notification: true
        chatObject.unseenMessages = true;
      }
      // put it on top
      console.log("receive ##3 setting final with chatObj", chatObject);
      setChatList((prev: any) => rearrangeChatList(prev, chatObject));

      return () => {socket.off("resend-message")}
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
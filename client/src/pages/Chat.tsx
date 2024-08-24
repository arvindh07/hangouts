import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
interface ChatProps {
    currentChat: any;
    chatId: string;
    setChatList: any;
    chatList: any
}

const Chat = ({ currentChat, chatId, setChatList, chatList }: ChatProps) => {
    console.log("##1 ******chatID ", chatId);
    
    return (
        <div className="h-screen">
            <Navbar currentChat={currentChat} />
            <ChatSection chatId={chatId} setChatList={setChatList} chatList={chatList} />
        </div>
    )
}
export default Chat
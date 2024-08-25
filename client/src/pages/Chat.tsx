import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
interface ChatProps {
    currentChat: any;
    chatId: string;
    setChatList: any;
    chatList: any;
    setChatListScreen: any;
}

const Chat = ({ currentChat, chatId, setChatList, chatList, setChatListScreen }: ChatProps) => {
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar currentChat={currentChat} setChatListScreen={setChatListScreen} />
            <ChatSection chatId={chatId} setChatList={setChatList} chatList={chatList} />
        </div>
    )
}

export default Chat;
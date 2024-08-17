import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
interface ChatProps {
    currentChat: any;
    chatId: string;
    setChatList: any;
}

const Chat = ({ currentChat, chatId, setChatList }: ChatProps) => {
    return (
        <div className="h-screen">
            <Navbar currentChat={currentChat} />
            <ChatSection chatId={chatId} setChatList={setChatList} />
        </div>
    )
}
export default Chat
import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
interface ChatProps {
    currentChat: any;
    chatId: string;
}

const Chat = ({ currentChat, chatId }: ChatProps) => {
    return (
        <div className="h-screen">
            <Navbar currentChat={currentChat?.username} />
            <ChatSection chatId={chatId} />
        </div>
    )
}
export default Chat
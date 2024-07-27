import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
interface ChatProps {
    currentChat: any;
    chatId: string;
}

const Chat = ({ currentChat, chatId }: ChatProps) => {
    return (
        <>
            <Navbar currentChat={currentChat?.username} />
            <ChatSection currentChat={currentChat} chatId={chatId} />
        </>
    )
}
export default Chat
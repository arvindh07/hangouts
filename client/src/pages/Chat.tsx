import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
interface ChatProps {
    currentChat: string;
}

const Chat = ({ currentChat }: ChatProps) => {
    return (
        <>
            <Navbar currentChat={currentChat} />
            <ChatSection />
        </>
    )
}
export default Chat
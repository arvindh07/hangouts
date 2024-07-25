import { useEffect } from "react";
import Navbar from "../page_components/Navbar"
import ChatSection from "./ChatSection"
import io from "socket.io-client";

interface ChatProps {
    currentChat: string;
}

export let socket: any;

const Chat = ({ currentChat }: ChatProps) => {
    useEffect(() => {
        socket = io("http://localhost:6999");
        socket.on("connect", () => {
            console.log("Socket connected in client");
        })
    }, [])

    return (
        <>
            <Navbar currentChat={currentChat} />
            <ChatSection />
        </>
    )
}
export default Chat
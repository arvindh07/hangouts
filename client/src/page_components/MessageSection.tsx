import { useEffect, useState } from "react"
import { socket } from "../pages/Home"

const MessageSection = () => {
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        socket.on("serverMessage", (message: string) => {
            setMessages((prev) => ([...prev, message]));
        })
    }, [])

    return (
        <div className="h-4/5">
            {messages?.map((msg: any, index: number) => {
                return (
                    <div className={`flex flex-col`}>
                        <div
                            key={index}
                            className={`inline-block bg-blue-100 mb-2 rounded-md p-2 px-4`}>
                            {msg}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSection
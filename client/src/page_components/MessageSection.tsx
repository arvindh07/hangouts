import { useState } from "react"

const MessageSection = () => {
    const [messages, setMessages] = useState<string[]>([])

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
import { useState } from "react"

const MessageSection = () => {
    const [messages, _] = useState([
        {
            "me": "Hello!"
        },
        {
            "friend": "Hi Arvindh!"
        },
        {
            "me": "Whats up"
        },
        {
            "friend": "Nothing much. Just surfing"
        },
        {
            "friend2": "What are you doing?"
        }
    ])

    return (
        <div className="h-4/5">
            {messages?.map((msg: any) => {
                let sender;
                let message;
                return (
                    <div className={`flex flex-col`}>
                        {Object.keys(msg)?.map((k: string) => {
                            sender = k;
                            message = msg[k];
                            return (
                                <div 
                                    className={`inline-block bg-blue-100 mb-2 rounded-md p-2 px-4 ${sender === "me" ? "ml-auto" : "mr-auto"}`}>
                                    {message}
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSection
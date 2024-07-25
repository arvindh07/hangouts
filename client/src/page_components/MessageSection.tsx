import { useState } from "react"

const MessageSection = () => {
    const [messages, setMessages] = useState<any[]>([
        { content: "Hi", sender: "Me", chatRoom: "MeVinisha" },
        { content: "Hello", sender: "Vinu", chatRoom: "MeVinisha" },
        { content: "Hw r u?", sender: "Me", chatRoom: "MeVinisha" },
        { content: "I am fine. How abt u?", sender: "Vinu", chatRoom: "MeVinisha" },
        { content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, possimus consectetur consequuntur eos dolorum facere tempora praesentium quod natus, laborum odit quisquam debitis reiciendis repellat.", sender: "Vinu", chatRoom: "MeVinisha" },
        { content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, possimus consectetur consequuntur eos dolorum facere tempora praesentium quod natus, laborum odit quisquam debitis reiciendis repellat.", sender: "Vinu", chatRoom: "MeVinisha" },
        { content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, possimus consectetur consequuntur eos dolorum facere tempora praesentium quod natus, laborum odit quisquam debitis reiciendis repellat.", sender: "Vinu", chatRoom: "MeVinisha" },
    ])
    const currentUser = "Me";

    return (
        <div className="h-4/5 overflow-y-auto message bg-gray-50 pt-2 mb-3 rounded-sm">
            {messages?.map((msgObj: any, index: number) => {
                return (
                    <div className={`flex flex-col px-2 w-full`}>
                        <div
                            key={index}
                            className={`max-w-[60%] inline-block bg-blue-100 mb-2 rounded-md p-2 px-4 
                            ${currentUser === msgObj?.sender ? "ml-auto" : "mr-auto"} text-wrap`}>
                            {msgObj?.content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSection
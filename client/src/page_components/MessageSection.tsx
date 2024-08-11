import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useRef } from "react";

const MessageSection = ({ messages }: any) => {
    const user = useSelector((state: RootState) => state?.app?.user);
    const msgRef = useRef<any>(null);

    useEffect(() => {
        if (msgRef.current) {
            msgRef.current?.lastElementChild?.scrollIntoView({
                behaviour: "smooth",
                block: "nearest"
            })
        }
    }, [messages])

    return (
        <div ref={msgRef} className="h-full overflow-y-auto message bg-gray-50 pt-2 mb-3 rounded-sm">
            {messages?.map((msgObj: any) => {
                return (
                    <div
                        key={msgObj?._id}
                        className={`flex flex-col px-2 w-full`}>
                        <div
                            className={`max-w-[60%] inline-block bg-blue-100 mb-2 rounded-md p-2 px-4 
                            ${user?.id === msgObj?.sender?._id ? "ml-auto" : "mr-auto"} text-wrap`}>
                            {msgObj?.content}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSection
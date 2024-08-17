import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useRef } from "react";
import { getDateAndTime, getTime } from "../utils/date";

const MessageSection = ({ messages, chatId }: any) => {
    const user = useSelector((state: RootState) => state?.app?.user);
    const msgRef = useRef<any>(null);

    useEffect(() => {
        if (msgRef.current) {
            msgRef.current?.lastElementChild?.scrollIntoView({
                behaviour: "smooth",
                block: "nearest"
            })
        }

        return () => setDate();
    }, [chatId])

    const setDate = () => {
        dateGetter(null);
    }

    const dateGetter = (created: any) => {
        const res = getDateAndTime(created);
        return res ? <h5 className="text-center bg-gray-700 text-white inline-block w-fit mx-auto px-2 rounded-md py-1 text-sm mb-4">{res}</h5> : <></>;
    }

    return (
        <div ref={msgRef} className="h-full overflow-y-auto message bg-gray-50 pt-2 mb-3 rounded-sm">
            {messages?.map((msgObj: any) => {
                return (
                    <div
                        key={msgObj?._id}
                        className={`flex flex-col px-2 w-full`}>
                        {dateGetter(msgObj?.createdAt)}
                        <div
                            className={`max-w-[60%] bg-blue-100 mb-2 rounded-md p-2 px-4 flex flex-col
                            ${user?.id === msgObj?.sender?._id ? "ml-auto" : "mr-auto"} text-wrap`}>
                            <span>{msgObj?.content}</span>
                            <span
                                className={`text-[12px] text-black/50 font-semibold tracking-wide
                                    ${user?.id === msgObj?.sender?._id ? "ml-auto" : "mr-auto"}`}>{getTime(msgObj?.createdAt)}</span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MessageSection
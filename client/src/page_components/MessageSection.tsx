import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const MessageSection = ({ messages }: any) => {
    const user = useSelector((state: RootState) => state?.app?.user);
    
    return (
        <div className="h-4/5 overflow-y-auto message bg-gray-50 pt-2 mb-3 rounded-sm">
            {messages?.map((msgObj: any) => {
                return (
                    <div key={msgObj?._id} className={`flex flex-col px-2 w-full`}>
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
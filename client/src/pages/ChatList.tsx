import { useEffect, useState } from "react"
import { socket } from "./Home"


const ChatList = () => {
    const [friendsList, setFriendsList] = useState<string[]>([])

    useEffect(() => {
        socket?.on("userData", (users) => {
            const {sendUsers, currentId} = JSON.parse(users);
            let newUsers: any = {};
            for (const key in sendUsers) {
                if(key !== currentId) {
                    newUsers[key] = sendUsers[key];
                }
            }
            const newFriends: string[] =  Object.values(newUsers);            
            setFriendsList(newFriends);
        })
    }, [])
    
    if(friendsList?.length === 0) {
        return <h1>No friends😒</h1>
    }

    return (
        <div className="border-slate-200 border-t-4 mt-10">
            {friendsList?.map((friend) => {
                return (
                    <div
                        key={friend}
                        className="border-slate-200 border-b-4 rounded-md p-3 px-6 cursor-pointer hover:bg-slate-50">
                        {friend}
                    </div>
                )
            })}
        </div>
    )
}

export default ChatList
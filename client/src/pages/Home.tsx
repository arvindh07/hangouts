import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { axiosInstance } from "../api/axios"
import Chat from "./Chat"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { io } from "socket.io-client"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { capitalizeWords, getOtherUser } from "../utils/common";

export let socket: any;

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any>([]);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.app.user);
  const [userTerm, setUserTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [chatList, setChatList] = useState<any>([]);
  const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    let response;
    try {
      response = await axiosInstance.get("/user");
      setUsers(response?.data);
    } catch (error: any) {
      localStorage.removeItem("user")
      navigate("/");
      return;
    }
    setLoading(false);
  }

  const handleChat = (username: string, friendId: string) => {
    setCurrentChat(username);
    socket.emit("join-room", friendId);
  }

  const handleAddRemoveChatList = (userObj: any) => {
    let userFoundIndex = -1;
    chatList.forEach((element: any, index: number) => {
      if (element?._id === userObj._id) {
        userFoundIndex = index
      }
    });
    if (userFoundIndex === -1) {
      setChatList((prev: any) => ([...prev, userObj]))
    } else {
      const newChatList = chatList?.filter((_: any, index: number) => index !== userFoundIndex);
      setChatList(newChatList);
    }
  }

  const handleSearchUser = async () => {
    const response = await axiosInstance.get(`/user?search=${userTerm}`);
    setSearchResults(response.data);
  }

  const handleAddToChats = async (userObj: any) => {
    const response = await axiosInstance.post("/chat", {
      userId: userObj?._id
    });
    let localChatList = chatList[0]?.users;
    if(!chatList?.find((chat: any) => chat._id === response.data?._id)) {
      setChatList((prev: any) => ([response?.data, ...prev]));
      localChatList = response?.data?.users;
    }

    const otherUser = getOtherUser(localChatList, user);
    setCurrentChat(otherUser?.username);
    setOpen(false);
  }

  const fetchChats = async () => {
    const response = await axiosInstance.get("/chat");
    setChatList(response.data);
  }

  useEffect(() => {
    fetchChats();
    socket = io("http://localhost:6999");
    socket.emit("setup", user.id);
    socket.on("connected", () => {
      console.log("Socket connected(Client side)🚀");
    })
  }, [])

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-1/4 max-w-[280px]">
        <h1 className="text-2xl mx-auto my-4 border-b-2 mb-10">Hangouts🚀</h1>
        <div>
          <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
            <DrawerTrigger onClick={() => setOpen(true)}>Search</DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Search</DrawerTitle>
                  <div className="flex justify-between space-x-2">
                    <Input
                      name="userTerm"
                      value={userTerm}
                      onChange={(e) => setUserTerm(e.target.value)} />
                    <Button disabled={!userTerm} onClick={handleSearchUser}>Search</Button>
                  </div>
                  <div className="mt-2">
                    {/* display users list */}
                    {searchResults?.map((result: any) => {
                      return (
                        // single chat
                        <Badge
                          key={result?._id}
                          className={`rounded-md mb-2 px-5 py-1 mr-2 cursor-pointer hover:bg-black/10 transition-all duration-150 
                          ${chatList?.users?.find((user: any) => user._id === result?._id)
                              ? "bg-black text-white hover:bg-black"
                              : "bg-white text-black hover:bg-white"}`}
                          variant="outline"
                          onClick={() => handleAddToChats(result)}>
                          <div className="flex flex-col">
                            <span className="text-xl">{capitalizeWords(result?.username)}</span>
                            <span>{result?.email}</span>
                          </div>
                        </Badge>
                      )
                    })}
                  </div>
                </DrawerHeader>
                <DrawerFooter>
                  {/* <Button onClick={handleAddToChats}>Add</Button> */}
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        {/* <ChatList /> */}
        {chatList?.map((chat: any) => {
          const otherUser: any = getOtherUser(chat?.users, user);
          // const username = user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)
          // onClick={() => handleChat(otherUserName, chat._id)}
          return (
            <div key={chat?._id} className={`flex space-x-2 items-center mb-3 p-2 cursor-pointer hover:bg-black/80 hover:text-white rounded-md ${currentChat === otherUser?.username ? "bg-black/80 text-white" : ""}`}
            onClick={() => handleChat(otherUser?.username, otherUser._id)}>
              <img src={otherUser?.profilePic} alt="" className="w-10 h-10 rounded-full object-contain" />
              <span className="text-xl">{capitalizeWords(otherUser?.username)}</span>
            </div>
          )
        })}
      </div>
      {/* show below only if friend is chosen */}
      <div className="flex flex-col w-3/4 mx-3">
        {!currentChat
          ? <div className="flex justify-center items-center h-screen">
            <p>Click to see chat</p>
          </div>
          : <Chat currentChat={currentChat} />}
      </div>
    </div>
  )
}

export default Home
// group chat
// <Badge
//   key={result?._id}
//   className={`rounded-md mb-2 px-5 py-1 mr-2 cursor-pointer hover:bg-black/10 transition-all duration-150 
//   ${chatList?.find((user: any) => user._id === result?._id) 
//     ? "bg-black text-white hover:bg-black"
//     : "bg-white text-black hover:bg-white"}`}
//   variant="outline"
//   onClick={() => handleAddRemoveChatList(result)}>
//   <div className="flex flex-col">
//     <span className="text-xl">{capitalizeWords(result?.username)}</span>
//     <span>{result?.email}</span>
//   </div>
// </Badge>
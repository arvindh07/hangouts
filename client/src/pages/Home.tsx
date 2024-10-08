import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Chat from "./Chat"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { FaAngleDown } from "react-icons/fa";
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/store"
import { io } from "socket.io-client";
import { FaSearch } from "react-icons/fa";
import { capitalizeWords, getOtherUser } from "../utils/common";
import useApi from "../hooks/useApi";
import "../index.css";
import { appActions } from "../store/slices/rootSlice";
import { AiFillNotification } from "react-icons/ai";
import { BiPowerOff } from "react-icons/bi";
import { useMediaQuery } from "@uidotdev/usehooks";
import ChatSkeleton from "../Skeleton/ChatSkeleton";

export let socket: any = io(import.meta.env.VITE_SOCKET_DOMAIN, {
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  transports: ['websocket'],
  withCredentials: true
});

const Home = () => {
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState<any>(null);
  const user = useSelector((state: RootState) => state.app.user);
  const [userTerm, setUserTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any>([]);
  const [chatList, setChatList] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<any>(null);
  const { callApi } = useApi();
  const dispatch = useDispatch();
  const [chatListScreen, setChatListScreen] = useState(true);
  const [chatListLoader, setChatListLoader] = useState(true);

  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 550px)"
  );

  const handleChat = (userObj: any, friendId: string, chatId: string) => {
    setCurrentChat(userObj);
    setCurrentChatId(chatId);
    setChatListScreen(false);
    socket.emit("join-room", friendId);
  }

  const handleSearchUser = async () => {
    const response: any = await callApi("SEARCH_USER", null, { userTerm });
    setSearchResults(response.data);
  }

  const handleAddToChats = async (userObj: any) => {
    const response: any = await callApi("CREATE_CHAT", {
      userId: userObj?._id
    });

    let localChatList = chatList[0]?.users;
    if (!chatList?.find((chat: any) => chat._id === response.data?._id)) {
      setChatList((prev: any) => ([response?.data, ...prev]));
      localChatList = response?.data?.users;
    }

    const otherUser = getOtherUser(localChatList, user);
    setCurrentChat(otherUser);
    setOpen(false);
  }

  const fetchChats = async () => {
    const response: any = await callApi("GET_CHATS");
    setChatList(response.data);
    setTimeout(() => {
      setChatListLoader(false);
    }, 1000);
  }

  const handleLogout = async () => {
    await callApi("LOGOUT");
    dispatch(appActions?.setLogin(false));
    navigate("/");
  }

  useEffect(() => {
    fetchChats();
    socket.emit("setup", user.id);
    socket.on("connected", () => {
      console.log("Socket connected(Client side)🚀");
    })

    // for debugging
    socket.on('connect_error', (error: any) => {
      console.error('WebSocket Connection Error:', error);
    });
    
    socket.on('disconnect', (reason: any) => {
      console.log('Disconnected:', reason);
    });

    return (() => {
      socket.off("message")
    })
  }, [])

  return (
    <>
      {chatListLoader
        ? <ChatSkeleton />
        : <div className="flex flex-col h-screen overflow-hidden">
          {/* top navabr */}
          {/* navbar */}
          <div className="flex items-center px-4 min-[550px]:px-10 py-3 justify-between bg-slate-900/95">
            <h1
              className="text-2xl 
          drop-shadow-md
          font-semibold tracking-widest text-white">Hangouts</h1>
            <div className="flex">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white">
                  <img src={user?.profilePic} alt="" className="w-9 h-9 mr-1 rounded-full object-cover" />
                  <FaAngleDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{capitalizeWords(user?.username)}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer justify-between" onClick={handleLogout}>
                    Logout
                    <BiPowerOff />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden">
            {/* main page */}
            {(chatListScreen || isLargeDevice) && <div className="flex flex-col w-full min-[550px]:w-1/4 md:max-w-[280px] bg-slate-900 pt-3">
              <div className="mb-3 md:mx-auto px-3 md:px-0 flex items-center justify-between">
                <div>
                  <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
                    <DrawerTrigger
                      onClick={() => setOpen(true)}
                      className="bg-white/70 text-black hover:bg-white/60 px-3 py-2 rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="hidden md:block mr-4">Search</div>
                        <div>
                          <FaSearch />
                        </div>
                      </div>
                    </DrawerTrigger>
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
              </div>
              {/* <ChatList /> */}
              {chatList?.map((chat: any) => {
                const otherUser: any = getOtherUser(chat?.users, user);

                return (
                  <div key={chat?._id} className={`flex w-full overflow-y-auto space-x-2 items-center mb-0 p-2 text-white/70 cursor-pointer hover:bg-white/60 hover:text-black group
            ${currentChatId === chat?._id ? "bg-white/80 text-black" : ""}`}
                    onClick={() => handleChat(otherUser, otherUser._id, chat?._id)}>
                    <div>
                      {/* left div */}
                      <img src={otherUser?.profilePic} alt="" className="w-9 h-9 rounded-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      {/* right div */}
                      <div className="flex justify-between items-center pr-4">
                        {/* right-top */}
                        <span className={`text-md ${currentChatId === chat?._id ? "text-black font-semibold" : ""}`}>{capitalizeWords(otherUser?.username)}</span>
                        {chat?.unseenMessages
                          && user.id !== chat?.latestMessage?.sender
                          && <AiFillNotification />}
                      </div>
                      <div>
                        {/* right bottom */}
                        {/* latestMessage */}
                        <p
                          className={`text-xs text-white/40 
                      group-hover:text-black ${currentChatId === chat?._id ? "!text-black" : ""}`}>
                          {chat?.latestMessage?.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>}
            {/* show below only if friend is chosen */}
            {(!chatListScreen || isLargeDevice) && <div className="flex-1 flex flex-col overflow-y-auto min-[550px]:flex-grow w-full bg-gray-200">
              {!currentChat
                ? <div className="flex justify-center items-center w-full h-full">
                  <p>Click chat to see messages</p>
                </div>
                : <Chat
                  currentChat={currentChat}
                  chatId={currentChatId}
                  setChatList={setChatList}
                  chatList={chatList}
                  setChatListScreen={setChatListScreen} />}
            </div>}
          </div>
        </div>}
    </>
  )
}

export default Home
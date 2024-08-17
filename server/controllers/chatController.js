import Chat from "../models/chatSchema.js";

export const handleAccessOrCreateChat = async (req, res, next) => {
    const { userId } = req.body;
    if(!userId){
        return res.status(400).json({
            msg: "Id required"
        })
    }
    // search the inc user in chat.users
    // if found: return the chat
    // else: create chat
    const chatFound = await Chat.find({
        $and: [
            {
                users: req.user
            },
            {
                users: userId
            }
        ]
    }).populate("users", "username email profilePic")
    .populate("latestMessage", "content chatRoom sender");

    if(chatFound?.length === 0) {
        let chat = await Chat.create({
            users: [userId, req.user]
        });
        chat = await chat.populate("users", "username email profilePic");
        return res.status(201).json(chat);
    }
    
    return res.status(200).json(chatFound[0]);
}

export const handleGetAllChats = async (req, res, next) => {
    // get all chats that logged in user is part of
    const chats = await Chat.find({ users: req.user })
        .populate("users", "username email profilePic")
        .sort({'updatedAt': -1});
    return res.status(200).json(chats);
}
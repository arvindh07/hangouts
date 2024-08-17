import Message from "../models/messageSchema.js";
import Chat from "../models/chatSchema.js";

export const handleCreateMessage = async (req, res, next) => {
    const data = req.body;

    let message = await Message.create(data);
    message = await message.populate("sender", "username email profilePic")
    message = await message.populate("chatRoom")
    message = await message.populate("chatRoom.users", "username email profilePic")

    let chat = await Chat.findByIdAndUpdate({ _id: data?.chatRoom }, {
        latestMessage: message
    }, {
        new: true
    })
    chat = await chat.populate("latestMessage", "content chatRoom sender updatedAt");
    chat = await chat.populate("users", "username email profilePic");
    return res.status(201).json({ message, chat });
}

export const handleGetAllMessages = async (req, res, next) => {
    const { chatRoom } = req.body;
    const chat = await Chat.find({
        _id: chatRoom
    })
    if (!chat) {
        return res.status(400).json({
            msg: "No chat room"
        })
    }
    const messagesForLoggedInUser = await Message.find({
        chatRoom
    }).populate("sender", "username email profilePic");

    return res.status(200).json(messagesForLoggedInUser);
}
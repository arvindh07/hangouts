import Message from "../models/messageSchema.js";
import Chat from "../models/chatSchema.js";

/*
    1. createMessage
        res -> {
            message: [...], chat: {latestMessage, unseenMessages}
        }
    2. getAllMessages
        res -> {
            messages: [...], chat: {latestMessage, unseenMessages}
        }
*/
export const handleCreateMessage = async (req, res, next) => {
    const data = req.body;

    let message = await Message.create(data);
    message = await message.populate("sender", "username email profilePic")
    message = await message.populate("chatRoom")
    message = await message.populate("chatRoom.users", "username email profilePic")

    let chat = await Chat.findByIdAndUpdate({ _id: data?.chatRoom }, {
        latestMessage: message,
        unseenMessages: true
    }, {
        new: true
    })

    chat = await chat.populate("latestMessage", "content chatRoom sender updatedAt");
    chat = {
        latestMessage: chat?.latestMessage,
        unseenMessages: chat?.unseenMessages
    }

    // chat = await chat.populate("users", "username email profilePic");
    return res.status(201).json({ message, chat });
}

export const handleGetAllMessages = async (req, res, next) => {
    const { chatRoom } = req.body;
    let chat = await Chat.findById(chatRoom);
    
    if (!chat) {
        return res.status(400).json({
            msg: "No chat room"
        })
    }

    chat.unseenMessages = false;
    await chat.save();
    chat = await chat.populate("latestMessage", "content chatRoom sender updatedAt");
    chat = {
        latestMessage: chat?.latestMessage,
        unseenMessages: chat?.unseenMessages
    }

    const messagesForLoggedInUser = await Message.find({
        chatRoom
    }).populate("sender", "username email profilePic");

    return res.status(200).json({ messages: messagesForLoggedInUser, chat });
}
import Message from "../models/messageSchema.js";

export const handleCreateMessage = async (req, res, next) => {
    const data = req.body;

    let message = await Message.create(data);
    message = await message.populate("sender", "username email profilePic")
    return res.status(201).json(message);
}

export const handleGetAllMessages = async (req, res, next) => {
    const { chatRoom } = req.body;
    const messagesForLoggedInUser = await Message.find({
        chatRoom
    }).populate("sender", "username email profilePic").sort({ updatedAt: -1 });

    return res.status(200).json(messagesForLoggedInUser);
}
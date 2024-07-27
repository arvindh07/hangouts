import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    // to describe chat name in navbar
    chatName: {
        type: String,
        trim: true
    },
    // to emit or broadcast msgs to users in the group or single chat
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    // to give special permissions to remove user from group
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    isGroupChat: {
        type: Boolean,
        default: false
    },
    // to display in the user list on left side with this latest message
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
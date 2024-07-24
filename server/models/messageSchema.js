import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    // primary id - to which chat room this message belongs to
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
    // as name describes
    content: {
        type: String,
        required: true
    },
    // as name describes - will help to omit the sender in certain cases
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema);
export default Message;
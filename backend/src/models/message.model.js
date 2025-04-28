import mongoose from "mongoose";

// create schema for user
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    text:{
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
// create user model with that schema
const Message = mongoose.model("Messgage", messageSchema);
// export this model
export default Message;
import mongoose from "mongoose";

// create schema for user
const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    text:{
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);
// create user model with that schema
const Message = mongoose.model("Messgage", messageSchema);
// export this model
export default Message;
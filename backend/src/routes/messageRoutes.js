import express from "express";
import Message from "../models/message.model.js";
import verifyToken from "../middlewares/firebase.middleware.js";
const router=express.Router();

router.post("/send",verifyToken,async (req, res) => {
  // get data from frontend
  const {senderId, receiverId, text, image} = req.body;
  try {
    // create a new message in schema
    const message = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: image || "",
      timestamp: new Date(),
    });
    // save message to database
    await message.save();
    // send response to frontend
    res.status(200).json({ message: message });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

// get all messages between two users
router.get("/:senderId/:receiverId",verifyToken, async (req, res) => {
  const { senderId, receiverId } = req.params;
  try {
    // get all messages between two users
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
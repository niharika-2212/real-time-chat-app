import express from "express";
import User from "../models/user.model.js";
import { signup} from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/firebase.middleware.js";
const router=express.Router();

// signup user
router.post("/signup",async (req, res) => {
  // read data from frontend
  const {uid, fullname, email} = req.body;
  // check if user already exists
  let user = await User.findOne({uid});
  // if no user exists then create a new user
  if(!user){
    
    user = new User({
      uid,
      fullname,
      email,
    });
    await user.save();
  }
  res.status(200).json({ message: "User saved", user });
});

// get user details by uid
router.get("/:uid",async (req,res)=>{
    const {uid}=req.params;
    // check if user already exists
    try {
      const user = await User.findOne({uid});
      if(!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// get all users except current user
router.get("/allusers/:currentUserId",async (req, res) => {
  const { currentUserId } = req.params;
  try {
    const users = await User.find({ uid: { $ne: currentUserId } });
    res.status(200).json({users});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put("/update-profile-pic/:uid",async (req,res)=>{
  const {image} = req.body;
  const {uid} = req.params;
  if (!image) {
    return res.status(400).json({ message: "Image URL is required." });
  }
  try {
    const user = await User.findOneAndUpdate(
      { uid },
      { profilepic: image },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile picture updated successfully.",
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.error("Error updating profile picture:", err);
    res.status(500).json({ message: "Server error." });
  }
});


export default router;
import express from "express";
import User from "../models/user.model.js";
import { login,signup, logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/firebase.middleware.js";
const router=express.Router();

// router.get("/login",login);
router.post("/signup",signup);
// router.get("/logout",logout);

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

export default router;
import express from "express";
import { login,signup, logout } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/firebase.middleware.js";
const router=express.Router();

router.get("/login",verifyToken,login);
router.get("/signup",verifyToken,signup);
router.get("/logout",verifyToken,logout);


export default router;
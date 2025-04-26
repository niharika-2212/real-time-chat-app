import express from "express";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
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
}

export const login = (req, res) => {
  const {email} = req.body;
  // check if user already exists
  const user = User.findOne({email});
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "Login success", user });
}


export const logout = (req, res) => {
  res.send("logout route");
}
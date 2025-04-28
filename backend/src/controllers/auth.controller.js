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

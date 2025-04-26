import mongoose from "mongoose";

// create schema for user
const userSchema = new mongoose.Schema(
  {
    uid: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
// create user model with that schema
const User = mongoose.model("User", userSchema);
// export this model
export default User;

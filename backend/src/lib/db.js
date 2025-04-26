import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// function to try to connect to mongodb 
export const connectdb = async () => {
  try {
    // connect to mongodb using mongoose
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    // log the connection host
    // console.log("hello")
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
}
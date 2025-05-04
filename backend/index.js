import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";
import { connectdb } from "./src/lib/db.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow your frontend app
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 5000;

// middleware to parse json data
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// app.use("/api/auth",authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

// Listen for incoming socket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("send_message", (message) => {
    // console.log("Received message:", message);
    io.emit("receive_message", message); // broadcast to all
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(5001, () => {
  console.log("Socket.IO server running on http://localhost:5001");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectdb();
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { connectdb } from "./lib/db.js";
dotenv.config();
const app  = express();

const port = process.env.PORT || 5000;

// middleware to parse json data
app.use(express.json());
app.use(cors());

// app.use("/api/auth",authRoutes);
app.use("/api/user", userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectdb();
});
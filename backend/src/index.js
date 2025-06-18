import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware to parse json data
app.use(express.json({ limit: "10mb" }));   

// middleware to parse urlencoded data
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());

// middleware to handle cors
app.use(cors({ 
    origin: process.env.NODE_ENV === "production" 
        ? "https://mern-stack-chat-app-sbh6.onrender.com"
        : "http://localhost:5173",
    credentials: true,
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
    // Serve static files
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Handle client-side routing
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});
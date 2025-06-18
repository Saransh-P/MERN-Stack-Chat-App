import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// for production
import path from "path";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// middleware to parse json data
app.use(express.json({ limit: "10mb" }));   

// middleware to parse urlencoded data - allows us to send large data
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser()); // middleware to parse cookies

// middleware to handle cors
app.use(cors({ 
    origin: process.env.NODE_ENV === "production" 
        ? "https://mern-stack-chat-app-sbh6.onrender.com"
        : "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes); // use auth routes
app.use("/api/messages", messageRoutes); // use message routes


// serve frontend
if (process.env.NODE_ENV === "production") {
    const frontendBuildPath = path.join(__dirname, "frontend", "dist");
    app.use(express.static(frontendBuildPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendBuildPath, "index.html"));
    });
}


// start the server that is created in socket.js
server.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectDB();
});
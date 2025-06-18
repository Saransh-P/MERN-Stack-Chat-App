import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

// this function is used to get the socket id of the user
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]; //returns the socket id of the user
}


//  used to store the socket id of the online users
const userSocketMap = {}; //{userId: socketId}

// listen for new connections
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    const userId = socket.handshake.query.userId;

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    //this will send a message to all the users that are online
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // listen for disconnections
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
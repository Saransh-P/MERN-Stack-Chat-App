import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

// get users for sidebar
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId } // $ne means not equal to
         }).select("-password")// select all fields except password
        
        res.status(200).json(filteredUsers);
        }
        catch (error) {
            console.log("Error in getUsersForSidebar controller:", error);
            res.status(500).json({ message: "Internal server error" });
        }
}

// get messages between selfId and userToChatId
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatWithId } = req.params; // userToChatWithId is the user who is being chatted with
        const selfId = req.user._id; // selfId is the user who is logged in

        // find messages between selfId and userToChatId
        const messages = await Message.find({ 
            $or: [
                {senderId: selfId, receiverId: userToChatWithId}, 
                {senderId: userToChatWithId, receiverId: selfId} 
            ]
        });

        res.status(200).json(messages);
    }
    catch (error) {
        console.log("Error in getMessages controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// send message to userToChatId
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body; // taking text and image from body
        const { id: userToChatWithId } = req.params; // userToChatWithId is the user who is being chatted with
        const selfId = req.user._id; // selfId is the user who is logged in

        let imageUrl; //value will be assigned to imageUrl if image is provided
        if(image) {
            const uploadedResponse = await cloudinary.uploader.upload(image); // upload image to cloudinary
            imageUrl = uploadedResponse.secure_url; // taking image url from cloudinary by secure_url
        }

        const newMessage = new Message({
            senderId: selfId, // senderId is the user who is logged in
            receiverId: userToChatWithId, // receiverId is the user who is being chatted with
            text, // text is the message
            image: imageUrl // image is the image url
        });

        await newMessage.save(); // save message to database

        // send message to the receiver
        const receiverSocketId = getReceiverSocketId(userToChatWithId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("Error in sendMessage controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
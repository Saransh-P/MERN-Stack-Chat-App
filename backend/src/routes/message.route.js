import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router(); // create router

router.get("/users", protectRoute, getUsersForSidebar); // get users for sidebar
router.get("/:id", protectRoute, getMessages); // get messages between selfId and userToChatId
router.post("/send/:id", protectRoute, sendMessage); // send message to userToChatId

export default router;
//used in auth.route.js to protect routes that require authentication

import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        // get token from cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - no token" });
        }
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // check if token is valid
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - invalid token" });
        }

        // get user from database
        const user = await User.findById(decoded.userid).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // add user to request object
        req.user = user; // this is used in the controller to get the user id
        next();
    }
    catch (error) {
        console.log("Error in protectRoute middleware", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

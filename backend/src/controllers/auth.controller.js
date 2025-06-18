import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

// signup controller
export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        // check if all fields are required
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // check if password is at least 8 characters long
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        const user = await User.findOne({email});

        // check if email already exists
        if (user) return res.status(400).json({ message: "Email already exists" });

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User(
            {
                fullname, 
                email, 
                password: hashedPassword, 
            }
        );

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            });
        }
        else {
            return res.status(400).json({ message: "Invalid user data" });
        }


    } 
    catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
        
};


// login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    try { 
        // check if email exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password); // compare password with hashed password
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        generateToken(user._id, res); // generate token if password and email is correct

        // send response
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePicture: user.profilePicture,
        });
    } 
    catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// logout controller
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 }); // clear cookie
        res.status(200).json({ message: "Logged out successfully" });
    } 
    catch (error) {
        console.log("Error in logout controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// update profile controller
export const updateProfile = async (req, res) => {
    try {
        const {profilePicture} = req.body;
        const userid = req.user._id;

        // check if profile picture is there or not
        if (!profilePicture) {
            return res.status(400).json({ message: "Profile picture is not provided" });
        }

        // upload profile picture to cloudinary
        const uploadedResponse = await cloudinary.uploader.upload(profilePicture); 
        //     ,{ // options for the upload
        //     folder: "profile-pictures", 
        //         width: 300, 
        //         height: 300, 
        //         crop: "fill", 
        //     }
        // );

        // update user profile picture
        const updatedUser = await User.findByIdAndUpdate(userid, {
            profilePicture: uploadedResponse.secure_url,
        }, {new: true}); // new: true is used to return the updated user

        // send the updated user with all the fields
        res.status(200).json(updatedUser);

        //below will send the updated user with all the fields (not recommended)
        // res.status(200).json({
        //     _id: updatedUser._id,
        //     fullname: updatedUser.fullname,
        //     email: updatedUser.email,
        //     profilePicture: updatedUser.profilePicture,
        // });
    }
    catch (error) {
        console.log("Error in updateProfile controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
        

// check auth controller
export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log("Error in checkAuth controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
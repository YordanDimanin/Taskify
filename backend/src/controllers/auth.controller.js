// Import dependencies
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {sendWelcomeEmail} from "../config/resend.js";
import { generateToken } from "../config/jwt.js";

// Sign up controller
// This controller needs to be async because it contacts to external services
// We need try-catch block to handle errors
export const signUp = async (req, res) => {
    try {
        // Get the user details from the request body
        const {fullname ,email, password, profilePic } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
        }

        // Check if the email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if the password is valid
        if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({fullname: fullname, email: email, password: hashedPassword, profilePic: profilePic});

        if (user){
            try {
                // Generate a token
                generateToken(user._id, res);

                // Save the user to the database
                await user.save();
            }
            catch (error) {
                res.status(500).json({ error: "Server error " + error});
            } 
        }

        // Send email
        sendWelcomeEmail(user.email);
    
        // Send a success response and the user details
        res.status(201).json({ user: user, message: "User created successfully" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error " + error}, {message: "Error creating user"});
    }
};
// Import dependencies
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {sendWelcomeEmail} from "../config/resend.js";
import { generateToken } from "../config/jwt.js";


// This controllers needs to be async because it runs external processes
// We need try-catch block to handle errors

// Signup controller
export const signUp = async (req, res) => {
    try {
        // Get the user details from the request body
        const {fullname ,email, password, profilePic } = req.body;

        // Check if the fullname is valid
        if (fullname.length < 1) {
        return res.status(400).json({ message: "Fullname is required" });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
        return res.status(400).json({ message: "Looks like this email may already be registered. Try logging in or use a different email." });
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
        res.status(201).json({ user: {
            _id: user._id,
            fullname: user.fullname, 
            email: user.email, 
            profilePic: user.profilePic
            
        }, message: "User created successfully" });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error " + error}, {message: "Error creating user"});
    }
};

// login controller
export const login = async (req, res) => {
    try{
        // get the user details from the request body
        const { email, password } = req.body;

        // check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // check if the user exists
        const userInDB = await User.findOne({ email: email });
        if (!userInDB) {
            return res.status(400).json({ message: "Incorrect Credentials" });
        }

        // check if the password is correct
        const isMatch = await bcrypt.compare(password, userInDB.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Credentials" });
        }

        // generate a token
        generateToken(userInDB._id, res);

        // send a success response and the user details
        res.status(200).json({ user: {
            _id: userInDB._id,
            fullname: userInDB.fullname, 
            email: userInDB.email, 
            profilePic: userInDB.profilePic

        } , message: "User logged in successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in user " + error.message });
    }
    
};

// logout controller

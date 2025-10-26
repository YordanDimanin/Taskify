// import dependencies
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

// middleware to check if user is authenticated
export const protectRoute = async (req, res, next) => {
    try {
        // Gets the token from the cookie
        const token = req.cookies.jwt;

        // Checks if the token exists
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token found" });
        }

        // Checks if the token is valid
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Checks if the user exists
        const user = await User.findById(decoded.userID);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Sets the authenticated user in the request
        req.user = user;

        // Passes the request to the next middleware or route
        next();
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error " + error.message });
    }
};

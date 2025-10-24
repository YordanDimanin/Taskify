// importing dependencies
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

// loading environment variables
dotenv.config()

// This function generates a JWT, which is a token that is used to authenticate a user and send them to the frontend
export const generateToken = (userID, res) => {
    // Generating the token
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });

    // Sending the token to the frontend
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return token;
}
// Import dependencies
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// This function connects to MongoDB
// This function needs to be async because it runs external processes
// We need try-catch block to handle errors
export const connectDB = async () => {
  try {
    // Connect to MongoDB using our connection string
    await mongoose.connect(process.env.MONGO_DB_URI);
    // Log a message
    console.log("Connected to MongoDB");

  } catch (error) {
    // Log the error
    console.log("Error connecting to MongoDB:", error);
  }
};
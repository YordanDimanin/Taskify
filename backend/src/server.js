// Import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import path from "path";
import cookieParser from "cookie-parser";

// set __dirname
const __dirname = path.resolve();

// Import database connection
import {connectDB} from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.routes.js";


// Load environment variables
dotenv.config();

// Set the port
const PORT = process.env.PORT;

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

// Deployment setup
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
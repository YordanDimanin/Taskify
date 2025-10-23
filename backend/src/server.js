// Import dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

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

// Routes
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
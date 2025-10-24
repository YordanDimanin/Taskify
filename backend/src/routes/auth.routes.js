import express from "express";
import dotenv from "dotenv";

// loading environment variables
dotenv.config();

// importing controllers
import { signUp } from "../controllers/auth.controller.js";

// creating router
const router = express.Router();

// routes
router.post("/signup" ,signUp);

// exporting router
export default router;
import express from "express";
import dotenv from "dotenv";

// loading environment variables
dotenv.config();

// importing controllers
import { login, signup, logout } from "../controllers/auth.controller.js";

// creating router
const router = express.Router();

// routes
router.post("/signup" ,signup);
router.post("/login" ,login);
router.post("/logout" ,logout);

// exporting router
export default router;
import express from 'express';
import { register, login, guestLogin } from "../controllers/authController.js";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

// Guest login
router.post("/guest-login", guestLogin);

export default router;
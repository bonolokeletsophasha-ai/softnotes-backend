import express from "express";

import {
  signup,
  login,
  logout,
  getCurrentUser,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get current logged-in user
router.get("/me", authMiddleware, getCurrentUser);

// Logout
router.post("/logout", authMiddleware, logout);

export default router;
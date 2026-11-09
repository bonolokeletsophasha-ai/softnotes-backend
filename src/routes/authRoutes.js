import express from "express";

import {
  signup,
  login,
  logout,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout (protected)
router.post("/logout", authMiddleware, logout);

export default router;
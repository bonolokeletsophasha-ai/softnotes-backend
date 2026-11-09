import express from "express";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All notes routes require authentication
router.use(authMiddleware);

// Get all notes
router.get("/", getNotes);

// Create a note
router.post("/", createNote);

// Update a note
router.put("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

export default router;
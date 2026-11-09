import express from "express";

import {
  getNotes,
  getDeletedNotes,
  createNote,
  updateNote,
  toggleFavorite,
  moveToTrash,
  restoreNote,
  permanentlyDeleteNote,
} from "../controllers/notesController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// All notes routes require authentication
router.use(authMiddleware);

// Get all active notes
router.get("/", getNotes);

// Get all deleted notes
router.get("/trash", getDeletedNotes);

// Create a new note
router.post("/", createNote);

// Update an existing note
router.put("/:id", updateNote);

// Toggle favourite status
router.patch("/:id/favorite", toggleFavorite);

// Move a note to Trash
router.delete("/:id", moveToTrash);

// Restore a note from Trash
router.patch("/:id/restore", restoreNote);

// Permanently delete a note
router.delete("/:id/permanent", permanentlyDeleteNote);

export default router;
import { createAuthenticatedClient } from "../config/supabase.js";

// Get all active notes
export const getNotes = async (req, res) => {
  try {
    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("is_deleted", false)
      .order("updated_at", { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: "Notes retrieved successfully.",
      notes: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve notes." });
  }
};

// Get all deleted notes
export const getDeletedNotes = async (req, res) => {
  try {
    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("is_deleted", true)
      .order("updated_at", { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({
      message: "Deleted notes retrieved successfully.",
      notes: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to retrieve deleted notes." });
  }
};

// Create a new note
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Note title is required.",
      });
    }

    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .insert([
        {
          user_id: req.user.id,
          title: title.trim(),
          content: content || "",
          is_favorite: false,
          is_deleted: false,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      message: "Note created successfully.",
      note: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to create note." });
  }
};

// Update an existing note
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .update({
        title,
        content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", req.user.id)
      .eq("is_deleted", false)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({
      message: "Note updated successfully.",
      note: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to update note." });
  }
};

// Toggle a note's favourite status
export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_favorite } = req.body;

    if (typeof is_favorite !== "boolean") {
      return res.status(400).json({
        message: "A valid favourite status is required.",
      });
    }

    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .update({
        is_favorite,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", req.user.id)
      .eq("is_deleted", false)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({
      message: is_favorite
        ? "Note added to favourites."
        : "Note removed from favourites.",
      note: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update favourite status.",
    });
  }
};

// Move a note to the Trash
export const moveToTrash = async (req, res) => {
  try {
    const { id } = req.params;

    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .update({
        is_deleted: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", req.user.id)
      .eq("is_deleted", false)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({
      message: "Note moved to Trash successfully.",
      note: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to move note to Trash." });
  }
};

// Restore a note from the Trash
export const restoreNote = async (req, res) => {
  try {
    const { id } = req.params;

    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .update({
        is_deleted: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", req.user.id)
      .eq("is_deleted", true)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Deleted note not found." });
    }

    res.status(200).json({
      message: "Note restored successfully.",
      note: data,
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to restore note." });
  }
};

// Permanently delete a note
export const permanentlyDeleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const supabase = createAuthenticatedClient(req.accessToken);

    const { data, error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id)
      .eq("user_id", req.user.id)
      .eq("is_deleted", true)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    if (!data) {
      return res.status(404).json({ message: "Deleted note not found." });
    }

    res.status(200).json({
      message: "Note permanently deleted.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to permanently delete note.",
    });
  }
};
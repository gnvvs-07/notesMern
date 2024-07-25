import Notes from "../models/notes.model.js";
import { errorHandler } from "../utils/error.js";

export const createNote = async (req, res, next) => {
  const { title, content, tags } = req.body;

  if (!title) {
    return next(errorHandler(401, "Please add a title"));
  }

  try {
    const newNote = new Notes({
      title,
      content,
      tags,
      user: req.user.id,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const editNote = async (req, res, next) => {
  try {
    const { noteId, userId } = req.params;

    // Check if the user is authorized to edit the note
    if (req.user.id !== userId) {
      return next(errorHandler(403, "User not authorized to edit this note"));
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      noteId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const allNotes = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Check if the user is authorized to fetch the notes
    if (req.user.id !== userId) {
      return next(
        errorHandler(403, "User not authorized to fetch these notes")
      );
    }

    // Fetch only the notes that belong to the user
    const userNotes = await Notes.find({ user: userId });

    res.status(200).json(userNotes);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    await Notes.findByIdAndDelete(req.params.noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};

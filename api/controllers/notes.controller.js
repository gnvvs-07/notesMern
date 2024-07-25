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
    const { noteId } = req.params;

    // Check if the note exists and belongs to the user
    const updatedNote = await Notes.findOneAndUpdate(
      { _id: noteId, user: req.user.id },
      { $set: req.body },
      { new: true }
    );

    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized to edit" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const allNotes = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Fetch only the notes that belong to the user
    const userNotes = await Notes.find({ user: userId });

    res.status(200).json(userNotes);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    const deletedNote = await Notes.findOneAndDelete({
      _id: noteId,
      user: req.user.id,
    });
    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or not authorized to delete" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};

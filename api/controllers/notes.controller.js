import Notes from "../models/notes.model.js";
import { errorHandler } from "../utils/error.js";

export const createNote = async (req, res, next) => {
  if (!req.body.title) {
    return next(errorHandler(401, "add a title "));
  }
  const { title, content, tags } = req.body;

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

export const edit = async (req, res, next) => {
  try {
    const { notesId, userId } = req.params;

    // Check if the user is authorized to edit the note
    if (req.user.id !== userId) {
      return next(new Error("User not authorized to edit this note"));
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      notesId,
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

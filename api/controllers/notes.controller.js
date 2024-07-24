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
      user:req.user.id,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

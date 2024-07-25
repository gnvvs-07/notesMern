import express from "express";
import {
  allNotes,
  createNote,
  deleteNote,
  editNote,
} from "../controllers/notes.controller.js";
import { verifyToken } from "../tokens/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.put("/edit/:noteId", verifyToken, editNote); // Removed userId from route
router.get("/get/:userId", verifyToken, allNotes);
router.delete("/delete/:noteId", verifyToken, deleteNote); // Removed userId from route
export default router;

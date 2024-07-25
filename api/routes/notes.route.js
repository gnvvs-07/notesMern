import express from "express";
import {
  allNotes,
  createNote,
  deleteNote,
  editNote,
  searchNote,
} from "../controllers/notes.controller.js";
import { verifyToken } from "../tokens/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.put("/edit/:noteId", verifyToken, editNote); // No userId needed in the route
router.get("/get/:userId", verifyToken, allNotes);
router.delete("/delete/:noteId", verifyToken, deleteNote); // No userId needed in the route
router.get("/search",verifyToken,searchNote);
export default router;

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
router.put("/edit/:noteId/:userId", verifyToken, editNote);
router.get("/get/:userId", verifyToken, allNotes);
router.delete("/delete/:noteId/:userId",verifyToken,deleteNote);
export default router;

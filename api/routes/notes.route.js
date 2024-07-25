import express from "express";
import {
  allNotes,
  createNote,
  editNote,
} from "../controllers/notes.controller.js";
import { verifyToken } from "../tokens/verifyToken.js";

const router = express.Router();

router.post("/create", verifyToken, createNote);
router.put("/edit/:noteId/:userId", verifyToken, editNote);
router.get("/get/:userId", verifyToken, allNotes);

export default router;

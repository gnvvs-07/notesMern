import express from "express"
import { createNote, edit } from "../controllers/notes.controller.js";
import {verifyToken} from "../tokens/verifyToken.js";
const router = express.Router()
router.post("/create",verifyToken,createNote);
router.put("/edit/:notesId/:userId",verifyToken,edit);
export default router;
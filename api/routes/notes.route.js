import express from "express"
import { createNote } from "../controllers/notes.controller.js";
import {verifyToken} from "../tokens/verifyToken.js";
const router = express.Router()
router.post("/create",verifyToken,createNote);
export default router;
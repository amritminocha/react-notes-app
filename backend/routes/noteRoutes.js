const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {validateNotesRequest} = require("../middleware/validateRequest");
const noteService = require("../services/noteService");

const router = express.Router();

router.post("/", authMiddleware, validateNotesRequest, noteService.createNote);

router.delete("/:id", authMiddleware, noteService.deleteNote);

router.get("/", authMiddleware, noteService.getNotes);

module.exports = router;
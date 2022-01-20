"use strict";

const { Router } = require("express");

const {
    addNote,
    deleteNote,
    updateNote,
    getNoteById,
    getAllNotes,
    getStatNotes,
} = require("../controller/noteController.js");
const router = Router();


router.post("/notes", addNote);
router.delete("/notes/:id", deleteNote);
router.patch("/notes/:id", updateNote);
router.get("/notes/:id", getNoteById);
router.get("/notes", getAllNotes);
router.get("/notes/stats", getStatNotes);

module.exports = router;

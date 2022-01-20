'use strict'

const { testValidRequestBodyNote } = require("../valid/validate");
const {
    createNoteHelper,
    updateNoteHelper,
    deleteNoteHelper,
    getNoteByIdHelper,
    getAllNotesHelper,
    getStatNotesHelper,
} = require("./helper/helperNote");

async function addNote(req, res) {
    try {
        if (testValidRequestBodyNote(req.body)) {
            await createNoteHelper(req.body);
            return res.status(201).json(`Success Code "201 Created". Note in location`);
        }
        return res.status(400).json(`Client error -> Invalid note add request data`);
    } catch (err) {
        return res.status(500).json(`Server error -> ${err}`);
    }
}

async function updateNote(req, res) {
    try {
        if (testValidRequestBodyNote(req.body)) {
            await updateNoteHelper(req.params.id, req.body);
            return res.status(200).json(`Success Code "200 OK".`);
        }
        return res.status(400).json(`Client error -> Invalid note update request data`);
    } catch (err) {
        return res.status(500).json(`Server error -> ${err}`);
    }
}

async function deleteNote(req, res) {
    try {
        await deleteNoteHelper(req.params.id);
        return res.status(204).json(`Success Code: "204 No Content"`);
    } catch (err) {
        return res.status(500).json(`Server error -> ${err}`);
    }
}

async function getNoteById(req, res) {
    try {
        const note = await getNoteByIdHelper(req.params.id);
        return res.status(200).json(`Note: ${note}`);
    } catch (err) {
        return res.status(500).json(`Server error -> ${err}`);
    }
}

async function getAllNotes(req, res) {
    try {
        const notes = await getAllNotesHelper(req);
        return res.status(200).json(`Notes: ${notes}`);
    } catch (err) {
        return res.status(500).json(`Server error -> ${err}`);
    }
}

async function getStatNotes(req, res) {
    try {
        const stats = await getStatNotesHelper();
        return res.status(200).json(`Notes: ${stats}`);
    } catch (err) {
        return res.status(500).json(`Server error -> ${err}`);
    }
}

module.exports = { addNote, updateNote, deleteNote, getNoteById, getAllNotes, getStatNotes };

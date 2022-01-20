"use strict";

const note = require("../../../db/connection");

async function createNoteHelper(noteFieldValues) {
    try {
        await note.create({...noteFieldValues});
        return;
    } catch(err) {
        throw `Error create note -> ${err}`;
    }
}

async function updateNoteHelper(id, noteFieldValues) {
    try {
        await note.update({...noteFieldValues},
            {
                where: {
                    id: id,
                },
            }
        )
        return;
    } catch (err) {
        throw `Error update note -> ${err}`;
    }
}

async function deleteNoteHelper(id) {
    try {
        await note.destroy(
            {
                where: {
                    id: id,
                },
            })
        return;
    } catch (err) {
        throw `Error remove note -> ${err}`;
    }
}

async function getNoteByIdHelper(id) {
    try {
        const resNote = await note.findOne({id});

        if (resNote.length === 0) {
            throw `Note by id = ${id} doesn't exists`;
        }

        return resNote;
    } catch (err) {
        throw `Error get note by id=${id} -> ${err}`;
    }
}

async function getAllNotesHelper() {
    try {
        const allNotes = await note.findAll();
        return allNotes;   
    } catch (err) {
        throw `Error get all notes -> ${err}`;
    }
}

async function getStatNotesHelper() {
    try {
        const allNotes = await note.findAll();
        const availableCategory = ['Task', 'Thought', 'Idea'];
        const resStats = {};
        availableCategory.forEach((elem) => {
            let amountActiveNotes = 0;
            let amountArchiveNotes = 0;
            for (const item of allNotes) {
                if (item.status === "active" && item.category === elem) {
                    amountActiveNotes++;
                    continue;
                } else if (item.status === "archive" && item.category === elem) {
                    amountArchiveNotes++;
                    continue;
                }
            }
            resStats[elem] = { active: amountActiveNotes, archvie: amountArchiveNotes };
        });
        return resStats;
    } catch (err) {
        throw `Error get stats notes -> ${err}`;
    }
}

module.exports = {
    createNoteHelper,
    updateNoteHelper,
    deleteNoteHelper,
    getNoteByIdHelper,
    getAllNotesHelper,
    getStatNotesHelper,
};

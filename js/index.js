"use strict";

// import { createPost } from './html.js';

document.addEventListener('DOMContentLoaded', () => {
    class ModalWindow {
        constructor() {
            this.showModalWindowFlag = {
                'show': true,
                'hide': false,
            }

            this.tableCreateNoteButton = document.getElementById('table-button-create');
            this.modalCreateNoteButton = document.getElementById('create-note-button');
            this.modalCreateBlock = document.querySelector('.create-note');
            this.modalOverlayBlock = document.querySelector('.create-note__overlay');
        }

        showHideNoteModalWindow = (noteCreateWindow, flagCreate) => {
            if(flagCreate) { 
                noteCreateWindow.style.display = 'block';
                return;
            }
            noteCreateWindow.style.display = 'none';
            return;
        }

        createPost() {
            const contentRow = createPost();
            console.log(contentRow);
        }
    }
    
    const modal = new ModalWindow();

    modal.tableCreateNoteButton.addEventListener('click', () => {
        modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.show);
    })

    modal.modalOverlayBlock.addEventListener('click', () => {
        modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.hide);
    })

    modal.modalCreateNoteButton.addEventListener('click', () => {
        modal.createPost();
    })
})
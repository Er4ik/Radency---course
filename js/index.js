"use strict";

import { ModalWindow } from './modal-window.js';
import { Post, PostPivot } from './post.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = new ModalWindow();
    const post = new Post();
    const postPivot = new PostPivot();

    let postRow;

    const createStatus = () => {
        const buttonDelete = document.querySelector('.header-nav-hide');
        const status = buttonDelete.attributes.alt.value;
        return status;
    }
    
    if(Number(window.localStorage.length) === 1 || Number(window.localStorage.length) === 0) {
        window.localStorage.setItem('numPost', 0);
    }

    post.showPostFromLocalStorage('post');

    modal.tableCreateNoteButton.addEventListener('click', () => {
        modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.show);
    });

    modal.modalOverlayBlock.addEventListener('click', () => {
        modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.hide);
    });

    modal.modalCreateNoteButton.addEventListener('click', () => {
        const status = createStatus();
        modal.createEditPost(post.statusForStorage[status]);
        postPivot.showResulInTable();
    });
    
    post.tableContent.addEventListener('click', (button) => {
        const className = button.target.attributes.class.value;
        const status = createStatus();
        if(className === 'delete-post') {
            post.deletePost(button.target, post.statusForStorage[status]);
        }
        else if(className === 'edit-post') {
            postRow = post.editPost(button.target, post.statusForStorage[status]);
        }
        else if(className === 'archive-post') {
            post.archiveUnarchivePost(button.target, status);
        }
        postPivot.showResulInTable();
    })

    post.modalEditNoteButton.addEventListener('click', () => {
        const status = createStatus();
        post.createEditPost(postRow, post.statusForStorage[status]);
        postPivot.showResulInTable();
    })

    post.archiveOrActiveButton.addEventListener('click', () => {
        post.showArchiveOrActivePost(post.archiveOrActiveButton);
    })

    document.querySelectorAll('.archive-post').forEach(elem => {
        const status = createStatus();
        elem.addEventListener('click', () => {
            post.archiveUnarchivePost(button.target, status);
        })
    })

    postPivot.showResulInTable();

})
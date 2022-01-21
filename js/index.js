"use strict";

import { ModalWindow } from './modal-window.js';
import { Post, PostPivot } from './post.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = new ModalWindow();
    const post = new Post();
    const postPivot = new PostPivot();

    let postRow;
    
    if(Number(window.localStorage.length) === 1 || Number(window.localStorage.length) === 0) {
        window.localStorage.setItem('numPost', 0);
    }

    post.showPostFromLocalStorage('post');

    modal.tableCreateNoteButton.addEventListener('click', () => {
        try {
            modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.show);
        } catch (error) {
            
        }
    });

    modal.modalOverlayBlock.addEventListener('click', () => {
        modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.hide);
    });

    post.pivotOverlayBlock.addEventListener('click', () => {
        modal.showHideNoteModalWindow(post.modalEditBlock, modal.showModalWindowFlag.hide);
    });

    modal.modalCreateNoteButton.addEventListener('click', () => {
        const status = post.createStatus();
        modal.createEditPost(post.statusForStorage[status]);
        postPivot.showResulInTable();
    });
    
    post.tableContent.addEventListener('click', (button) => {
        const className = button.target.attributes.class.value;
        const status = post.createStatus();
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
        const status = post.createStatus();
        post.createEditPost(postRow, post.statusForStorage[status]);
        postPivot.showResulInTable();
    })

    post.archiveOrActiveButton.addEventListener('click', () => {
        post.showArchiveOrActivePost(post.archiveOrActiveButton);
    })

    document.querySelectorAll('.archive-post').forEach(elem => {
        const status = post.createStatus();
        elem.addEventListener('click', (button) => {
            post.archiveUnarchivePost(button.target, status);
        })
    })

    post.deleteAllPosts.addEventListener('click', () => {
        post.deleteAllPostFunc();
        postPivot.showResulInTable();
    })

    postPivot.showResulInTable();

})
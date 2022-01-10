"use strict";

import { ModalWindow } from './modal-window.js';
import { Post, PostPivot } from './post.js';

document.addEventListener('DOMContentLoaded', () => {
    const modal = new ModalWindow();
    const post = new Post();
    const postPivot = new PostPivot();

    let postRow;
    
    if(Number(window.localStorage.getItem('numPost')) === 0) {
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
        const buttonDelete = document.querySelector('.header-nav-hide');
        const status = buttonDelete.attributes.alt.value;
        // вынести 2 строки верхние в отедльную функцию везде
        modal.createEditPost(post.statusForStorage[status]);
    });
    
    post.tableContent.addEventListener('click', (button) => {
        const className = button.target.attributes.class.value;
        const buttonDelete = document.querySelector('.header-nav-hide');
        const status = buttonDelete.attributes.alt.value;
        if(className === 'delete-post') {
            post.deletePost(button.target, post.statusForStorage[status]);
        }
        else if(className === 'edit-post') {
            postRow = post.editPost(button.target, post.statusForStorage[status]);
        }
        else if(className === 'archive-post') {
            postRow = post.archivePost(button.target);
        }
    })

    post.modalEditNoteButton.addEventListener('click', () => {
        const buttonDelete = document.querySelector('.header-nav-hide');
        const status = buttonDelete.attributes.alt.value;
        post.createEditPost(postRow, post.statusForStorage[status]);
    })

    post.archiveOrActiveButton.addEventListener('click', () => {
        post.showArchiveOrActivePost(post.archiveOrActiveButton);
    })

    // postPivot.calculateAmountActive();
})
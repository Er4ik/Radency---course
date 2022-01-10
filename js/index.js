"use strict";

import { createPostRow } from './html.js';

document.addEventListener('DOMContentLoaded', () => {
    class ModalWindow {
        constructor() {
            this.showModalWindowFlag = {
                'show': true,
                'hide': false,
            }

            this.months = ['January', 'February', 'March', 'April', 'May', 
            'June', 'July', 'August', 'September', 'October', 
            'November', 'December'];

            this.tableCreateNoteButton = document.getElementById('table-button-create');
            this.modalCreateNoteButton = document.getElementById('create-note-button');
            this.modalCreateBlock = document.querySelector('.create-note');
            this.modalOverlayBlock = document.querySelector('.create-note__overlay');
            this.postContent = document.querySelectorAll('.post-value');
            this.tableContent = document.querySelector('.table__content');
        }

        showHideNoteModalWindow = (noteCreateWindow, flagCreate) => {
            this.clearModalFields();
            if(flagCreate) { 
                noteCreateWindow.style.display = 'block';
                return;
            }
            noteCreateWindow.style.display = 'none';
            return;
        }

        dateNow() {
            const Data = new Date();
            const year = Data.getFullYear();
            const month = Data.getMonth();
            const day = Data.getDate();
            return `${year} ${this.months[month]} ${day}`
        }

        addPostRowToBLockContent(row) {
            this.tableContent.innerHTML += row;
            return;
        }

        createObjectFieldsForPostRow(postContent) {
            const postParams = {};

            postContent.forEach(elem => {
                postParams[elem.attributes.name.value] = elem.value;
            })

            postParams['index'] =  Number(window.localStorage.getItem('numPost')) + 1;
            postParams['pathToIcon'] = `./picture/icon-${postParams['category']}.png`;
            postParams['date'] = this.dateNow();
            console.log(postParams);
            return postParams;
        }

        clearModalFields() {
            this.postContent.forEach(elem => {
                if(elem.attributes.name === 'category') {
                    elem.options[elem.selectedIndex].value = '';
                }
                elem.value = '';
            })
            return;
        }

        addDataPostToLocalStorage(postData) {
            const myStorage = window.localStorage;
            const arrPostData = Object.keys(postData).map((key) => [key, postData[key]]);
            myStorage.setItem(`post${postData.index}`, arrPostData);
            myStorage.setItem('numPost', postData.index);
            return;
        }

        deleteFromStoreOnIndex(index) {
            window.localStorage.removeItem(`post${index}`);
            return;
        }

        createEditPost() {
            const paramsPostRow = modal.createObjectFieldsForPostRow(this.postContent);
            this.addDataPostToLocalStorage(paramsPostRow);
            const contentRow = createPostRow(paramsPostRow.pathToIcon, paramsPostRow.name, 
                paramsPostRow.date, paramsPostRow.category, paramsPostRow.content,
                paramsPostRow.date, paramsPostRow.index);
            this.addPostRowToBLockContent(contentRow);
            this.clearModalFields();
            this.showHideNoteModalWindow(this.modalCreateBlock, this.showModalWindowFlag.hide)
            return;
        }
    }
    
    const modal = new ModalWindow();

    if(window.localStorage.length === 0) {
        window.localStorage.setItem('numPost', 0);
    }

    modal.tableCreateNoteButton.addEventListener('click', () => {
        modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.show);
    });

    modal.modalOverlayBlock.addEventListener('click', () => {
        modal.showHideNoteModalWindow(modal.modalCreateBlock, modal.showModalWindowFlag.hide);
    });

    modal.modalCreateNoteButton.addEventListener('click', () => {
        modal.createEditPost();
    });

    class Post extends ModalWindow {
        constructor() {
            super();
            this.tableContent = document.querySelector('.table__content_main');
            this.modalEditBlock = document.querySelector('.edit-note');
            this.modalEditNoteButton = document.getElementById('edit-note-button');
            this.postContentEdit = document.querySelectorAll('.post-value-edit')
        }

        checkLocalStorage() {
            return Object.keys(localStorage)
                .reduce((obj, key) => {
                    return { ...obj, [key]: localStorage.getItem(key)}
                }, {});
        }

        prepareDataMatrixFromStorage(dataFromStorage) {
            const matrixDataPost = [];
            for(const key in dataFromStorage) {
                if(key === 'numPost') continue;
                const arrDataPost = dataFromStorage[key].split(',');
                matrixDataPost.push(arrDataPost);
            }
            return matrixDataPost;
        }

        createObjectFieldsForPostRow(arrDataPost) {
            const postDataObj = {};
            for(let iter = 0; iter < arrDataPost.length; iter += 2) {
                postDataObj[arrDataPost[iter]] = arrDataPost[iter + 1];
            }
            return postDataObj;
        }

        showPostFromLocalStorage() {
            if(Number(window.localStorage.getItem('numPost')) > 0) {
                const dataFromStorage = this.checkLocalStorage();
                const matrixData = this.prepareDataMatrixFromStorage(dataFromStorage);
                matrixData.forEach(elem => {
                    const resPostData = this.createObjectFieldsForPostRow(elem);
                    const contentRow = createPostRow(resPostData.pathToIcon, resPostData.name, 
                        resPostData.date, resPostData.category, resPostData.content,
                        resPostData.date, resPostData.index);
                    super.addPostRowToBLockContent(contentRow);
                })
            }
        }

        deleteFromStorage(postRow) {
            const storage = window.localStorage;
            const indexStorage = postRow.dataset.storageIndex;
            this.deleteFromStoreOnIndex(indexStorage);
            return;
        }

        deleteFromHTML(postRow) {
            const parent = postRow.closest('.table__content');
            parent.removeChild(postRow);
            return;
        }

        deletePost(button) {
            const postRow = button.closest('.table__content_row');
            this.deleteFromStorage(postRow);
            this.deleteFromHTML(postRow);
            return;
        }

        addValueToModalFields(postRow) {
            const indexStorage = postRow.dataset.storageIndex;
            const dataFromStorage = this.checkLocalStorage()[`post${indexStorage}`].split(',');
            const objDataFromStorage = this.createObjectFieldsForPostRow(dataFromStorage);
            this.postContentEdit.forEach(elem => {
                const nameValue = elem.attributes.name.value;
                elem.value = objDataFromStorage[nameValue];
            })
            return;
        }

        createEditPost(postRow) {
            this.deletePost(postRow);
            const paramsPostRow = super.createObjectFieldsForPostRow(this.postContentEdit);
            this.addDataPostToLocalStorage(paramsPostRow);
            const contentRow = createPostRow(paramsPostRow.pathToIcon, paramsPostRow.name, 
                paramsPostRow.date, paramsPostRow.category, paramsPostRow.content,
                paramsPostRow.date, paramsPostRow.index);
            this.addPostRowToBLockContent(contentRow);
            this.clearModalFields();
            this.showHideNoteModalWindow(this.modalEditBlock, this.showModalWindowFlag.hide)
            return;
        }

        editPost(button) {
            const postRow = button.closest('.table__content_row');
            this.addValueToModalFields(postRow);
            this.showHideNoteModalWindow(this.modalEditBlock, this.showModalWindowFlag.show);
            return postRow;
        }
    }

    const post = new Post();

    post.showPostFromLocalStorage();

    let postRow;
    
    post.tableContent.addEventListener('click', (button) => {
        const className = button.target.attributes.class.value;
        if(className === 'delete-post') {
            post.deletePost(button.target);
        }
        else if(className === 'edit-post') {
            postRow = post.editPost(button.target);
        }
    })

    post.modalEditNoteButton.addEventListener('click', () => {
        post.createEditPost(postRow);
    })
})
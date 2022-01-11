import { createPostRow } from './html.js';

export class ModalWindow {
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

    showHideNoteModalWindow(noteCreateWindow, flagCreate) {
        this.clearModalFields(this.postContent);
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
        postParams['date'] = this.dateNow();
        return postParams;
    }

    clearModalFields(content) {
        content.forEach(elem => {
            if(elem.attributes.name === 'category') {
                elem.options[elem.selectedIndex].value = '';
            }
            elem.value = '';
        })
        return;
    }

    addDataPostToLocalStorage(postData, status) {
        const myStorage = window.localStorage;
        const arrPostData = Object.keys(postData).map((key) => [key, postData[key]]);
        myStorage.setItem(`${status}${postData.index}`, arrPostData);
        myStorage.setItem('numPost', postData.index);
        return;
    }

    deleteFromStoreOnIndex(index, status) {
        window.localStorage.removeItem(`${status}${index}`);
        return;
    }

    createEditPost(status) {
        const paramsPostRow = this.createObjectFieldsForPostRow(this.postContent);
        this.addDataPostToLocalStorage(paramsPostRow, status);
        const contentRow = createPostRow(paramsPostRow.name, 
            paramsPostRow.date, paramsPostRow.category, paramsPostRow.content,
            paramsPostRow.date, paramsPostRow.index);
        this.addPostRowToBLockContent(contentRow);
        this.clearModalFields(this.postContent);
        this.showHideNoteModalWindow(this.modalCreateBlock, this.showModalWindowFlag.hide)
        return;
    }
}
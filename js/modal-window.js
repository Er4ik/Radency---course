import { createPostRow } from './html.js';
import { validateFieldModal } from './valid.js';

export class ModalWindow {
    constructor() {
        this.showModalWindowFlag = {
            'show': true,
            'hide': false,
        }

        this.displayVisibility = {
            none: 'none',
            block: 'block'
        }

        this.numbersPost = 'numPost';

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
        try {
            this.clearModalFields(this.postContent);
            if(flagCreate) { 
                noteCreateWindow.style.display = this.displayVisibility.block;
                return;
            }
            noteCreateWindow.style.display = this.displayVisibility.none;
            return;   
        } catch (error) {
            throw new Error(`Error show/hide modal window -> ${error}`);
        }
    }

    dateNow() {
        try {
            const Data = new Date();
            const year = Data.getFullYear();
            const month = Data.getMonth();
            const day = Data.getDate();
            return `${year} ${this.months[month]} ${day}`;   
        } catch (error) {
            throw new Error(`Error date now -> ${error}`);
        }
    }

    addPostRowToBLockContent(row) {
        try {
            this.tableContent.innerHTML += row;
            return;
        } catch (error) {
            throw new Error(`Error add post to html -> ${error}`);
        }
    }

    checkDateFromContent(content) {
        const rxDate = /\d{1,2}\/\d{1,2}\/\d{4}/;
        const dates = [];
        content.split(' ').forEach(elem => {
            const value = elem.match(rxDate);
            if(value) dates.push(value);
        })
        return dates.join(', ');
    }

    createObjectFieldsForPostRow(postContent) {
        try {
            const postParams = {};

            postContent.forEach(elem => {
                postParams[elem.attributes.name.value] = elem.value;
            })

            postParams['index'] =  Number(window.localStorage.getItem('numPost')) + 1;
            postParams['date'] = this.dateNow();
            postParams['dateContent'] = this.checkDateFromContent(postParams['content']);
            
            return postParams;
        } catch (error) {
            throw new Error(`Error create object field -> ${error}`);
        }

    }

    clearModalFields(content) {
        try {
            content.forEach(elem => {
                if(elem.attributes.name === 'category') {
                    elem.options[elem.selectedIndex].value = '';
                }
                elem.value = '';
            })
            return;   
        } catch (error) {
            throw new Error(`Error clear modal fields -> ${error}`);
        }
    }

    addDataPostToLocalStorage(postData, status) {
        try {
            const myStorage = window.localStorage;
            const arrPostData = Object.keys(postData).map((key) => [key, postData[key]]);
            myStorage.setItem(`${status}${postData.index}`, arrPostData);
            myStorage.setItem(this.numbersPost, postData.index);
            return;   
        } catch (error) {
            throw new Error(`Error add post to local storage -> ${error}`);
        }
    }

    deleteFromStoreOnIndex(index, status) {
        try {
            window.localStorage.removeItem(`${status}${index}`);
            return;   
        } catch (error) {
            throw new Error(`Error delete from storage -> ${error}`);
        }
    }

    createEditPost(status) {
        try {
            const paramsPostRow = this.createObjectFieldsForPostRow(this.postContent);
            for(const key in paramsPostRow) {
                if(!validateFieldModal(paramsPostRow[key], key)) return false;
            }
            this.addDataPostToLocalStorage(paramsPostRow, status);
            const contentRow = createPostRow(paramsPostRow.name, 
                paramsPostRow.date, paramsPostRow.category, paramsPostRow.content,
                paramsPostRow.date, paramsPostRow.index, paramsPostRow.dateContent);
            this.addPostRowToBLockContent(contentRow);
            this.clearModalFields(this.postContent);
            this.showHideNoteModalWindow(this.modalCreateBlock, this.showModalWindowFlag.hide)
            return;   
        } catch (error) {
            throw new Error(`Error create/edit post -> ${error}`);
        }
    }
}
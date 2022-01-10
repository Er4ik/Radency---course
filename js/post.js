import { createPostRow } from './html.js';
import { ModalWindow } from './modal-window.js';

export class Post extends ModalWindow {
    constructor() {
        super();

        this.statusOpposite = {
            'active': 'archive',
            'archive': 'active'
        }

        this.statusForStorage = {
            'active': 'post',
            'archive': 'hide'
        }

        this.tableContent = document.querySelector('.table__content_main');
        this.modalEditBlock = document.querySelector('.edit-note');
        this.modalEditNoteButton = document.getElementById('edit-note-button');
        this.postContentEdit = document.querySelectorAll('.post-value-edit');
        this.archiveOrActiveButton = document.querySelector('.header-nav-hide');
    }

    checkLocalStorage() {
        return Object.keys(localStorage)
            .reduce((obj, key) => {
                return { ...obj, [key]: localStorage.getItem(key)}
            }, {});
    }

    prepareDataMatrixFromStorage(status, dataFromStorage) {
        const matrixDataPost = [];
        for(const key in dataFromStorage) {
            if(!key.includes(status)) continue;
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

    showPostFromLocalStorage(status) {
        if(Number(window.localStorage.getItem('numPost')) > 0) {
            const dataFromStorage = this.checkLocalStorage();
            const matrixData = this.prepareDataMatrixFromStorage(status, dataFromStorage);
            matrixData.forEach(elem => {
                const resPostData = this.createObjectFieldsForPostRow(elem);
                const contentRow = createPostRow(resPostData.pathToIcon, resPostData.name, 
                    resPostData.date, resPostData.category, resPostData.content,
                    resPostData.date, resPostData.index);
                super.addPostRowToBLockContent(contentRow);
            })
        }
    }

    deleteFromStorage(postRow, status) {
        const indexStorage = postRow.dataset.storageIndex;
        super.deleteFromStoreOnIndex(indexStorage, status);
        return;
    }

    deleteFromHTML(postRow) {
        const parent = postRow.closest('.table__content');
        parent.removeChild(postRow);
        return;
    }

    deletePost(button, status) {
        const postRow = button.closest('.table__content_row');
        this.deleteFromStorage(postRow, status);
        this.deleteFromHTML(postRow);
        return;
    }

    addValueToModalFields(postRow, status) {
        console.log(status);
        const indexStorage = postRow.dataset.storageIndex;
        const dataFromStorage = this.checkLocalStorage()[`${status}${indexStorage}`].split(',');
        const objDataFromStorage = this.createObjectFieldsForPostRow(dataFromStorage);
        this.postContentEdit.forEach(elem => {
            const nameValue = elem.attributes.name.value;
            elem.value = objDataFromStorage[nameValue];
        })
        return;
    }

    createEditPost(postRow, status) {
        this.deletePost(postRow, status);
        const paramsPostRow = super.createObjectFieldsForPostRow(this.postContentEdit);
        super.addDataPostToLocalStorage(paramsPostRow, status);
        const contentRow = createPostRow(paramsPostRow.pathToIcon, paramsPostRow.name, 
            paramsPostRow.date, paramsPostRow.category, paramsPostRow.content,
            paramsPostRow.date, paramsPostRow.index);
        super.addPostRowToBLockContent(contentRow);
        super.clearModalFields();
        super.showHideNoteModalWindow(this.modalEditBlock, this.showModalWindowFlag.hide)
        return;
    }

    editPost(button, status) {
        const postRow = button.closest('.table__content_row');
        this.addValueToModalFields(postRow, status);
        super.showHideNoteModalWindow(this.modalEditBlock, this.showModalWindowFlag.show);
        return postRow;
    }



    archivePost(button) {
        const postRow = button.closest('.table__content_row');
        const indexStorage = postRow.dataset.storageIndex;
        const dataFromStorage = window.localStorage.getItem(`${this.statusForStorage.active}${indexStorage}`)
        this.deletePost(button, this.statusForStorage.active);
        window.localStorage.setItem(`${this.statusForStorage.archive}${indexStorage}`, dataFromStorage);
        return;
    }

    showArchiveOrActivePost(button) {
        const status = button.attributes.alt.value;
        this.tableContent.innerHTML = '';
        this.showPostFromLocalStorage(this.statusForStorage[this.statusOpposite[status]]);
        button.attributes.alt.value = this.statusOpposite[status];
        button.attributes.src.value = `./picture/icon-${status}.png`;
        return;
    }
}

export class PostPivot extends Post {
    constructor() {
        super();
    }

    calculateAmountActive() {
        const activePosts = document.querySelectorAll('.table__content_row');
        const amountActivePosts = activePosts.length;
        return amountActivePosts;
    }
}

const postPivot = new PostPivot();
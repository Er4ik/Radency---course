import { createPostRow, createPivotPostRow } from './html.js';
import { ModalWindow } from './modal-window.js';
import { validateFieldModal } from './valid.js';

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

        this.zeroAmountPosts = 0;

        this.deleteAllPosts = document.querySelector('.delete-nav-head');
        this.pivotOverlayBlock = document.querySelector('.edit-note__overlay');
        this.tableContent = document.querySelector('.table__content_main');
        this.modalEditBlock = document.querySelector('.edit-note');
        this.modalEditNoteButton = document.getElementById('edit-note-button');
        this.postContentEdit = document.querySelectorAll('.post-value-edit');
        this.archiveOrActiveButton = document.querySelector('.header-nav-hide');
    }

    createStatus = () => {
        try {
            const buttonDelete = document.querySelector('.header-nav-hide');
            const status = buttonDelete.attributes.alt.value;
            return status;
        } catch (error) {
            throw new Error(`Error create status -> ${error}`);
        }
    }

    checkLocalStorage() {
        try {
            return Object.keys(localStorage)
                .reduce((obj, key) => {
                    return { ...obj, [key]: localStorage.getItem(key)}
                }, {});   
        } catch (error) {
            throw new Error(`Error check local-storage -> ${error}`);
        }
    }

    prepareDataMatrixFromStorage(status, dataFromStorage) {
        try {
            const matrixDataPost = [];
            for(const key in dataFromStorage) {
                if(!key.includes(status)) continue;
                const arrDataPost = dataFromStorage[key].split(',');
                matrixDataPost.push(arrDataPost);
            }
            return matrixDataPost;   
        } catch (error) {
            throw new Error(`Error prepare data from storage -> ${error}`);
        }
    }

    createObjectFieldsForPostRow(arrDataPost) {
        try {
            const postDataObj = {};
            for(let iter = 0; iter < arrDataPost.length; iter += 2) {
                postDataObj[arrDataPost[iter]] = arrDataPost[iter + 1];
            }
            return postDataObj;   
        } catch (error) {
            throw new Error(`Error create object post -> ${error}`);
        }
    }

    showPostFromLocalStorage(status) {
        try {
            if(Number(window.localStorage.getItem(this.numbersPost)) > this.zeroAmountPosts) {
                const dataFromStorage = this.checkLocalStorage();
                const matrixData = this.prepareDataMatrixFromStorage(status, dataFromStorage);
                matrixData.forEach(elem => {
                    const resPostData = this.createObjectFieldsForPostRow(elem);
                    const contentRow = createPostRow(resPostData.name, 
                        resPostData.date, resPostData.category, resPostData.content,
                        resPostData.date, resPostData.index, resPostData.dateContent);
                    super.addPostRowToBLockContent(contentRow);
                })
            }            
        } catch (error) {
            throw new Error(`Error show post from local storage -> ${error}`);
        }
    }

    deleteFromStorage(postRow, status) {
        try {
            const indexStorage = postRow.dataset.storageIndex;
            super.deleteFromStoreOnIndex(indexStorage, status);
            return;   
        } catch (error) {
            throw new Error(`Error delete from storage -> ${error}`)
        }
    }

    deleteFromHTML(postRow) {
        try {
            const parent = postRow.closest('.table__content');
            parent.removeChild(postRow);
            return;   
        } catch (error) {
            throw new Error(`Error delete from HTML -> ${error}`);
        }
    }

    deletePost(button, status) {
        try {
            let postRow = button; 
            if(button.attributes.class.value !== 'table__content_row') postRow = button.closest('.table__content_row');
            this.deleteFromStorage(postRow, status);
            this.deleteFromHTML(postRow);
            return;   
        } catch (error) {
            throw new Error(`Error delete post -> ${error}`);
        }
    }

    deleteAllPostFunc() {
        this.tableContent.innerHTML = '';
        const dataFromStorage = this.checkLocalStorage();
        const status = this.createStatus();
        for(const key in dataFromStorage) {
            if(key.includes(`${this.statusForStorage[status]}`)) {
                window.localStorage.removeItem(key);
            }
        }
        return;
    }

    addValueToModalFields(postRow, status) {
        try {
            const indexStorage = postRow.dataset.storageIndex;
            const dataFromStorage = this.checkLocalStorage()[`${status}${indexStorage}`].split(',');
            const objDataFromStorage = this.createObjectFieldsForPostRow(dataFromStorage);
            this.postContentEdit.forEach(elem => {
                const nameValue = elem.attributes.name.value;
                elem.value = objDataFromStorage[nameValue];
            })
            return;   
        } catch (error) {
            throw new Error(`Error add value to modal fields -> ${error}`);
        }
    }

    createEditPost(postRow, status) {
        try {
            const paramsPostRow = super.createObjectFieldsForPostRow(this.postContentEdit);
            for(const key in paramsPostRow) {
                if(!validateFieldModal(paramsPostRow[key], key)) return false;
            }
            this.deletePost(postRow, status);
            super.addDataPostToLocalStorage(paramsPostRow, status);
            const contentRow = createPostRow(paramsPostRow.name, 
                paramsPostRow.date, paramsPostRow.category, paramsPostRow.content,
                paramsPostRow.date, paramsPostRow.index, paramsPostRow.dateContent);
            super.addPostRowToBLockContent(contentRow);
            super.clearModalFields(this.postContent);
            super.showHideNoteModalWindow(this.modalEditBlock, this.showModalWindowFlag.hide)
            return;   
        } catch (error) {
            throw new Error(`Error create or edit post -> ${error}`);
        }
    }

    editPost(button, status) {
        try {
            const postRow = button.closest('.table__content_row');
            this.addValueToModalFields(postRow, status);
            super.showHideNoteModalWindow(this.modalEditBlock, this.showModalWindowFlag.show);
            return postRow;   
        } catch (error) {
            throw new Error(`Error edit post -> ${error}`);
        }
    }



    archiveUnarchivePost(button, status) {
        try {
            const postRow = button.closest('.table__content_row');
            const indexStorage = postRow.dataset.storageIndex;
            const dataFromStorage = window.localStorage.getItem(`${this.statusForStorage[status]}${indexStorage}`)
            this.deletePost(button, this.statusForStorage[status]);
            window.localStorage.setItem(`${this.statusForStorage[this.statusOpposite[status]]}${indexStorage}`, dataFromStorage);
            return;
        } catch (error) {
            throw new Error(`Error archive or unarchive post -> ${error}`);
        }
    }

    changeButtonAttributes(button, status) {
        try {
            button.attributes.alt.value = this.statusOpposite[status];
            button.attributes.src.value = `./picture/icon-${status}.png`;
            return;   
        } catch (error) {
            throw new Error(`Error change attribute -> ${error}`);
        }
    }

    showArchiveOrActivePost(button) {
        try {
            const status = button.attributes.alt.value;
            this.tableContent.innerHTML = '';
            this.showPostFromLocalStorage(this.statusForStorage[this.statusOpposite[status]]);
            this.changeButtonAttributes(button, status);
            document.querySelectorAll('.archive-post').forEach(elem => {
                elem.attributes.src.value = `./picture/icon-${status}.png`;
            })
            return;
        } catch (error) {
            throw new Error(`Error show post -> ${error}`);
        }

    }
}

export class PostPivot extends Post {
    constructor() {
        super();
        this.statusPost = {
            hide: 'hide',
            active: 'post'
        }
        this.pivotContent = document.querySelector('.table__content_pivot');
        this.arrCategory = ['Task', 'Idea', 'Thought']
    }

    calculateAmountPost(category) {
        try {
            const dataFromStorage = this.checkLocalStorage();
            let amountActive = 0;
            let amountArchive = 0;
            for(const key in dataFromStorage) {
                if(dataFromStorage[key].includes(category)) {
                    if(key.includes(this.statusPost.active)) {
                        amountActive++;
                        continue;
                    }
                    else if(key.includes(this.statusPost.hide)) {
                        amountArchive++;
                        continue;
                    }
                }
            }

            return { active: amountActive, archive: amountArchive };   
        } catch (error) {
            throw new Error(`Error calculate amount post -> ${error}`);
        }
    }

    showResulInTable() {
        try {
            let resHtmlToTable = '';
            this.arrCategory.forEach(elem => {
                const resAmountStatus = this.calculateAmountPost(elem);
                const htmlToTable = createPivotPostRow(elem, resAmountStatus.active, resAmountStatus.archive);
                resHtmlToTable += htmlToTable;
            })
            this.pivotContent.innerHTML = resHtmlToTable;
            return;   
        } catch (error) {
            throw new Error(`Error show result table post -> ${error}`);
        }
    }
}
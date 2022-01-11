export function createPostRow(name, dateCreated, category, content, date, index, dateContent) {
    try {
        const tableContentRow = `
            <div class="table__content_row" data-storage-index="${index}">
                <div class="content-icon">
                    <img src="./picture/icon-${category}.png" alt="icon">
                </div>
                <div class="content" data-content="name">
                    <p>${name}</p>
                </div>
                <div class="content" data-content="created">
                    <p>${dateCreated}</p>
                </div>
                <div class="content" data-content="category">
                    <p>${category}</p>
                </div>
                <div class="content" data-content="content">
                    <p>${content}</p>
                </div>
                <div class="content" data-content="date">
                    <p>${dateContent}</p>
                </div>
                <div class="content-nav">
                    <img class='edit-post' src="./picture/icon-edit.png" alt="edit">
                    <img class='archive-post' src="./picture/icon-archive.png" alt="archive">
                    <img class='delete-post' src="./picture/icon-delete.png" alt="delete">
                </div>
            </div>
        `

        return tableContentRow;
    } catch (error) {
        throw new Error(`Error create post row -> ${error}`);
    }

}

export function createPivotPostRow(category, amountActive, amountArchive) {
    try {
        const tableContentRow = `
            <div class="table__content_row">
                <div class="content-icon">
                    <img src="./picture/icon-${category}.png" alt="picture">
                </div>
                <div class="content pivot-content" data-content="name">
                    <p>${category}</p>
                </div>
                <div class="content pivot-content" data-content="created">
                    <p>${amountActive}</p>
                </div>
                <div class="content pivot-content" data-content="category">
                    <p>${amountArchive}</p>
                </div>
            </div>
        `

        return tableContentRow;
    } catch (error) {
        throw new Error(`Error create pivot post row -> ${error}`);
    }
}

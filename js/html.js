export function createPost(...fields) {
    const { pathToIcon, name, dateCreated, category, content, date } = fields;
    
    const tableContentRow = `
        <div class="table__content_row">
            <div class="content-icon">
                <img src="${pathToIcon}" alt="icon">
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
                <p>${date}</p>
            </div>
            <div class="content-nav">
                <img src="./picture/icon-edit.png" alt="edit">
                <img src="./picture/icon-archive.png" alt="archive">
                <img src="./picture/icon-delete.png" alt="delete">
            </div>
        </div>
    `

    return tableContentRow;
}



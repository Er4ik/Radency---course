import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayShow, iconCategory, oppositeTableStatus, reducerCase, tableStatus } from "../../types";
import iconDelete from "../../picture/icon-delete.png";
import iconActive from "../../picture/icon-active.png";
import iconArchive from "../../picture/icon-archive.png";
import iconEdit from "../../picture/icon-edit.png";

export default function ContentColumnData({ elem, showHideModal }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const fillFieldsModalEdit = (fieldsValues, formEdit) => {
    for (const elem of formEdit) {
      elem.value = fieldsValues[elem.name];
    }
  };

  const editPost = (elem) => {
    const posts =
      state.headerPost.status === tableStatus.active ? state.hide : state.post;
    const modal = document.querySelector(".edit-note");
    const formEdit = document.querySelector(".edit-note__modal");
    const index = posts.indexOf(elem);
    modal.attributes.dataIndex = index;
    fillFieldsModalEdit(posts[index], formEdit);
    showHideModal(modal, displayShow.SHOW);
  }

  const archiveUnArchivePost = (post, status) => {
    if(status === tableStatus.archive) dispatch({ type: reducerCase.ARCHIVE_POST, payload: post });
    else if(status === tableStatus.active) dispatch({ type: reducerCase.UNARCHIVE_POST, payload: post });
  };

  const deletePost = (post) => {
    const status = state.headerPost.status;
    dispatch({type: reducerCase.DELETE_POST, payload: {post, status}});
    return;
  };

  return (
    <div className="table__content_row" data-storage-index={elem.index}>
      <div className="content-icon">
        <img src={iconCategory[elem.category]} alt="icon" />
      </div>
      <div className="content" data-content="name">
        <p>{elem.name}</p>
      </div>
      <div className="content" data-content="created">
        <p>{elem.date}</p>
      </div>
      <div className="content" data-content="category">
        <p>{elem.category}</p>
      </div>
      <div className="content" data-content="content">
        <p>{elem.content}</p>
      </div>
      <div className="content" data-content="date">
        <p>{elem.dateContent}</p>
      </div>
      <div className="content-nav">
        <img
          className="edit-post"
          src={iconEdit}
          alt="edit"
          onClick={() => editPost(elem)}
        />
        <img
          className="archive-post"
          src={
            state.headerPost.status === tableStatus.active
              ? iconActive
              : iconArchive
          }
          alt={state.headerPost.status}
          onClick={() => archiveUnArchivePost(elem, state.headerPost.status)}
        />
        <img
          className="delete-post"
          src={iconDelete}
          alt="delete"
          onClick={() => deletePost(elem)}
        />
      </div>
    </div>
  );
}

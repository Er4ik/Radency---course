import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayShow, iconCategory, reducerCase, tableStatus } from "../../types";
import iconDelete from "../../picture/icon-delete.png";
import iconActive from "../../picture/icon-active.png";
import iconArchive from "../../picture/icon-archive.png";
import iconEdit from "../../picture/icon-edit.png";

export default function ContentColumnData({ elem, showHideModal }) {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const tableStatusNow = document.querySelector('.header-nav-hide').attributes.alt;

  const checkEditPost = (index) => {
    for (const elem of state.post) {
      if (elem.index === index) return elem;
    }
  };

  const fillFieldsModalEdit = (fieldsValues, formEdit) => {
    for (const elem of formEdit) {
      elem.value = fieldsValues[elem.name];
    }
  };

  const editPost = (elem) => {
    const modal = document.querySelector(".edit-note");
    const formEdit = document.querySelector(".edit-note__modal");
    const postExists = checkEditPost(elem.index);
    fillFieldsModalEdit(postExists, formEdit);
    showHideModal(modal, displayShow.SHOW);
  }

  const archivePost = (elem) => {
    // dispatch({type: reducerCase.ARCHIVE_POST, payload: elem})
  }

  const deletePost = (post) => {
    dispatch({type: reducerCase.DELETE_POST, payload: post});
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
          src={tableStatusNow === tableStatus.active ? iconActive: iconArchive }
          alt={tableStatusNow}
          onClick={archivePost(elem)}
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

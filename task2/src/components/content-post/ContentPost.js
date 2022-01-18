import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayShow, months, reducerCase, tableStatus } from "../../types";
import ContentColumnData from "./ContentFiled";
 
export default function ContentPost() {

  const validateFieldModal = (contentFromModalFields) => {
    try {
      const availableDataFiledCategory = ["Idea", "Thought", "Task"];
      for (const key in contentFromModalFields) {
        if (!contentFromModalFields[key] && key !== "dateContent") return false;
        else if (
          key === "category" &&
          !availableDataFiledCategory.includes(contentFromModalFields[key])
        )
          return false;
      } 
      return true;
    } catch (error) {
      throw new Error(`Error validate ${error}`);
    }
  };

  const showHideModal = (modal, status) => {
    modal.style.display = status;
  };

  const dateNow = () => {
    const Data = new Date();
    const year = Data.getFullYear();
    const month = Data.getMonth();
    const day = Data.getDate();
    return `${year} ${months[month]} ${day}`;
  };

  const checkDateFromContent = (content) => {
    const rxDate = /\d{1,2}\/\d{1,2}\/\d{4}/;
    const dates = [];
    content.split(" ").forEach((elem) => {
      const value = elem.match(rxDate);
      if (value) dates.push(value);
    });
    return dates.join(", ");
  };

  const prepareDataFromModal = (formBtns) => {
    const resFields = {};
    for (const elem of formBtns) {
      if (elem.className === "post-value") {
        resFields[elem.name] = elem.value;
      } 
    }
    resFields.date = dateNow();
    resFields.dateContent = checkDateFromContent(resFields.content);
    return resFields;
  };

  const handlerPost = (modalWindow, form, reducer) => {
    const formBtns = form.elements;
    const index = modalWindow.attributes.dataIndex;
    const contentFromModalFields = prepareDataFromModal(formBtns);
    if(validateFieldModal(contentFromModalFields)) {
      const status = state.headerPost.status;
      dispatch({
        type: reducer,
        payload: { contentFromModalFields, status, index },
      });
      showHideModal(modalWindow, displayShow.HIDE);
      form.reset();
    }
  }

  const createPost = (event) => {
    event.preventDefault();
    const modalCreateWindow = document.querySelector(".create-note");
    const form = document.querySelector(".create-note__modal");
    handlerPost(modalCreateWindow, form, reducerCase.ADD_POST);
    return;
  };

  const editPost = (event) => {
    event.preventDefault();
    const modalEditWindow = document.querySelector(".edit-note");
    const formEdit = document.querySelector(".edit-note__modal");
    handlerPost(modalEditWindow, formEdit, reducerCase.EDIT_POST);
    return;
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let counterPosts = 0;
  const showPosts = state.headerPost.status === tableStatus.active ? state.hide : state.post;

  return (
    <section>
      <div className="table__content table__content_main">
        {
        showPosts.map((elem) => {
          return (
            <ContentColumnData
              elem={elem}
              showHideModal={showHideModal}
              key={counterPosts++}
            />
          );
        })
        }
        <div id="table-button-create">
          <button
            onClick={() =>
              showHideModal(
                document.querySelector(".create-note"),
                displayShow.SHOW
              )
            }
          >
            Create Note
          </button>
        </div>
      </div>
      <div className="create-note">
        <form className="create-note__modal" onSubmit={createPost}>
          <input
            className="post-value"
            type="text"
            name="name"
            placeholder="Name"
          />
          <select className="post-value" name="category">
            <option value="Task">Task</option>
            <option value="Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <input
            className="post-value"
            type="text"
            name="content"
            placeholder="Content"
          />
          <button id="create-note-button">Create</button>
        </form>
        <div
          className="create-note__overlay"
          onClick={() =>
            showHideModal(
              document.querySelector(".create-note"),
              displayShow.HIDE
            )
          }
        ></div>
      </div>
      <div className="edit-note">
        <form className="edit-note__modal" onSubmit={editPost}>
          <input
            className="post-value"
            type="text"
            name="name"
            placeholder="Name"
          />
          <select className="post-value" name="category">
            <option value="Task">Task</option>
            <option value="Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <input
            className="post-value"
            type="text"
            name="content"
            placeholder="Content"
          />
          <button id="edit-note-button">Edit</button>
        </form>
        <div
          className="edit-note__overlay"
          onClick={() =>
            showHideModal(
              document.querySelector(".edit-note"),
              displayShow.HIDE
            )
          }
        ></div>
      </div>
    </section>
  );
}
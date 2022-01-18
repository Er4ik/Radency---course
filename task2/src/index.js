import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { columnNames, reducerCase, tableStatus } from './types';

const defaultState = {
  headerPost: {
    columnNames: columnNames.name,
    status: tableStatus.archive,
  },
  post: [],
  hide: [],
};

const addPost = (state, { contentFromModalFields }) => {
  return { ...state, post: state.post.concat([contentFromModalFields]) };
}

const deletePost = (state, {post, status}) => {
  const posts = status === tableStatus.archive ? state.post : state.hide;
  const index = posts.indexOf(post);
  posts.splice(index, 1);
  return { ...state = state };
};

const deleteAllPost = (state, status) => {
  const posts = status === tableStatus.archive ? state.post : state.hide;
  posts.splice(0, state.post.length);
  return { ...state = state };
};

const editPost = (state, { contentFromModalFields, status }) => {
  const posts = status === tableStatus.active ? state.hide : state.post;
  let index = contentFromModalFields.index;
  posts.splice(index, 1, contentFromModalFields);
  return { ...state = state };
};

const archivePost = (state, post) => {
  const index = state.post.indexOf(post);
  state.post.splice(index, 1);
  state.hide.push(post);
  return { ...(state = state) };
}

const unArchivePost = (state, post) => {
  const index = state.post.indexOf(post);
  state.hide.splice(index, 1);
  state.post.push(post);
  return { ...(state = state) };
};

const showHideArchivePost = (state, status) => {
  state.headerPost.status = status;
  return { ...(state = state) };

}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case reducerCase.ADD_POST:
      return addPost(state, action.payload);
    case reducerCase.DELETE_POST:
      return deletePost(state, action.payload);
    case reducerCase.DELETE_ALL_POST:
      return deleteAllPost(state);
    case reducerCase.EDIT_POST:
      return editPost(state, action.payload);
    case reducerCase.ARCHIVE_POST:
      return archivePost(state, action.payload);
    case reducerCase.SHOW_HIDE_ARCHIVE_POST:
      return showHideArchivePost(state, action.payload);
    case reducerCase.UNARCHIVE_POST:
      return unArchivePost(state, action.payload);
    default:
      return state;
  }
}

const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

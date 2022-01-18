import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducerCase } from './types';

const defaultState = {
  amountPosts: 0,
  post: [],
  hide: [],
}

const addPost = (state, newPost) => {
  return { ...state, post: state.post.concat([newPost]) };
}

const deletePost = (state, elem) => {
  const index = state.post.indexOf(elem);
  state.post.splice(index, 1);
  return { ...state, post: state.post };
};

const editPost = (state, newFieldsPost) => {
  const index = state.post.indexOf(newFieldsPost);
  state.post.splice(index, 1, newFieldsPost);
  return { ...state, post: state.post };
};

const archivePost = (state, post) => {
  // deletePost(state, post);
  // return { ...state, hide: }
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case reducerCase.ADD_POST:
      return addPost(state, action.payload);
    case reducerCase.DELETE_POST: 
      return deletePost(state, action.payload);
    case reducerCase.EDIT_POST:
      return editPost(state, action.payload);
    case reducerCase.ARCHIVE_POST:
      return archivePost(state, action.payload);
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

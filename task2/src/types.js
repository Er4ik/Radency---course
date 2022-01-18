import iconTask from "./picture/icon-Task.png"
import iconIdea from "./picture/icon-Idea.png";
import iconThought from "./picture/icon-Thought.png";

export const reducerCase = {
  ADD_POST: "ADD_POST",
  DELETE_POST: "DELETE_POST",
  EDIT_POST: "EDIT_POST",
  ARCHIVE_POST: "ARCHIVE_POST",
};

export const tableStatus = {
  active: 'active',
  archive: 'archive',
}

export const iconCategory = {
  Task: iconTask,
  Idea: iconIdea,
  Thought: iconThought
}

export const displayShow = {
    SHOW: 'block',
    HIDE: 'none'
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
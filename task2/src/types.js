import iconTask from "./picture/icon-Task.png"
import iconIdea from "./picture/icon-Idea.png";
import iconThought from "./picture/icon-Thought.png";

export const columnNames = {
  name: ["Name", "Created", "Category", "Content", "Dates"],
}

export const pivotColumnStatus = {
  name: ["Task", "Thought", "Idea"],
};

export const reducerCase = {
  ADD_POST: "ADD_POST",
  DELETE_POST: "DELETE_POST",
  EDIT_POST: "EDIT_POST",
  ARCHIVE_POST: "ARCHIVE_POST",
  DELETE_ALL_POST: "DELETE_ALL_POST",
  SHOW_HIDE_ARCHIVE_POST: "SHOW_HIDE_ARCHIVE_POST",
  UNARCHIVE_POST: "UNARCHIVE_POST",
};

export const tableStatus = {
  active: 'active',
  archive: 'archive',
}

export const oppositeTableStatus = {
  active: "archive",
  archive: "active",
};

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
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
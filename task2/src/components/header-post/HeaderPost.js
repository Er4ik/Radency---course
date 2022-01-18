import React from "react";
import HeaderColumnName from "./HeaderColumnName";
import iconDelete from "../../picture/icon-delete.png"
import iconActive from "../../picture/icon-active.png"
import iconArchive from "../../picture/icon-archive.png"
import { oppositeTableStatus, reducerCase, tableStatus } from "../../types";
import { useDispatch, useSelector } from "react-redux";

export default function HeaderPost() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    const deleteAllPosts = () => {
        const statusTableNow = state.headerPost.status;
        dispatch({type: reducerCase.DELETE_ALL_POST, payload: statusTableNow})
    }

    const showHidePost = (status) => {
        dispatch({type: reducerCase.SHOW_HIDE_ARCHIVE_POST, payload: status});
        return;
    };

    return (
      <section className="table">
        <div className="table__header">
          <div className="table__header_icon"></div>
          {state.headerPost.columnNames.map((elem) => {
            return <HeaderColumnName elem={elem} key={elem} />;
          })}
          <div className="table__header_nav">
            <img
              className="header-nav-hide"
              src={
                state.headerPost.status === tableStatus.archive
                  ? iconArchive
                  : iconActive
              }
              alt={state.headerPost.status}
              onClick={() =>
                showHidePost(oppositeTableStatus[state.headerPost.status])
              }
            />
            <img
              className="delete-nav-head"
              src={iconDelete}
              alt="delete"
              onClick={() => deleteAllPosts()}
            />
          </div>
        </div>
      </section>
    );
}
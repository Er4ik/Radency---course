import React from "react";
import { useSelector } from "react-redux";
import { iconCategory, pivotColumnStatus, tableStatus } from "../../types";
import PivotRowName from "./pivotContent";

export default function PivotHeader() {
    const state = useSelector(state => state);

    const calculatePosts = (elem, status) => {
        const posts = status === tableStatus.active ? state.post : state.hide;
        let counterPosts = 0;
        for (const item of posts) {
          if (item.category === elem) {
            counterPosts++;
          }
        }
        return counterPosts;
    }

    const prepareValues = (elem) => {
      const fieldsValues = {};
      fieldsValues.icon = iconCategory[elem];
      fieldsValues.category = elem;
      fieldsValues.amountActive = calculatePosts(elem, tableStatus.active);
      fieldsValues.amountArchive = calculatePosts(elem, tableStatus.archive);
      return fieldsValues;
    };

    return (
    <section className="table">
      <div className="table__header">
        <div className="table__header_icon"></div>
        <div className="table__header_name pivot-header">
          <h3>Note Category</h3>
        </div>
        <div className="table__header_created pivot-header">
          <h3>Active</h3>
        </div>
        <div className="table__header_category pivot-header">
          <h3>Archived</h3>
        </div>
      </div>
      <div className="table__content table__content_pivot">
        {
            pivotColumnStatus.name.map((elem) => {
                return <PivotRowName fieldsValues={prepareValues(elem)} key={elem} />;
            })
        }
      </div>
    </section>
  );
}

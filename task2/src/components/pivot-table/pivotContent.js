import React from "react";

export default function PivotRowName({ fieldsValues }) {
  return (
    <div className="table__content_row">
      <div className="content-icon">
        <img src={fieldsValues.icon} alt="icon" />
      </div>
      <div className="content pivot-content" data-content="name">
        <p>{fieldsValues.category}</p>
      </div>
      <div className="content pivot-content" data-content="created">
        <p>{fieldsValues.amountActive}</p>
      </div>
      <div className="content pivot-content" data-content="category">
        <p>{fieldsValues.amountArchive}</p>
      </div>
    </div>
  );
}

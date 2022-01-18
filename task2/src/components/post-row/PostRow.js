import React from "react";
import ContentPost from "../content-post/ContentPost";
import HeaderPost from "../header-post/HeaderPost";
import PivotHeader from "../pivot-table/pivotTable";

export default function Post({table}) {
    if(table === 'main') {
        return (
        <>
            <HeaderPost />
            <ContentPost />
        </>
        );
    }
    else return (
      <>
        <PivotHeader />
      </>
    );
}
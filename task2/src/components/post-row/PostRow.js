import React from "react";
import { useSelector } from "react-redux";
import ContentPost from "../content-post/ContentPost";
import HeaderPost from "../header-post/HeaderPost";

export default function Post() {
    return (
        <>
            <HeaderPost />
            <ContentPost />
        </>
    );
}
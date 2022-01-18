import React from "react";
import { useSelector } from "react-redux";
import ContentPost from "../content-post/ContentPost";
import HeaderPost from "../header-post/HeaderPost";

export default function Post({content1}) {
    const state = useSelector(state => state);

    return (
        <>
            <HeaderPost props={content1} />
            <ContentPost posts={state.post} />
        </>
    );
}
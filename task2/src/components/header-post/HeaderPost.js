import React from "react";
import HeaderColumnName from "./HeaderColumnName";
import iconDelete from "../../picture/icon-delete.png"
import iconActive from "../../picture/icon-active.png"
import iconArchive from "../../picture/icon-archive.png"
import { useSelector } from "react-redux";

export default function HeaderPost({props}) {
    const state = useSelector(state => state)
    return (
        <section className="table">
            <div className="table__header">
                <div className="table__header_icon"></div>
                {
                    props.columnNames.map(elem => {
                        return (
                        <HeaderColumnName elem={elem} key={elem}/>
                        )
                    })
                }
                <div className="table__header_nav">
                    <img className="header-nav-hide" 
                        src={props.status === 'archive' ? iconArchive : iconActive} alt={props.status}
                    />
                    <img className="delete-nav-head" src={iconDelete} alt="delete"/>
                </div>
            </div>
        </section>
    )
}
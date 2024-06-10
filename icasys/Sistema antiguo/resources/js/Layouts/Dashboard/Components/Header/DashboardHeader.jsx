import React, {useState} from "react";
import StudentSearchForm from "./StudentSearchForm/StudentSearchForm";
import DropdownMenu from "./DropdownMenu/DropdownMenu";


export default function(props){
    return(
        <div className="lg:flex md:flex flex justify-between px-4 py-5 bg-white">
            <StudentSearchForm auth={props.auth}></StudentSearchForm>
            <DropdownMenu auth={props.auth}></DropdownMenu>
        </div>
    )
}

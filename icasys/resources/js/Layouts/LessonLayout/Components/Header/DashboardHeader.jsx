import React, {useState} from "react";
import StudentSearchForm from "./StudentSearchForm/StudentSearchForm";
import DropdownMenu from "./DropdownMenu/DropdownMenu";


export default function(props){
    return(
        <div className="lg:flex md:flex flex justify-end px-2 py-2 bg-white">
            {/* <StudentSearchForm auth={props.auth}></StudentSearchForm> */}
            <DropdownMenu auth={props.auth}></DropdownMenu>
        </div>
    )
}

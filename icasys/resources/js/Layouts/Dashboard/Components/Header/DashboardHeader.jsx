import React, {useState} from "react";
import StudentSearchForm from "./StudentSearchForm/StudentSearchForm";
import DropdownMenu from "./DropdownMenu/DropdownMenu";


export default function(){
    return(
        <div className="lg:flex md:flex flex justify-between px-4 py-5 bg-white">
            <StudentSearchForm></StudentSearchForm>
            <DropdownMenu></DropdownMenu>
        </div>
    )
}

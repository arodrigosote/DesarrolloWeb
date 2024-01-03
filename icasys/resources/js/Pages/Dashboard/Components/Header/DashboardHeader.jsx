import React, {useState} from "react";
import StudentSearchForm from "./StudentSearchForm/StudentSearchForm";
import DropdownMenu from "./DropdownMenu/DropdownMenu";


export default function(){
    return(
        <div className="lg:flex md:flex sm:block justify-between px-12 py-5 bg-slate-100">
            <StudentSearchForm></StudentSearchForm>
            <DropdownMenu></DropdownMenu>
        </div>
    )
}

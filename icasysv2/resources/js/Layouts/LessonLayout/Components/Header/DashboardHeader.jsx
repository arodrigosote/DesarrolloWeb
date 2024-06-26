import React, {useState} from "react";
import StudentSearchForm from "./StudentSearchForm/StudentSearchForm";
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import ButtonPrimary from "@/Components/ButtonPrimary";



export default function(props){
    return(
        <div className="lg:flex md:flex flex justify-between px-2 py-2 bg-white">
            <ButtonPrimary className="10px">¿Tienes una duda?</ButtonPrimary>
            <DropdownMenu auth={props.auth}></DropdownMenu>
        </div>
    )
}

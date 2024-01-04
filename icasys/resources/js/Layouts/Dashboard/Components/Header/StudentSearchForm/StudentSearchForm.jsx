import React from "react";
import { RiSearchLine } from "react-icons/ri";
import '../../../../../../css/app.css'

export default function(){
    return(
        <form action="" className="border-solid flex items-center justify-center">
            <input
                type="search"
                name="studen-search"
                id="student-search"
                placeholder="Buscar alumno..."
                className="bg-transparent h-auto pt-[7px] pb-[7px]"/>
            <button type="submit" className="bg-primary h-auto m-0 p-3 text-white button"><RiSearchLine className="font-bolder"></RiSearchLine></button>
        </form>
    )
}

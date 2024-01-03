import React from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import foto from '../../../../../Assets/Images/yo.jpg'
import NavLink from "@/Components/NavLink";

export default function() {
    return(
        <div>
            <button className="flex items-center">
                <img src={foto} alt="" className="w-10 rounded-full"/>
                <RiArrowDownSFill className="text-lg"></RiArrowDownSFill>
            </button>
            <nav className="absolute bg-slate-300 w-40 right-14 mt-2 rounded-[10px]">
                <ul className="text-right items-center">
                    <NavLink to='' className="pt-2 pb-2 px-4">sad</NavLink>
                </ul>
            </nav>
        </div>
    )
}

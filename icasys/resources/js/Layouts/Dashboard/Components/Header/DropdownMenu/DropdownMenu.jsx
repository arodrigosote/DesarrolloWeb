import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import foto from '../../../../../Assets/Images/yo.jpg'
import NavLink from "@/Components/NavLink";
import Dropdown from '@/Components/Dropdown';

export default function () {

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen(!isMenuOpen);
    }


    return (
        <div>
            <button onClick={handleMenuOpen} className="flex items-center">
                <img src={foto} alt="" className="w-10 rounded-full" />
                <RiArrowDownSFill className="text-lg"></RiArrowDownSFill>
            </button>
            <nav className={`${isMenuOpen ? 'absolute' : 'hidden'} transition-all bg-white w-40 right-5 mt-2 rounded-[10px] border border-slate-400 p-2`}>
                <ul className="block text-right">
                    <li className="text-right flex justify-end"><NavLink to='' className="w-full justify-end pt-2 pb-2 px-4">Perfil</NavLink></li>
                    <li className="text-right flex justify-end"><NavLink to='' className="w-full justify-end pt-2 pb-2 px-4">Ajustes</NavLink></li>
                    <li className="text-right flex justify-end"><NavLink to='' className="w-full justify-end pt-2 pb-2 px-4">Cerrar Sesión</NavLink></li>
                </ul>
            </nav>

        </div>
    )
}

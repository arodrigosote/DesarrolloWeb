import React, { useState } from "react";
import './Sidebar.css';
import NavLink from '@/Components/NavLink';
import '../../../../../css/app.css';
import { RiDashboardFill, RiMenuFill, RiCloseFill, RiCompass2Fill  } from "react-icons/ri";
import icono from '../../../../Assets/Images/blanco.webp';

export default function () {

    const [sidebar, setSidebar] = useState(false)

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
            {/* Sidebar */}
            <div className={`fixed lg:static top-0 transition-all ${sidebar ? "-left-0" : "-left-full"} lg:w-full md:w-[40%] w-[80%] h-full  col-span-1 p-7 bg-primary`}>

                {/* Logotipo */}
                <div className="text-center pt-3 pb-3 lg:flex lg:justify-start lg:items-center">
                    <img src={icono} alt="" className="w-1/4 mx-auto md:mx-auto lg:mx-0" />
                    <h1 className="uppercase font-bold tracking-[4px] text-white">ICASYS</h1>
                </div>

                {/* Menu */}
                <nav>
                    <ul>
                        <li className="flex pb-2">
                            <NavLink to={route('dashboard.home')} className="hover:bg-white h-text-blue text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl font-bold transition-colors text-lg"><RiDashboardFill className="text-xl"></RiDashboardFill>Escritorio</NavLink>
                        </li>
                        <li className="flex pb-2">
                            <NavLink to='' className="hover:bg-white h-text-blue text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl font-bold transition-colors text-lg"><RiDashboardFill className="text-xl"></RiDashboardFill>Escritorio</NavLink>
                        </li>
                        <li className="flex pb-2">
                            <NavLink to={route('horarios.index')} className="hover:bg-white h-text-blue text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl font-bold transition-colors text-lg"><RiCompass2Fill  className="text-xl"></RiCompass2Fill >Horarios</NavLink>
                        </li>
                    </ul>
                </nav>

            </div>

            {/* Button to hide or show */}
            <button onClick={handleSidebar} className="block lg:hidden absolute bottom-4 right-4 bg-auxiliar2 text-white p-2 text-2xl md:text-3xl rounded-full">
                {sidebar ? <RiCloseFill /> : <RiMenuFill />}
            </button>
        </>

    )
}

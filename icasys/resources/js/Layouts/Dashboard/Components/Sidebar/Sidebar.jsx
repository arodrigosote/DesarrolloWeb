import React, { useState } from "react";
import './Sidebar.css';
import NavLink from '@/Components/NavLink';
import '../../../../../css/app.css';
import { RiDashboardFill, RiMenuFill, RiCloseFill, RiCompass2Fill, RiUser2Fill } from "react-icons/ri";
import icono from '../../../../Assets/Images/blanco.webp';
import { Link } from "@inertiajs/react";

export default function () {

    const [sidebar, setSidebar] = useState(false)

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
            {/* Sidebar */}
            <div className={`fixed lg:static top-0 transition-all ${sidebar ? "-left-0" : "-left-full"} lg:w-full md:w-[40%] w-[80%] h-full  col-span-1 bg-primary`}>

                {/* Logotipo */}
                <Link href={route('page.home')}>
                    <div className="text-center py-3 lg:pl-4 lg:flex lg:justify-start lg:items-center border-b-2">
                        <img src={icono} alt="" className="w-1/6 mx-auto md:mx-auto lg:mx-0" />
                        <h1 className="uppercase text-gray-200 tracking-[1px] hover:text-white">ICASYS</h1>
                    </div>

                </Link>

                {/* Menu */}
                <nav className="p-2">
                    <ul className="">
                        <li className="flex pb-2">
                            <Link href={route('dashboard.home')} className="hover:bg-white h-text-blue text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl font-bold transition-colors text-lg flex items-center justify-start text-sm"><RiDashboardFill className="text-xl"></RiDashboardFill >Escritorio</Link>
                        </li>

                        <li className="flex pb-2">
                            <Link href={route('horarios.index')} className="hover:bg-white h-text-blue text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl font-bold transition-colors text-lg flex items-center justify-start text-sm"><RiCompass2Fill className="text-xl"></RiCompass2Fill >Horarios</Link>
                        </li>

                        <li className="flex pb-2">
                            <Link href={route('profesores.index')} className="hover:bg-white h-text-blue text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl font-bold transition-colors text-lg flex items-center justify-start text-sm"><RiUser2Fill className='text-xl'/>Profesores</Link>
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

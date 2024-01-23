import React, { useState } from "react";
import './Sidebar.css';
import NavLink from '@/Components/NavLink';
import '../../../../../css/app.css';
import { RiDashboardFill, RiMenuFill, RiCloseFill, RiCompass2Fill, RiUser2Fill, RiGroupFill, RiUser3Fill } from "react-icons/ri";
import icono from '../../../../Assets/Images/blanco.webp';
import { Link } from "@inertiajs/react";
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Menu } from "@headlessui/react";
import ButtonInvisible from "@/Components/ButtonInvisible";

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
                    <div className="text-center py-4 lg:pl-4 lg:flex lg:justify-start lg:items-center border-b-2">
                        <Avatar alt="icasys logo" src={icono} className="w-1/6 mx-auto md:mx-auto lg:mx-0" />
                        <h1 className="uppercase text-gray-200 tracking-[1px] hover:text-white">ICASYS</h1>
                    </div>

                </Link>

                {/* Menu */}
                <MenuList>
                    <MenuItem className="hover:bg-white"><Link href={route('dashboard.home')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm"><RiDashboardFill className="text-xl"></RiDashboardFill>Escritotio</Link></MenuItem>
                    <MenuItem className="hover:bg-white"><Link href={route('grupos.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm"><RiGroupFill className='text-xl' />Grupos</Link></MenuItem>
                    <MenuItem className="hover:bg-white"><Link href={route('alumnos.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm"><RiUser3Fill className='text-xl' />Alumnos</Link></MenuItem>
                    <MenuItem className="hover:bg-white"><Link href={route('horarios.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm"><RiCompass2Fill className="text-xl"></RiCompass2Fill >Horarios</Link></MenuItem>
                    <MenuItem className="hover:bg-white"><Link href={route('profesores.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm"><RiUser2Fill className='text-xl' />Profesores</Link></MenuItem>
                </MenuList>

            </div>

            {/* Button to hide or show */}
            {/* <button onClick={handleSidebar} className="block lg:hidden absolute bottom-4 right-4 bg-auxiliar2 text-white p-2 text-2xl md:text-3xl rounded-full">

            </button> */}
            <ButtonInvisible onClick={handleSidebar} className="block lg:hidden absolute bottom-4 right-4 bg-auxiliar2 text-white p-2 text-2xl md:text-3xl rounded-full">
                {sidebar ? <RiCloseFill /> : <RiMenuFill />}
            </ButtonInvisible>
        </>

    )
}

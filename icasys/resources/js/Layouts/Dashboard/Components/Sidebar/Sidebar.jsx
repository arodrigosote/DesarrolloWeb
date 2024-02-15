import React, { useState } from "react";
import './Sidebar.css';
import NavLink from '@/Components/NavLink';
import '../../../../../css/app.css';
import { RiDashboardFill, RiMenuFill, RiCloseFill, RiCompass2Fill, RiUser2Fill, RiGroupFill, RiUser3Fill, RiFunctionFill, RiHome2Fill   } from "react-icons/ri";
import icono from '../../../../Assets/Images/blanco.webp';
import { Link } from "@inertiajs/react";
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Menu } from "@headlessui/react";
import ButtonInvisible from "@/Components/ButtonInvisible";

export default function (props) {

    const [sidebar, setSidebar] = useState(false)

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
            {/* Sidebar */}
            <div className={`z-50 fixed lg:static top-0 transition-all ${sidebar ? "-left-0" : "-left-full"} lg:w-full md:w-[40%] w-[80%] h-full  col-span-2 bg-primary`}>

                {/* Logotipo */}
                <Link href={route('page.home')}>
                    <div className="text-center py-4 lg:pl-4 lg:flex lg:justify-start lg:items-center border-b-2">
                        <Avatar alt="icasys logo" src={icono} className="w-1/6 mx-auto md:mx-auto lg:mx-0" />
                        <h1 className="uppercase text-gray-200 tracking-[1px] hover:text-white">ICASYS</h1>
                    </div>

                </Link>

                {/* Menu */}
                {props.auth.user.rol === 2 ? (
                    <>
                        <h2 className="text-white xl:text-[14px] xs:text-[10px] md:text-[11px] mt-5 ml-3">PANEL ADMINISTRADOR</h2>
                        <MenuList>
                            <MenuItem className=""><Link href={route('dashboard.home')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]"><RiHome2Fill className="text-xl"></RiHome2Fill>Escritotio</Link></MenuItem>
                            <MenuItem className=""><Link href={route('grupos.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]"><RiGroupFill className='text-xl' />Grupos</Link></MenuItem>
                            <MenuItem className=""><Link href={route('alumnos.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]"><RiUser3Fill className='text-xl' />Alumnos</Link></MenuItem>
                            <MenuItem className=""><Link href={route('horarios.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]"><RiCompass2Fill className="text-xl"></RiCompass2Fill >Horarios</Link></MenuItem>
                            <MenuItem className=""><Link href={route('profesores.index')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]"><RiUser2Fill className='text-xl' />Profesores</Link></MenuItem>
                        </MenuList>
                        <MenuList>
                            <MenuItem className=""><Link href={route('admin.courses')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]"><RiDashboardFill className="text-xl"></RiDashboardFill>Cursos</Link></MenuItem>
                        </MenuList>
                    </>
                ) : (
                    <>
                        <h2 className="text-white xl:text-[14px] xs:text-[10px] md:text-[11px] mt-5 ml-3">PANEL ESTUDIANTE</h2>
                        <MenuList>
                            <MenuItem className=""><Link href={route('dashboard.home')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]"><RiFunctionFill  className="text-xl"></RiFunctionFill>Escritotio</Link></MenuItem>
                        </MenuList>
                    </>
                )}

            </div>

            {/* Button to hide or show */}
            {/* <button onClick={handleSidebar} className="block lg:hidden absolute bottom-4 right-4 bg-auxiliar2 text-white p-2 text-2xl md:text-3xl rounded-full">

            </button> */}
            <ButtonInvisible onClick={handleSidebar} className="block lg:hidden fixed bottom-4 right-4 lg:relative lg:bottom-auto lg:right-auto bg-auxiliar2 text-white p-2 text-2xl md:text-3xl rounded-full">
                {sidebar ? <RiCloseFill /> : <RiMenuFill />}
            </ButtonInvisible>
        </>

    )
}

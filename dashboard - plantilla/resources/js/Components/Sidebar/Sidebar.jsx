import { Link } from "@inertiajs/react";
import { Avatar, MenuItem, MenuList } from "@mui/material";
import { useState } from "react";
import ButtonInvisible from "../ButtonInvisible";
import { RiDashboardFill, RiDraftFill,RiUserFill, RiBook2Fill , RiMenuFill, RiCloseFill, RiCompass2Fill, RiUser2Fill, RiGroupFill, RiUser3Fill, RiFunctionFill, RiHome2Fill   } from "react-icons/ri";

export default function Sidebar() {

    const [sidebar, setSidebar] = useState(false)

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    return (
        <>
            <div className={`bg-color1 z-50 fixed lg:static top-0 transition-all ${sidebar ? "-left-0" : "-left-full"} lg:w-full md:w-[40%] w-[80%] h-full  col-span-2 bg-dark`}>
                <Link href={route('home')}>
                    <div className="text-center py-2 lg:pl-4 lg:flex lg:justify-start lg:items-center ">
                        <Avatar alt="icasys logo" src='' className="w-1/6 mx-auto md:mx-auto lg:mx-0" />
                        <h1 className="uppercase text-gray-200 tracking-[1px] hover:text-white">ICASYS</h1>
                    </div>
                </Link>

                <h2 className="text-white xl:text-[14px] xs:text-[10px] md:text-[11px] mt-5 ml-3">PANEL ADMINISTRADOR</h2>
                <MenuList>
                    <MenuItem className=""><Link href='#' className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]">Escritorio</Link></MenuItem>
                    <MenuItem className=""><Link href='#' className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]">Grupos</Link></MenuItem>
                    <MenuItem className=""><Link href='#' className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]">Alumnos</Link></MenuItem>
                    <MenuItem className=""><Link href='#' className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]">Horarios</Link></MenuItem>
                    <MenuItem className=""><Link href='#' className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]">Profesores</Link></MenuItem>
                </MenuList>
                <MenuList>
                    <MenuItem className=""><Link href='#' className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]">Cursos</Link></MenuItem>
                </MenuList>
                <MenuList>
                    <MenuItem className=""><Link href='#' className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start xs:text-[10px] md:text-[12px] xl:text-[14px]">Perfil</Link></MenuItem>
                </MenuList>
            </div>
            <ButtonInvisible onClick={handleSidebar} className="block lg:hidden fixed bottom-4 right-4 lg:relative lg:bottom-auto lg:right-auto bg-color2 text-white p-2 text-2xl md:text-3xl rounded-full">
                {sidebar ? <RiCloseFill /> : <RiMenuFill />}
            </ButtonInvisible>
        </>
    )
}

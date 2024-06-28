import { Menu, MenuItem } from '@headlessui/react'
import '../../../css/app.css'
import { MenuList } from '@mui/material'
import { Link } from '@inertiajs/react'
import { MdDomain } from "react-icons/md";

export default function Header() {
    return (

        <header className='m-0 p-0 bg-color1 flex text-color5 align-middle justify-around'>
            <a href="" className='flex align-middle justify-start '>
                <MdDomain className='my-auto text-4xl mx-4'></MdDomain>
                <p className='my-auto'>Nombre de la empresa</p>
            </a>

            <MenuList className='flex nav'>
                <Link href='#' className=" text-white h-16 pt-3 pb-3  gap-1 rounded-xl transition-colors flex items-center justify-center text-sm w-28 text-center mx-auto">Inicio</Link>
                <Link href='#' className=" text-white h-16 pt-3 pb-3  gap-1 rounded-xl transition-colors flex items-center justify-center text-sm w-28 text-center mx-auto">Cursos</Link>
                <Link href='#' className=" text-white h-16 pt-3 pb-3  gap-1 rounded-xl transition-colors flex items-center justify-center text-sm w-28 text-center mx-auto">Contacto</Link>
                <Link href='#' className=" text-white h-16 pt-3 pb-3  gap-1 rounded-xl transition-colors flex items-center justify-center text-sm w-28 text-center mx-auto">Acerca de</Link>
                <Link href='#' className=" text-white h-16 pt-3 pb-3  gap-1 rounded-xl transition-colors flex items-center justify-center text-sm w-28 text-center mx-auto">Servicios</Link>
            </MenuList>
        </header>

    )
}

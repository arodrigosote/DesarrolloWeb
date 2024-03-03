import React, { useState } from 'react';
import './Header.css';
import '../../../../css/app.css';
import icono from '../../../Assets/Images/blanco.webp';
import profilepic from '../../../Assets/Images/yo.jpg';
import 'boxicons';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";
import ButtonYellow from '@/Components/ButtonYellow';
import ButtonSecondary from '@/Components/ButtonSecondary';
import ButtonLight from '@/Components/ButtonLight';
import ButtonWhite from '@/Components/ButtonWhite';
import ButtonInvisible from '@/Components/ButtonInvisible';
import { CImage } from '@coreui/react';

export default function (auth) {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMovileMenuOpen, setMovileMenuOpen] = useState(false);

    const movileToggle = () => {
        setMovileMenuOpen(!isMovileMenuOpen);
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <header className='header bg-primary'>
            <div className='left-section'>
                {/* <Avatar alt="icasys logo" src={icono} className="w-1/6 mx-auto nav md:mx-auto lg:mx-0" /> */}
                <CImage rounded thumbnail src={icono} width={50} height={50} alt={`icasys logo blanco`} />
                <MenuList className='flex nav'>
                    <Link href={route('page.home')} className=" text-white h-16 pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors flex items-center justify-center text-sm px-6 w-28 text-center mx-auto">Inicio</Link>
                    <Link href={route('courses')} className=" text-white h-16 pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors flex items-center justify-center text-sm px-6 w-28 text-center mx-auto">Cursos</Link>
                    <Link href={route('page.contact')} className=" text-white h-16 pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors flex items-center justify-center text-sm px-6 w-28 text-center mx-auto">Contacto</Link>
                    <Link href={route('page.about')} className=" text-white h-16 pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors flex items-center justify-center text-sm px-6 w-28 text-center mx-auto">Acerca de</Link>
                </MenuList>
                <ButtonInvisible className='sm:hidden block lg:hidden ml-2 py-auto my-auto' onClick={movileToggle}>
                    <box-icon name='menu' color='#ffffff' size="md" ></box-icon>
                </ButtonInvisible>

            </div>
            <MenuList className={`movile-nav w-full ${isMovileMenuOpen ? 'movile-menu-active' : ''}`}>
                <MenuItem className="w-full hover:bg-transparent"><Link href={route('page.home')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 hover:bg-transparent rounded-xl transition-colors text-lg flex items-center justify-start text-sm">Inicio</Link></MenuItem>
                <MenuItem className="w-full"><Link href={route('page.contact')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm">Contacto</Link></MenuItem>
                <MenuItem className="w-full"><Link href={route('courses')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm">Cursos</Link></MenuItem>
                <MenuItem className="w-full"><Link href={route('page.about')} className=" text-white w-full pt-3 pb-3 pl-4 gap-2 rounded-xl transition-colors text-lg flex items-center justify-start text-sm">Acerca de</Link></MenuItem>
            </MenuList>
            <div className='right-section'>
                {auth.auth.auth.user !== null ? (
                    <Dropdown>
                        <Dropdown.Trigger className='pt-6'>
                            <span className="inline-flex rounded-md">
                                <ButtonInvisible
                                    type="button"
                                    className="pt-1 inline-flex items-center px-3 border border-transparent text-sm leading-4 font-medium rounded-md hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    <Avatar sx={{ width: 35, height: 35 }} alt={auth.auth.auth.user.name} src={`/storage/${auth.auth.auth.user.profile_pic}`} />

                                    <svg
                                        className="ml-2 -mr-0.5 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </ButtonInvisible>
                            </span>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('dashboard.home')} className='text-end'>Escritorio</Dropdown.Link>
                            <Dropdown.Link href={route('profile.edit')} className='text-end'>Perfil</Dropdown.Link>
                            <Dropdown.Link href={route('logout')} method="post" as="button" className='text-end'>
                                Cerrar sesión
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ) : (
                    // Aquí puedes colocar el contenido que deseas mostrar cuando el usuario no ha iniciado sesión
                    <>
                        <Link href={route('login')} className='bg-white p-3 mx-2 text-primary rounded-[5px] font-bold text-sm'>Iniciar sesión</Link>
                        <Link href={route('register')} className='bg-yellow p-3 text-white rounded-[5px] font-bold text-sm'>Registrarse</Link>
                    </>
                )}

            </div>
        </header>
    );
}

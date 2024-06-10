import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import foto from '../../../../../Assets/Images/yo.jpg';
import NavLink from "@/Components/NavLink";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ButtonInvisible from "@/Components/ButtonInvisible";
import Dropdown from "@/Components/Dropdown";
import '../../../../../../css/app.css'

export default function UserProfileMenu({ auth }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="">
            {/* <ButtonInvisible onClick={handleMenuOpen} className="flex items-center">
                <Avatar alt={auth.user.name} src={`a`} />
                <RiArrowDownSFill className="text-lg"></RiArrowDownSFill>
            </ButtonInvisible>
            <nav className={`${isMenuOpen ? 'absolute' : 'hidden'} transition-all bg-white w-40 right-5 mt-2 rounded-[10px] border border-slate-400 p-2`}>
                <MenuList>
                    <MenuItem><NavLink to='/perfil' className="">Perfil</NavLink></MenuItem>
                    <MenuItem><NavLink to='/ajustes' className="">Ajustes</NavLink></MenuItem>
                    <MenuItem><NavLink to='/cerrar-sesion' className="">Cerrar Sesión</NavLink></MenuItem>
                </MenuList>


            </nav> */}
            <Dropdown>
                    <Dropdown.Trigger className='bg-transparent'>
                        <span className="inline-flex rounded-md">
                            <ButtonInvisible
                                type="button"
                                className="inline-flex items-center px-3 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                            >
                                <Avatar alt={auth.user.name} src={`/storage/${auth.user.profile_pic}`} />

                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
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
                        <Dropdown.Link href={route('profile.edit')} className='text-end'>Perfil</Dropdown.Link>
                        <Dropdown.Link href={route('logout')} method="post" as="button" className='text-end'>
                            Cerrar sesión
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
        </div>
    );
}

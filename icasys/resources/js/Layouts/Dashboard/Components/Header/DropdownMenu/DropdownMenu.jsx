import React, { useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import foto from '../../../../../Assets/Images/yo.jpg';
import NavLink from "@/Components/NavLink";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ButtonInvisible from "@/Components/ButtonInvisible";

export default function UserProfileMenu({ auth }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleMenuOpen = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <ButtonInvisible onClick={handleMenuOpen} className="flex items-center">
                <Avatar alt={auth.user.name} src={`a`} />
                <RiArrowDownSFill className="text-lg"></RiArrowDownSFill>
            </ButtonInvisible>
            <nav className={`${isMenuOpen ? 'absolute' : 'hidden'} transition-all bg-white w-40 right-5 mt-2 rounded-[10px] border border-slate-400 p-2`}>
                <MenuList>
                    <MenuItem><NavLink to='/perfil' className="">Perfil</NavLink></MenuItem>
                    <MenuItem><NavLink to='/ajustes' className="">Ajustes</NavLink></MenuItem>
                    <MenuItem><NavLink to='/cerrar-sesion' className="">Cerrar Sesión</NavLink></MenuItem>
                </MenuList>
            </nav>
        </div>
    );
}

import React, { useState } from 'react';
import './Header.css';
import '../../../../css/app.css';
import icono from '../../../Assets/Images/blanco.webp';
import profilepic from '../../../Assets/Images/yo.jpg';
import 'boxicons';


export default function () {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isMovileMenuOpen, setMovileMenuOpen] = useState(false);

    const contact = route('page.contact')

    const movileToggle = () => {
        setMovileMenuOpen(!isMovileMenuOpen);
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <header className='header bg-primary'>
            <div className='left-section'>
                <img src={icono} alt="icono icasys" className='icon' />
                <nav className='nav'>
                    <ul className='nav-menu'>
                        <li className='nav-menu-item'><a href="#" className='nav-menu-link'>Inicio</a></li>
                        <li className='nav-menu-item'><a href="#" className='nav-menu-link'>Cursos</a></li>
                        <li className='nav-menu-item'><a href={contact} className='nav-menu-link'>Contacto</a></li>
                        <li className='nav-menu-item'><a href="#" className='nav-menu-link'>Acercade</a></li>
                    </ul>
                </nav>
            </div>
            <div className='right-section'>
                <button className={`dropdown`} onClick={toggleMenu}>
                    <box-icon name='down-arrow' type='solid' color='#ffffff' size='xs'></box-icon>
                    <img src={profilepic} alt="" className='profile-pic' />
                    <ul className={`menu ${isMenuOpen ? 'menu-open' : ''}`}>
                        <li className='menu-item'><a href="#" className='menu-link'>Perfil</a></li>
                        <li className='menu-item'><a href="#" className='menu-link'>Mis cursos</a></li>
                        <li className='menu-item'><a href="#" className='menu-link'>Cerrar sesión</a></li>
                    </ul>
                </button>

                <button className='movile-dropdown' onClick={movileToggle}>
                    <box-icon name='menu' color='#ffffff' size="md" ></box-icon>
                </button>
                <nav className={`movile-nav ${isMovileMenuOpen ? 'movile-menu-active' : ''}`}>
                    <ul className='movile-nav-menu'>
                        <li className='movile-nav-menu-item'><a href="#" className='movile-nav-menu-link'>Inicio</a></li>
                        <li className='movile-nav-menu-item'><a href="#" className='movile-nav-menu-link'>Cursos</a></li>
                        <li className='movile-nav-menu-item'><a href="#" className='movile-nav-menu-link'>Contacto</a></li>
                        <li className='movile-nav-menu-item'><a href="#" className='movile-nav-menu-link'>Acerca de</a></li>
                    </ul>
                    <ul className='movile-nav-menu-2'>
                        <li className='movile-nav-menu-item line'><a href="#" className=''>Perfil</a></li>
                        <li className='movile-nav-menu-item'><a href="#" className=''>Mis cursos</a></li>
                        <li className='movile-nav-menu-item red'><a href="#" className=''>Cerrar sesión</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

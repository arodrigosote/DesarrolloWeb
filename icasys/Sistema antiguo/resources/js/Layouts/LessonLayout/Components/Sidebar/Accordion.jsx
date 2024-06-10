import { Link, usePage } from '@inertiajs/react';
import { MenuItem, MenuList } from '@mui/material';
import React, { useState } from 'react';
import { RiArrowDropDownFill } from "react-icons/ri";

function Accordion({ module, children }) {


    const [activeIndex, setActiveIndex] = useState(null); // Estado para rastrear qué panel está abierto

    const togglePanel = () => {
        setActiveIndex((prevIndex) => prevIndex === null ? module.id : null); // Alternar el estado del panel
    };

    return (
        <div className="accordion bg-dark text-white px-5 py-3 hover:bg-[#191a1b]">
            <div className="accordion-item">
                <div
                    className={`accordion-header flex justify-between align-middle items-center ${activeIndex === module.id ? 'active' : ''}`}
                    onClick={togglePanel}
                >
                    <p className='font-bold'>{module.name}</p>
                    <RiArrowDropDownFill/>
                </div>
                {activeIndex === module.id && (
                    <div className="accordion-content">
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Accordion;

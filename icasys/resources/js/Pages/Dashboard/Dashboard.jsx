import React, {useState} from "react";

import NavLink from '@/Components/NavLink';
import '../../../css/app.css'
import { RiDashboardFill, RiMenuFill, RiCloseFill    } from "react-icons/ri";
import icono from '../../Assets/Images/blanco.webp';
import Sidebar from "./Components/Sidebar/Sidebar";
import DashboardHeader from "./Components/Header/DashboardHeader";


export default function () {

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-7">

            <Sidebar></Sidebar>

            {/* content */}
            <div className="col-span-6">
                <DashboardHeader></DashboardHeader>
            </div>

        </div>
    )
}

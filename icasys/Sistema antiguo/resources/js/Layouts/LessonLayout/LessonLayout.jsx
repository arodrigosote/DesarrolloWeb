import React, {useState} from "react";

import NavLink from '@/Components/NavLink';
import '../../../css/app.css'
import { RiDashboardFill, RiMenuFill, RiCloseFill    } from "react-icons/ri";
import icono from '../../Assets/Images/blanco.webp';
import Sidebar from "./Components/Sidebar/Sidebar";
import DashboardHeader from "./Components/Header/DashboardHeader";
import '../../../css/app.css'


export default function ({auth, children, title, modules, lessons, course }) {

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-10">

            <Sidebar auth={auth} modules={modules} lessons={lessons} course={course}></Sidebar>

            {/* content */}
            <div className="col-span-8 bg-slate-100">
                <DashboardHeader auth={auth}></DashboardHeader>
                <div className="bg-white px-16 py-6 w-[90%] mx-auto mt-4 shadow-md ">
                    <h2 className="text-primary font-bold text-xl ">{`${title}`}</h2>
                </div>
                <div className="px-16 py-8 bg-white mx-auto w-[90%] mt-3 mb-8 shadow-md ">{children}</div>
            </div>

        </div>
    )
}

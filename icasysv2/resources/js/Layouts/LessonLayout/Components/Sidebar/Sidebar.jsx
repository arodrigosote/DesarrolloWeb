import React, { useState } from "react";
import './Sidebar.css';
import NavLink from '@/Components/NavLink';
import '../../../../../css/app.css';
import { RiDashboardFill, RiMenuFill, RiCloseFill, RiCompass2Fill, RiUser2Fill, RiGroupFill, RiUser3Fill, RiFunctionFill, RiHome2Fill, RiArrowDownSFill } from "react-icons/ri";
import icono from '../../../../Assets/Images/blanco.webp';
import { Link, usePage } from "@inertiajs/react";
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Menu } from "@headlessui/react";
import ButtonInvisible from "@/Components/ButtonInvisible";
// import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Accordion from "./Accordion";
import { CImage } from "@coreui/react";
import { Typography } from "@mui/material";

export default function (auth) {

    const { course, modules, lessons, url } = usePage().props

    const [sidebar, setSidebar] = useState(false)

    const handleSidebar = () => {
        setSidebar(!sidebar);
    }

    const numberOfLessons = lessons.length;

    return (
        <>
            {/* Sidebar */}
            <div className={`z-50 fixed lg:static top-0 transition-all ${sidebar ? "-left-0" : "-left-full"} lg:w-full md:w-[40%] w-[80%] h-full  col-span-2 bg-dark`}>

                {/* Logotipo */}
                <Link href={route('page.home')}>
                    <div className="text-center py-2 lg:pl-4 lg:flex lg:justify-start lg:items-center ">
                        <Avatar alt="icasys logo" src={icono} className="w-1/6 mx-auto md:mx-auto lg:mx-0" />
                        <h1 className="uppercase text-gray-200 tracking-[1px] hover:text-white">ICASYS</h1>
                    </div>
                </Link>
                <div className="py-8">
                    <h2 className="text-white px-5 text-xl font-bold">{course.title}</h2>
                    <p className="text-white px-5">{numberOfLessons} lecciones </p>
                </div>

                {modules.map((module) => (
                    // <Accordion key={module.id}>
                    //     <AccordionSummary
                    //         expandIcon={<RiArrowDownSFill />}
                    //         aria-controls="panel1-content"
                    //         id="panel1-header"
                    //     >
                    //         <Typography sx={{ width: '15%', flexShrink: 0 }}>
                    //             {module.name}
                    //         </Typography>
                    //         <Typography sx={{ color: 'text.secondary' }}>{module.short_description}</Typography>

                    //     </AccordionSummary>
                    //     <AccordionDetails sx={{ paddingBottom: 0, paddingTop: 0, flexShrink: 0 }}>
                    //         {lessons.map((lesson) => (
                    //             lesson.module_id === module.id ? (
                    //                 <Link key={lesson.id} href={route('lesson.show', [course.id, course.title, lesson.id, lesson.name])}>
                    //                     <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    //                         <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                    //                             <CImage rounded className="mr-4" thumbnail src={`${url}storage/${lesson.image}`} width={100} height={100} alt={lesson.name} />
                    //                             {`${lesson.lesson_number}.   `}
                    //                             {lesson.name}
                    //                         </Typography>
                    //                     </MenuItem>
                    //                 </Link>
                    //             ) : null
                    //         ))}
                    //     </AccordionDetails>
                    //     {/* <AccordionActions sx={{ paddingBottom: 2, paddingTop: 0, flexShrink: 0 }}>
                    //         <ButtonDelete onClick={(e)=>{openDeleteModuleModal(module.id, module.name)}}>Eliminar</ButtonDelete>
                    //         <ButtonEdit onClick={(e) => { openModuleModal(2, module.id, module.name, module.short_description) }}>Editar módulo</ButtonEdit>
                    //         <ButtonSecondary onClick={(e) => { openLessonModal(1, module.id) }}>Agregar lección</ButtonSecondary>
                    //     </AccordionActions> */}
                    // </Accordion>

                    <Accordion key={module.id} module={module}>
                        {lessons.map((lesson) => (
                            lesson.module_id === module.id ? (
                                <Link className="pl-0" key={lesson.id} href={route('lesson.show', [course.id, course.slug,lesson.id, lesson.lesson_number, lesson.name])}>
                                    <MenuItem sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                            {/* <CImage rounded className="mr-4" thumbnail src={`${url}storage/${lesson.image}`} width={100} height={100} alt={lesson.name} /> */}
                                            {`${lesson.lesson_number}.   `}
                                            {lesson.name}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ) : null
                        ))}

                    </Accordion>
                ))}

                {/* Menu */}
                {/* {props.auth.user.rol === 2 ? (
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
                )} */}

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

import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, useForkRef, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    makeStyles,
    MenuList,
    Typography,
} from '@mui/material';
import { RiCircleFill } from "react-icons/ri";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { RiEditBoxLine, RiDeleteBin6Fill, RiArrowDownSFill, RiDeleteBinFill, RiEditBoxFill } from "react-icons/ri";

import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CImage } from "@coreui/react";

import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import LessonHeader from "@/Components/LessonHeader";
import LessonLayout from "@/Layouts/LessonLayout/LessonLayout";
import { BigPlayButton, ControlBar, LoadingSpinner, PlayToggle, Player, ReplayControl, VolumeMenuButton } from "video-react";
import '../../../../../../../node_modules/video-react/dist/video-react.css'

const Lesson = ({ auth }) => {
    const { course, url, modules, lessons } = usePage().props
    return (
        <>
            <ToastContainer></ToastContainer>
            <Head>
                <title>{course.title}</title>
            </Head>
            <LessonLayout auth={auth} title={course.title}>
                <div className="lg:flex">
                    <div className="lg:w-[50%]">
                        <Player
                            playsInline
                            // poster=""
                            src={`${url}storage/${course.video}`}

                        >
                            <BigPlayButton position="center" />
                            <LoadingSpinner />
                            <ControlBar autoHide={true}>
                                <PlayToggle />
                                <ReplayControl seconds={10} order={2.2} />
                                <VolumeMenuButton vertical />
                            </ControlBar>

                        </Player>
                    </div>
                    <div>
                        asd
                    </div>

                </div>
                <div className="mt-6">
                    <h2 className="text-primary text-xl mb-3">Accede a tus lecciones</h2>
                    {modules.map((module) => (
                        <Accordion key={module.id}>
                            <AccordionSummary
                                expandIcon={<RiArrowDownSFill />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography sx={{ width: '15%', flexShrink: 0 }}>
                                    {module.name}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{module.short_description}</Typography>

                            </AccordionSummary>
                            <AccordionDetails sx={{ paddingBottom: 0, paddingTop: 0, flexShrink: 0 }}>
                                {lessons.map((lesson) => (
                                    lesson.module_id === module.id ? (
                                        <Link key={lesson.id} href={route('lesson.show', [course.id, course.title, lesson.id, lesson.name])}>
                                            <MenuItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CImage rounded className="mr-4" thumbnail src={`${url}storage/${lesson.image}`} width={100} height={100} alt={lesson.name} />
                                                    {`${lesson.lesson_number}.   `}
                                                    {lesson.name}
                                                </Typography>
                                            </MenuItem>
                                        </Link>
                                    ) : null
                                ))}
                            </AccordionDetails>
                            {/* <AccordionActions sx={{ paddingBottom: 2, paddingTop: 0, flexShrink: 0 }}>
                                <ButtonDelete onClick={(e)=>{openDeleteModuleModal(module.id, module.name)}}>Eliminar</ButtonDelete>
                                <ButtonEdit onClick={(e) => { openModuleModal(2, module.id, module.name, module.short_description) }}>Editar módulo</ButtonEdit>
                                <ButtonSecondary onClick={(e) => { openLessonModal(1, module.id) }}>Agregar lección</ButtonSecondary>
                            </AccordionActions> */}
                        </Accordion>
                    ))}
                </div>

            </LessonLayout>
        </>
    )
}

// Index.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Lesson

import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Accordion, AccordionSummary, Typography, AccordionDetails, MenuItem } from '@mui/material';
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import ButtonDelete from "@/Components/ButtonDelete";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonCancel from "@/Components/ButtonCancel";
import SecondaryLink from "@/Components/SecondaryLink";
import { RiArrowDownSFill, RiCircleFill } from "react-icons/ri";
import { CImage } from "@coreui/react";


const MyGrades = (auth) => {
    const { grades } = usePage().props


    let subjects = [];
    let temp = [];

    grades.forEach(grade => {
        if (temp.includes(grade.classsubjectgroup.subjectgroup.subject.id)) {
            // La materia ya está en el arreglo
        } else {
            let subject = [grade.classsubjectgroup.subjectgroup.subject.id, grade.classsubjectgroup.subjectgroup.subject.name];
            subjects.push(subject);
            temp.push(grade.classsubjectgroup.subjectgroup.subject.id);
        }
    });

    return (
        <>
            <Head>
                <title>Mis calificaciones</title>
            </Head>
            <DashboardLayout title={'Mis calificaciones'} auth={auth}>
                {grades.length === 0 ? (
                    <div>
                        <p>No hay calificaciones para mostrar.</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-secondary font-bold my-8 text-xl ">Materias cursadas</h2>
                        {subjects.map(subject => (
                            <Accordion key={subject[0]}>
                                <AccordionSummary
                                    expandIcon={<RiArrowDownSFill />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography sx={{ width: '28%', flexShrink: 0 }}>
                                        <p className="font-bold">{subject[1]}</p>
                                    </Typography>
                                    {/* <Typography sx={{ color: 'text.secondary' }}>{module.short_description}</Typography> */}

                                </AccordionSummary>
                                <AccordionDetails sx={{ paddingBottom: 0, paddingTop: 0, flexShrink: 0 }}>
                                    {grades.map((grade) => (
                                        grade.classsubjectgroup.subjectgroup.subject.id === subject[0] ? (
                                            <MenuItem key={grade.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingY: '13px' }}>
                                                <Typography sx={{ display: 'flex', alignItems: 'center', width:'33%', justifyContent:'start' }}>
                                                    {/* <CImage rounded className="mr-4" thumbnail src={`${url}storage/${lesson.image}`} width={100} height={100} alt={lesson.name} /> */}
                                                    <p className="font-bold mr-1">{grade.classsubjectgroup.name}</p>
                                                </Typography>
                                                <Typography sx={{ display: 'flex', alignItems: 'center', }}>
                                                    {/* <CImage rounded className="mr-4" thumbnail src={`${url}storage/${lesson.image}`} width={100} height={100} alt={lesson.name} /> */}
                                                    <p className="font-bold mr-1"> Asistencia:</p>
                                                    {grade.attendance ? <RiCircleFill className="text-green-600 text-2xl mx-auto" /> : <RiCircleFill className="text-red-600 text-2xl mx-auto" />}
                                                    <p className="font-bold mr-1 ml-2">Calificacion:</p>
                                                    {grade.grade}
                                                </Typography>
                                                <Typography sx={{ display: 'flex', alignItems: 'center', width:'33%', justifyContent:'end' }}>
                                                    <ButtonPrimary className="">Ver</ButtonPrimary>
                                                </Typography>
                                            </MenuItem>
                                        ) : null
                                    ))}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                )}
            </DashboardLayout>
        </>
    )
}



export default MyGrades

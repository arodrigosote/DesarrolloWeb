import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
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


const MyCourses = (auth) => {
    const { pucharses } = usePage().props
    return (
        <>
            <Head>
                <title>Mis cursos</title>
            </Head>
            <DashboardLayout title={'Mis cursos'} auth={auth}>
                {pucharses.length === 0 ? (
                    <div>
                        <p>No hay cursos disponibles.</p>
                        <ButtonPrimary><Link href={route('courses')}>Explorar cursos</Link></ButtonPrimary>
                    </div>
                ) : (
                    <div>
                        <h2>Longitud de cursos: {coursesLength}</h2>
                        {/* Aquí puedes renderizar el resto de tu componente */}
                    </div>
                )}
            </DashboardLayout>
        </>
    )
}



export default MyCourses

import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, useForkRef, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    IconButton
} from '@mui/material';
import { RiCircleFill, RiLoopRightFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonDelete from "@/Components/ButtonDelete";
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import SelectInput from "@mui/material/Select/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import ButtonSecondary from "@/Components/ButtonSecondary";
import SecondaryLink from "@/Components/SecondaryLink";
import ButtonShow from "@/Components/ButtonShow";
import ButtonYellow from "@/Components/ButtonYellow";

const ShowStudent = () => {
    const { student, baseUrl } = usePage().props;
    return (
        <>
            <DashboardLayout title={student.name}>
                <div className="lg:flex sm:block">
                    <div className="lg:w-[33%] sm:w-[100%] flex">
                        <div className="w-[1%]">
                            <IconButton className="">
                                <RiLoopRightFill />
                            </IconButton>
                        </div>
                        <div className="w-[99%] flex items-center">
                            <img src={`${baseUrl}/storage/${student.credential_pic}`} className="rounded-full" alt="" />
                        </div>


                    </div>
                    <div className="w-[66%] my-auto">
                        <h1 className="text-primary font-bold text-xl mt-5">Información del alumno.</h1>
                        <p className="mt-3"><strong>Nombre:</strong> {student.name}</p>
                        <p className="mt2"><strong>Fecha de inicio:</strong> {student.firstday}</p>
                        <p className="mt2"><strong>Asistencias:</strong> </p>
                        <p className="mt2"><strong>Faltas:</strong> </p>
                        <p className="mt2"><strong>Teléfono:</strong> {student.phone}</p>
                        <p className="mt2"><strong>Email:</strong> {student.email}</p>
                        <div className="lg:flex sm:block justify-between mt-4">
                            <ButtonSecondary className="sm:w-[100%] lg:w-auto">Historia académica</ButtonSecondary>
                            <ButtonEdit className="sm:w-[100%] lg:w-auto">Editar</ButtonEdit>
                            <ButtonYellow className="sm:w-[100%] lg:w-auto">Pagos</ButtonYellow>
                            <ButtonSecondary className="sm:w-[100%] lg:w-auto">Credencial</ButtonSecondary>
                        </div>
                    </div>

                </div>
            </DashboardLayout>
        </>
    )
}

export default ShowStudent;

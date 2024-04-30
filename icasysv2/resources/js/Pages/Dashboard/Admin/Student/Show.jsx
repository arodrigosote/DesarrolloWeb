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
import { router } from '@inertiajs/react'
import { CImage } from "@coreui/react";
import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink } from "@react-pdf/renderer";
import Inscription from "@/Pages/PDF/Inscription";


const ShowStudent = () => {
    const { student, baseUrl, auth } = usePage().props;

    const [image, setImage] = useState(false);

    const changeImage = () => {
        setImage(!image);
    }

    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({

    })

    const handleRecibos = () => {
        get(route('alumnos.receipts', student.id))
    }
    const studetnPayment = (id) => {
        get(route('alumnos.payment.show', id));
    }
    return (
        <>
            <Head>
                <title>{student.name}</title>
            </Head>
            <DashboardLayout title={student.name} auth={auth}>
                <div className="lg:flex sm:block">
                    <div className="lg:w-[33%] sm:w-[100%] flex">
                        <div className="w-[1%]">
                            <IconButton onClick={(e) => { changeImage() }} className="bg-white">
                                <RiLoopRightFill />
                            </IconButton>
                        </div>
                        <div className="w-[99%] flex items-center justify-center">
                            {image === false ? (
                                <CImage rounded thumbnail src={`${baseUrl}storage/${student.profile_pic}`} width={230} height={230} />
                            ) : (
                                <CImage rounded thumbnail src={`${baseUrl}storage/${student.credential_pic}`} width={230} height={230} />
                            )}
                        </div>

                    </div>
                    <div className="lg:w-[66%] w-[100%] my-auto mx-auto">
                        <h1 className="text-primary font-bold text-xl mt-5">Información del alumno.</h1>
                        <p className="mt-3"><strong>Nombre:</strong> {student.name}</p>
                        <p className="mt2"><strong>Fecha de inicio:</strong> {student.firstday}</p>
                        <p className="mt2"><strong>Asistencias:</strong> </p>
                        <p className="mt2"><strong>Faltas:</strong> </p>
                        <p className="mt2"><strong>Teléfono:</strong> {student.phone}</p>
                        <p className="mt2"><strong>Email:</strong> {student.email}</p>
                        <div className="lg:flex sm:block justify-between mt-4">
                            <ButtonSecondary className="sm:w-[100%] lg:w-auto">Historia académica</ButtonSecondary>
                            <PDFDownloadLink document={<Inscription student={student} />} fileName={`Formato inscripción ${student.name}`}>
                                {({ loading, url, error, blob }) =>
                                    loading ? (
                                        <ButtonCancel>Cargando...</ButtonCancel>
                                    ) : (
                                        <ButtonSecondary>Formato de inscripción</ButtonSecondary>
                                    )}
                            </PDFDownloadLink>
                            <ButtonEdit className="sm:w-[100%] lg:w-auto">Editar</ButtonEdit>
                            <ButtonEdit className="sm:w-[100%] lg:w-auto" onClick={handleRecibos}>Recibos</ButtonEdit>
                            <ButtonYellow className="sm:w-[100%] lg:w-auto mt-2" onClick={(e) => studetnPayment(student.id)}>Pagos</ButtonYellow>
                            <ButtonSecondary className="sm:w-[100%] lg:w-auto">Credencial</ButtonSecondary>
                        </div>
                    </div>

                </div>
            </DashboardLayout>

        </>
    )
}

export default ShowStudent;

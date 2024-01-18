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
    const { student, baseUrl, payments } = usePage().props;
    // Suponiendo que tienes un array llamado pagos

    // Obtén el número de semanas
    var payed_weeks = payments.length;

    // Crea un array de valores de 0 a 103
    const weeks = Array.from({ length: 104 }, (_, index) => index);


    // Ahora numSemanas contiene la cantidad de elementos en pagos
    // Y semanas contiene un array con valores de 0 a 103

    return (
        <>
            <DashboardLayout title={student.name}>
                <div className="flex justify-self-center text-center">
                    <div className="w-[50%]">
                        semanas no pagadas
                        <table className="table">
                            <thead>
                                {/* <th>student_id</th> */}
                                <th>Número de semana</th>
                                <th>Fecha a pagar</th>
                                <th>Fecha de pago</th>
                                <th>Seleccionar</th>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div className="w-[50%]">
                        semanas pagadas
                        <table className="table">
                            <thead>
                                {/* <th>student_id</th> */}
                                <th>Número de semana</th>
                                <th>Fecha a pagar</th>
                                <th>Fecha de pago</th>
                                <th>Seleccionar</th>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </DashboardLayout>

            <Head>
                <title>Pagos alumno</title>
            </Head>
        </>
    )
}

export default ShowStudent;

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

    const dataset = [];
    const first_day = new Date(student.firstday);

    weeks.forEach((week) => {
        const multiplier = week * 7;
        const date_topay = new Date(first_day);
        date_topay.setDate(date_topay.getDate() + multiplier);

        const data = [week, date_topay.toISOString().split('T')[0]]; // Format as 'YYYY-MM-DD'

        dataset.push(data);
    });

    return (
        <>
            <DashboardLayout title={student.name}>
                <div className="flex justify-self-center text-center">
                    <div className="w-[50%]">
                        semanas pagadas
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Número de semana</th>
                                    <th>Fecha a pagar</th>
                                    <th>Fecha de pago</th>
                                    <th>Seleccionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td style={{ position: 'absolute', visibility: 'hidden', width: 0 }}>
                                            <input type="number" className="form-control" name="student_id"
                                                value={student.id} readOnly required
                                                style={{ position: 'absolute', visibility: 'hidden', width: 0 }}>
                                            </input>
                                        </td>
                                        <td>
                                            <input type="number" className="form-control"
                                                name={`week_${payment.week_topay_number}`}
                                                value={`${payment.weeks.week_topay_number + 1}`} readOnly
                                                required>
                                            </input>
                                        </td>
                                        <td>
                                            <input type="date" className="form-control"
                                                name={`date_topay${payment.week_topay_number}`}
                                                value={payment.week_topay_date} readOnly required>
                                            </input>
                                        </td>
                                        <td>
                                            <input type="date" id="fecha" className="form-control"
                                                name={`date_${payment.week_topay_number}`}
                                                value={payment.date} readOnly required>
                                            </input>
                                        </td>
                                        <td>
                                            <input type="checkbox" name="weeks[]"
                                                value={payment.week_topay_number} defaultChecked disabled
                                                required>
                                            </input>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                    <div className="w-[50%]">
                        semanas no pagadas
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="w-[10%]">Número de semana</th>
                                    <th>Fecha a pagar</th>
                                    <th>Fecha de pago</th>
                                    <th>Seleccionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(dataset)}
                                {dataset.map((dato) => (
                                    <tr key={dato[0]}>
                                        <td className="hidden">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name="student_id"
                                                value={student.id}
                                                readOnly
                                                required
                                                style={{ position: 'absolute', visibility: 'hidden', width: 0 }}
                                            />
                                        </td>
                                        <td className="w-[10%]">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name={`week_${dato[0]}`}
                                                value={dato[0] + 1}
                                                readOnly
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                className="form-control"
                                                name={`date_topay_${dato[0]}`}
                                                value={dato[1]}
                                                readOnly
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                id="fecha"
                                                className="form-control"
                                                name={`date_${dato[0]}`}
                                                value={new Date().toISOString().split('T')[0]}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="checkbox"
                                                name="semanas[]"
                                                value={dato[0]}
                                            />
                                        </td>
                                    </tr>
                                ))}
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

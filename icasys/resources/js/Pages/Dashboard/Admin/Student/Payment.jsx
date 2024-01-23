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
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import MyDocument from "@/Pages/PDF/Receipt";
import { PDFDownloadLink } from "@react-pdf/renderer";


const ShowStudent = () => {

    const [modal, setModal] = useState(false);

    const { student, baseUrl, payments } = usePage().props;
    // Suponiendo que tienes un array llamado pagos
    const currentDate = new Date();
    const formatterCurretDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    // Obtén el número de semanas
    var payed_weeks = payments.length;

    // Crea un array de valores de 0 a 103
    const weeks = Array.from({ length: 104 }, (_, index) => index);

    const dataset = [];
    const dates = [];
    const first_day = new Date(student.firstday);

    weeks.forEach((week) => {
        const multiplier = week * 7;
        const date_topay = new Date(first_day);
        date_topay.setDate(date_topay.getDate() + multiplier);

        dates.push(date_topay.toISOString().split('T')[0]);

        const data = [week, date_topay.toISOString().split('T')[0]]; // Format as 'YYYY-MM-DD' .toISOString().split('T')[0]

        dataset.push(data);
    });

    let nuevoDataset = [...dataset];

    const makePayments = () => {
        payments.forEach((payment) => {
            const dateToRemove = payment.week_topay_date;
            // Filtrar el array para obtener un nuevo array sin la fecha a eliminar
            nuevoDataset = nuevoDataset.filter(data => data[1] !== dateToRemove);
        });
    }

    makePayments();

    const initialData = {};
    const numWeeks = 104;
    for (let i = 0; i < numWeeks; i++) {
        const weekNumber = i + 1;
        initialData[`week_topay_number_${i}`] = weekNumber;
        initialData[`week_topay_date_${i}`] = dates[i];
        initialData[`payment_date_${i}`] = formatterCurretDate;
        initialData[`payment_check_${i}`] = false;

    }

    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        student_id: '',
        ...initialData
    });


    const submit = (e) => {
        e.preventDefault();
        data.student_id = student.id;
        post(route('alumnos.payment', {
            onSuccess: () => { ok('Pagos registrados correctamente.') },
            onError: () => { errorModal('Hubo un error al momento de crear los pagos.') }
        }))

    };

    const ok = (message) => {
        reset();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };

    const errorModal = (message) => {
        reset();
        Swal.fire({ title: message, icon: 'error', confirmButtonColor: '#014ba0' })
    };

    return (
        <>

            <DashboardLayout title={`Pagos de: ${student.name}`}>
                {/* <ButtonEdit onClick={pdf}>Download</ButtonEdit> */}
                <form onSubmit={submit}>

                    <div className="flex justify-end">
                        <ButtonPrimary type='submit' disabled={processing}>Enviar</ButtonPrimary>
                    </div>
                    <div className="xl:flex block justify-around text-center">
                        <div className="">
                            <h2 className="my-4 text-xl">Semanas pagadas</h2>
                            <div className="w-full overflow-x-auto">
                                <table className="">
                                    <thead className="">
                                        <tr>
                                            <th className="hidden">Número de semana</th>
                                            <th className="p-4 text-[14px]">Número de semana</th>
                                            <th className="p-4 text-[14px]">Fecha a pagar</th>
                                            <th className="p-4 text-[14px]">Fecha de pago</th>
                                            <th className="p-4 text-[14px]">Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr key={payment.id} className=" h-12">
                                                <td className="hidden">
                                                    <input
                                                        type="number"
                                                        className="border rounded border-blue-300  text-xs text-center mx-auto"
                                                        name="student_id"
                                                        value={student.id}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td className="">
                                                    <input
                                                        type="number"
                                                        className="border rounded border-blue-300  text-[12px] text-center mx-auto"
                                                        name={`week_${payment.week_topay_number}`}
                                                        value={`${payment.week_topay_number}`}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td className="">
                                                    <input
                                                        type="date"
                                                        className="border rounded border-blue-300  text-[12px] text-center mx-auto"
                                                        name={`date_topay${payment.week_topay_number}`}
                                                        value={payment.week_topay_date}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td className="">
                                                    <input
                                                        type="date"
                                                        id="fecha"
                                                        className="border rounded border-blue-300  text-[12px] text-center mx-auto"
                                                        name={`date_${payment.week_topay_number}`}
                                                        value={payment.payment_day}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td className="">
                                                    <input
                                                        type="checkbox"
                                                        name="weeks[]"
                                                        value={payment.week_topay_number}
                                                        className="appearance-none border border-gray-300 rounded-md checked:bg-slate-400 checked:border-transparent"
                                                        defaultChecked
                                                        disabled
                                                        required
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                        </div>
                        <div className="">
                            <h2 className="my-4 text-xl">Semanas <strong>no</strong> pagadas</h2>
                            <div className="w-full overflow-x-auto">
                                <table className="table">
                                    <thead>

                                        <tr>
                                            <th className="hidden">student_id</th>
                                            <th className="p-4 text-[14px]">Número de semana</th>
                                            <th className="p-4 text-[14px]">Fecha a pagar</th>
                                            <th className="p-4 text-[14px]">Fecha de pago</th>
                                            <th className="p-4 text-[14px]">Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {nuevoDataset.map((dato) => (
                                            <tr key={dato[0]} className="h-12">
                                                <td className="hidden">
                                                    <input
                                                        type="number"
                                                        className="form-control hidden"
                                                        name="student_id"
                                                        value={student.id}
                                                        readOnly
                                                        required
                                                        style={{ position: 'absolute', visibility: 'hidden', width: 0 }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="border rounded border-blue-300  text-[12px] text-center mx-auto"
                                                        name={`week_topay_number_${dato[0]}`}
                                                        value={data[`week_topay_number_${dato[0]}`]}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        className="border rounded border-blue-300  text-[12px] text-center mx-auto"
                                                        name={`week_topay_date_${dato[0]}`}
                                                        value={data[`week_topay_date_${dato[0]}`]}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="date"
                                                        id="date"
                                                        className="border rounded border-blue-300  text-[12px] text-center mx-auto"
                                                        name={`payment_date_${dato[0]}`}
                                                        value={data[`payment_date_${dato[0]}`] || ''}
                                                        onChange={(e) => setData(`payment_date_${dato[0]}`, e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <Switch
                                                        id={`payment_check_${dato[0]}`}
                                                        name={`payment_check_${dato[0]}`}
                                                        checked={data[`payment_check_${dato[0]}`]}
                                                        onChange={(e) => setData(`payment_check_${dato[0]}`, e.target.checked)}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>

                        </div>

                    </div>
                </form>
            </DashboardLayout>


            <Head>
                <title>Pagos alumno</title>
            </Head>
        </>
    )
}

export default ShowStudent;

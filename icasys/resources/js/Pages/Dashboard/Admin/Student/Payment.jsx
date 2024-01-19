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

    payments.forEach((payment) => {
        const weekNumber = payment.week_topay_number;
        // Buscar el índice en el array de fechas (dates)
        console.log(dataset)
        dataset.shift(weekNumber-1);
        console.log(weekNumber);
    });
    console.log(dataset)

    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        student_id: '',
        week_topay_number_0: 1,
        week_topay_date_0: dates[0],
        payment_date_0: formatterCurretDate,
        payment_check_0: false,
        week_topay_number_1: 2,
        week_topay_date_1: dates[1],
        payment_date_1: formatterCurretDate,
        payment_check_1: false,
        week_topay_number_2: 3,
        week_topay_date_2: dates[2],
        payment_date_2: formatterCurretDate,
        payment_check_2: false,
        week_topay_number_3: 4,
        week_topay_date_3: dates[3],
        payment_date_3: formatterCurretDate,
        payment_check_3: false,
        week_topay_number_4: 5,
        week_topay_date_4: dates[4],
        payment_date_4: formatterCurretDate,
        payment_check_4: false,
        week_topay_number_5: 6,
        week_topay_date_5: dates[5],
        payment_date_5: formatterCurretDate,
        payment_check_5: false,
        week_topay_number_6: 7,
        week_topay_date_6: dates[6],
        payment_date_6: formatterCurretDate,
        payment_check_6: false,
        week_topay_number_7: 8,
        week_topay_date_7: dates[7],
        payment_date_7: formatterCurretDate,
        payment_check_7: false,
        week_topay_number_8: 9,
        week_topay_date_8: dates[8],
        payment_date_8: formatterCurretDate,
        payment_check_8: false,
        week_topay_number_9: 10,
        week_topay_date_9: dates[9],
        payment_date_9: formatterCurretDate,
        payment_check_9: false,
        week_topay_number_10: 11,
        week_topay_date_10: dates[10],
        payment_date_10: formatterCurretDate,
        payment_check_10: false,
        week_topay_number_11: 12,
        week_topay_date_11: dates[11],
        payment_date_11: formatterCurretDate,
        payment_check_11: false,
        week_topay_number_12: 13,
        week_topay_date_12: dates[12],
        payment_date_12: formatterCurretDate,
        payment_check_12: false,
        week_topay_number_13: 14,
        week_topay_date_13: dates[13],
        payment_date_13: formatterCurretDate,
        payment_check_13: false,
        week_topay_number_14: 15,
        week_topay_date_14: dates[14],
        payment_date_14: formatterCurretDate,
        payment_check_14: false,
        week_topay_number_15: 16,
        week_topay_date_15: dates[15],
        payment_date_15: formatterCurretDate,
        payment_check_15: false,
        week_topay_number_16: 17,
        week_topay_date_16: dates[16],
        payment_date_16: formatterCurretDate,
        payment_check_16: false,
        week_topay_number_17: 18,
        week_topay_date_17: dates[17],
        payment_date_17: formatterCurretDate,
        payment_check_17: false,
        week_topay_number_18: 19,
        week_topay_date_18: dates[18],
        payment_date_18: formatterCurretDate,
        payment_check_18: false,
        week_topay_number_19: 20,
        week_topay_date_19: dates[19],
        payment_date_19: formatterCurretDate,
        payment_check_19: false,
        week_topay_number_20: 21,
        week_topay_date_20: dates[20],
        payment_date_20: formatterCurretDate,
        payment_check_20: false,
        week_topay_number_21: 22,
        week_topay_date_21: dates[21],
        payment_date_21: formatterCurretDate,
        payment_check_21: false,
        week_topay_number_22: 23,
        week_topay_date_22: dates[22],
        payment_date_22: formatterCurretDate,
        payment_check_22: false,
        week_topay_number_23: 24,
        week_topay_date_23: dates[23],
        payment_date_23: formatterCurretDate,
        payment_check_23: false,
        week_topay_number_24: 25,
        week_topay_date_24: dates[24],
        payment_date_24: formatterCurretDate,
        payment_check_24: false,
        week_topay_number_25: 26,
        week_topay_date_25: dates[25],
        payment_date_25: formatterCurretDate,
        payment_check_25: false,
        week_topay_number_26: 27,
        week_topay_date_26: dates[26],
        payment_date_26: formatterCurretDate,
        payment_check_26: false,
        week_topay_number_27: 28,
        week_topay_date_27: dates[27],
        payment_date_27: formatterCurretDate,
        payment_check_27: false,
        week_topay_number_28: 29,
        week_topay_date_28: dates[28],
        payment_date_28: formatterCurretDate,
        payment_check_28: false,
        week_topay_number_29: 30,
        week_topay_date_29: dates[29],
        payment_date_29: formatterCurretDate,
        payment_check_29: false,
        week_topay_number_30: 31,
        week_topay_date_30: dates[30],
        payment_date_30: formatterCurretDate,
        payment_check_30: false,
        week_topay_number_31: 32,
        week_topay_date_31: dates[31],
        payment_date_31: formatterCurretDate,
        payment_check_31: false,
        week_topay_number_32: 33,
        week_topay_date_32: dates[32],
        payment_date_32: formatterCurretDate,
        payment_check_32: false,
        week_topay_number_33: 34,
        week_topay_date_33: dates[33],
        payment_date_33: formatterCurretDate,
        payment_check_33: false,
        week_topay_number_34: 35,
        week_topay_date_34: dates[34],
        payment_date_34: formatterCurretDate,
        payment_check_34: false,
        week_topay_number_35: 36,
        week_topay_date_35: dates[35],
        payment_date_35: formatterCurretDate,
        payment_check_35: false,
        week_topay_number_36: 37,
        week_topay_date_36: dates[36],
        payment_date_36: formatterCurretDate,
        payment_check_36: false,
        week_topay_number_37: 38,
        week_topay_date_37: dates[37],
        payment_date_37: formatterCurretDate,
        payment_check_37: false,
        week_topay_number_38: 39,
        week_topay_date_38: dates[38],
        payment_date_38: formatterCurretDate,
        payment_check_38: false,
        week_topay_number_39: 40,
        week_topay_date_39: dates[39],
        payment_date_39: formatterCurretDate,
        payment_check_39: false,
        week_topay_number_40: 41,
        week_topay_date_40: dates[40],
        payment_date_40: formatterCurretDate,
        payment_check_40: false,
        week_topay_number_41: 42,
        week_topay_date_41: dates[41],
        payment_date_41: formatterCurretDate,
        payment_check_41: false,
        week_topay_number_42: 43,
        week_topay_date_42: dates[42],
        payment_date_42: formatterCurretDate,
        payment_check_42: false,
        week_topay_number_43: 44,
        week_topay_date_43: dates[43],
        payment_date_43: formatterCurretDate,
        payment_check_43: false,
        week_topay_number_44: 45,
        week_topay_date_44: dates[44],
        payment_date_44: formatterCurretDate,
        payment_check_44: false,
        week_topay_number_45: 46,
        week_topay_date_45: dates[45],
        payment_date_45: formatterCurretDate,
        payment_check_45: false,
        week_topay_number_46: 47,
        week_topay_date_46: dates[46],
        payment_date_46: formatterCurretDate,
        payment_check_46: false,
        week_topay_number_47: 48,
        week_topay_date_47: dates[47],
        payment_date_47: formatterCurretDate,
        payment_check_47: false,
        week_topay_number_48: 49,
        week_topay_date_48: dates[48],
        payment_date_48: formatterCurretDate,
        payment_check_48: false,
        week_topay_number_49: 50,
        week_topay_date_49: dates[49],
        payment_date_49: formatterCurretDate,
        payment_check_49: false,
        week_topay_number_50: 51,
        week_topay_date_50: dates[50],
        payment_date_50: formatterCurretDate,
        payment_check_50: false,
        week_topay_number_51: 52,
        week_topay_date_51: dates[51],
        payment_date_51: formatterCurretDate,
        payment_check_51: false,
        week_topay_number_52: 53,
        week_topay_date_52: dates[52],
        payment_date_52: formatterCurretDate,
        payment_check_52: false,
        week_topay_number_53: 54,
        week_topay_date_53: dates[53],
        payment_date_53: formatterCurretDate,
        payment_check_53: false,
        week_topay_number_54: 55,
        week_topay_date_54: dates[54],
        payment_date_54: formatterCurretDate,
        payment_check_54: false,
        week_topay_number_55: 56,
        week_topay_date_55: dates[55],
        payment_date_55: formatterCurretDate,
        payment_check_55: false,
        week_topay_number_56: 57,
        week_topay_date_56: dates[56],
        payment_date_56: formatterCurretDate,
        payment_check_56: false,
        week_topay_number_57: 58,
        week_topay_date_57: dates[57],
        payment_date_57: formatterCurretDate,
        payment_check_57: false,
        week_topay_number_58: 59,
        week_topay_date_58: dates[58],
        payment_date_58: formatterCurretDate,
        payment_check_58: false,
        week_topay_number_59: 60,
        week_topay_date_59: dates[59],
        payment_date_59: formatterCurretDate,
        payment_check_59: false,
        week_topay_number_60: 61,
        week_topay_date_60: dates[60],
        payment_date_60: formatterCurretDate,
        payment_check_60: false,
        week_topay_number_61: 62,
        week_topay_date_61: dates[61],
        payment_date_61: formatterCurretDate,
        payment_check_61: false,
        week_topay_number_62: 63,
        week_topay_date_62: dates[62],
        payment_date_62: formatterCurretDate,
        payment_check_62: false,
        week_topay_number_63: 64,
        week_topay_date_63: dates[63],
        payment_date_63: formatterCurretDate,
        payment_check_63: false,
        week_topay_number_64: 65,
        week_topay_date_64: dates[64],
        payment_date_64: formatterCurretDate,
        payment_check_64: false,
        week_topay_number_65: 66,
        week_topay_date_65: dates[65],
        payment_date_65: formatterCurretDate,
        payment_check_65: false,
        week_topay_number_66: 67,
        week_topay_date_66: dates[66],
        payment_date_66: formatterCurretDate,
        payment_check_66: false,
        week_topay_number_67: 68,
        week_topay_date_67: dates[67],
        payment_date_67: formatterCurretDate,
        payment_check_67: false,
        week_topay_number_68: 69,
        week_topay_date_68: dates[68],
        payment_date_68: formatterCurretDate,
        payment_check_68: false,
        week_topay_number_69: 70,
        week_topay_date_69: dates[69],
        payment_date_69: formatterCurretDate,
        payment_check_69: false,
        week_topay_number_70: 71,
        week_topay_date_70: dates[70],
        payment_date_70: formatterCurretDate,
        payment_check_70: false,
        week_topay_number_71: 72,
        week_topay_date_71: dates[71],
        payment_date_71: formatterCurretDate,
        payment_check_71: false,
        week_topay_number_72: 73,
        week_topay_date_72: dates[72],
        payment_date_72: formatterCurretDate,
        payment_check_72: false,
        week_topay_number_73: 74,
        week_topay_date_73: dates[73],
        payment_date_73: formatterCurretDate,
        payment_check_73: false,
        week_topay_number_74: 75,
        week_topay_date_74: dates[74],
        payment_date_74: formatterCurretDate,
        payment_check_74: false,
        week_topay_number_75: 76,
        week_topay_date_75: dates[75],
        payment_date_75: formatterCurretDate,
        payment_check_75: false,
        week_topay_number_76: 77,
        week_topay_date_76: dates[76],
        payment_date_76: formatterCurretDate,
        payment_check_76: false,
        week_topay_number_77: 78,
        week_topay_date_77: dates[77],
        payment_date_77: formatterCurretDate,
        payment_check_77: false,
        week_topay_number_78: 79,
        week_topay_date_78: dates[78],
        payment_date_78: formatterCurretDate,
        payment_check_78: false,
        week_topay_number_79: 80,
        week_topay_date_79: dates[79],
        payment_date_79: formatterCurretDate,
        payment_check_79: false,
        week_topay_number_80: 81,
        week_topay_date_80: dates[80],
        payment_date_80: formatterCurretDate,
        payment_check_80: false,
        week_topay_number_81: 82,
        week_topay_date_81: dates[81],
        payment_date_81: formatterCurretDate,
        payment_check_81: false,
        week_topay_number_82: 83,
        week_topay_date_82: dates[82],
        payment_date_82: formatterCurretDate,
        payment_check_82: false,
        week_topay_number_83: 84,
        week_topay_date_83: dates[83],
        payment_date_83: formatterCurretDate,
        payment_check_83: false,
        week_topay_number_84: 85,
        week_topay_date_84: dates[84],
        payment_date_84: formatterCurretDate,
        payment_check_84: false,
        week_topay_number_85: 86,
        week_topay_date_85: dates[85],
        payment_date_85: formatterCurretDate,
        payment_check_85: false,
        week_topay_number_86: 87,
        week_topay_date_86: dates[86],
        payment_date_86: formatterCurretDate,
        payment_check_86: false,
        week_topay_number_87: 88,
        week_topay_date_87: dates[87],
        payment_date_87: formatterCurretDate,
        payment_check_87: false,
        week_topay_number_88: 89,
        week_topay_date_88: dates[88],
        payment_date_88: formatterCurretDate,
        payment_check_88: false,
        week_topay_number_89: 90,
        week_topay_date_89: dates[89],
        payment_date_89: formatterCurretDate,
        payment_check_89: false,
        week_topay_number_90: 91,
        week_topay_date_90: dates[90],
        payment_date_90: formatterCurretDate,
        payment_check_90: false,
        week_topay_number_91: 92,
        week_topay_date_91: dates[91],
        payment_date_91: formatterCurretDate,
        payment_check_91: false,
        week_topay_number_92: 93,
        week_topay_date_92: dates[92],
        payment_date_92: formatterCurretDate,
        payment_check_92: false,
        week_topay_number_93: 94,
        week_topay_date_93: dates[93],
        payment_date_93: formatterCurretDate,
        payment_check_93: false,
        week_topay_number_94: 95,
        week_topay_date_94: dates[94],
        payment_date_94: formatterCurretDate,
        payment_check_94: false,
        week_topay_number_95: 96,
        week_topay_date_95: dates[95],
        payment_date_95: formatterCurretDate,
        payment_check_95: false,
        week_topay_number_96: 97,
        week_topay_date_96: dates[96],
        payment_date_96: formatterCurretDate,
        payment_check_96: false,
        week_topay_number_97: 98,
        week_topay_date_97: dates[97],
        payment_date_97: formatterCurretDate,
        payment_check_97: false,
        week_topay_number_98: 99,
        week_topay_date_98: dates[98],
        payment_date_98: formatterCurretDate,
        payment_check_98: false,
        week_topay_number_99: 100,
        week_topay_date_99: dates[99],
        payment_date_99: formatterCurretDate,
        payment_check_99: false,
        week_topay_number_100: 101,
        week_topay_date_100: dates[100],
        payment_date_100: formatterCurretDate,
        payment_check_100: false,
        week_topay_number_101: 102,
        week_topay_date_101: dates[101],
        payment_date_101: formatterCurretDate,
        payment_check_101: false,
        week_topay_number_102: 103,
        week_topay_date_102: dates[102],
        payment_date_102: formatterCurretDate,
        payment_check_102: false,
        week_topay_number_103: 104,
        week_topay_date_103: dates[103],
        payment_date_103: formatterCurretDate,
        payment_check_103: false,
        week_topay_number_104: 105,
        week_topay_date_104: dates[104],
        payment_date_104: formatterCurretDate,
        payment_check_104: false,
    });

    const handleInputChange = (field, value) => {
        // Actualiza el objeto de datos del formulario con el nuevo valor
        setData(field, value);
    };



    const submit = (e, student_id) => {
        e.preventDefault();
        data.student_id = student.id;
        post(route('alumnos.payment', {
            onSuccess: () => { ok('Alumno dado de alta con éxito') },
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
            <DashboardLayout title={student.name}>
                <form onSubmit={submit} method="POST">
                    <div className="flex justify-end">
                        <ButtonPrimary>Enviar</ButtonPrimary>
                    </div>
                    <div className="flex justify-center text-center">
                        <div className="w-full">
                            <h2>Semanas pagadas</h2>
                            <div className="bg-blue-300 overflow-x-auto">
                                <table className="w-full mx-auto table-auto">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="hidden">Número de semana</th>
                                            <th>Número de semana</th>
                                            <th>Fecha a pagar</th>
                                            <th>Fecha de pago</th>
                                            <th>Seleccionar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr key={payment.id}>
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
                                                <td className="p-2">
                                                    <input
                                                        type="number"
                                                        className=" text-xs text-center mx-auto"
                                                        name={`week_${payment.week_topay_number}`}
                                                        value={`${payment.week_topay_number}`}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        name={`date_topay${payment.week_topay_number}`}
                                                        value={payment.week_topay_date}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="date"
                                                        id="fecha"
                                                        className="form-control"
                                                        name={`date_${payment.week_topay_number}`}
                                                        value={payment.payment_day}
                                                        readOnly
                                                        required
                                                    />
                                                </td>
                                                <td className="p-2">
                                                    <input
                                                        type="checkbox"
                                                        name="weeks[]"
                                                        value={payment.week_topay_number}
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
                        <div className="w-[50%]">
                            semanas no pagadas
                            <table className="table">
                                <thead>

                                    <tr>
                                        <th className="hidden">student_id</th>
                                        <th>Número de semana</th>
                                        <th>Fecha a pagar</th>
                                        <th>Fecha de pago</th>
                                        <th>Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataset.map((dato) => (
                                        <tr key={dato[0]}>
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
                                                    className=""
                                                    name={`week_topay_number_${dato[0]}`}
                                                    value={data[`week_topay_number_${dato[0]}`]}
                                                    readOnly
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="date"
                                                    className="form-control"
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
                                                    className="form-control"
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
                </form>
            </DashboardLayout>

            <Head>
                <title>Pagos alumno</title>
            </Head>
        </>
    )
}

export default ShowStudent;

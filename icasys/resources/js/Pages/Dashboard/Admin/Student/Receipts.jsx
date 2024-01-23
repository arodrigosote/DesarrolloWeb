import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from "react";
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
import 'react-toastify/dist/ReactToastify.css';
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
import { PDFDownloadLink } from "@react-pdf/renderer";
import Receipt from "@/Pages/PDF/Receipt";



const ShowReceipts = (props) => {

    const { student, baseUrl, receipts, auth } = usePage().props;

    //SECCION PARA RECIBIR NOTIFICACION----------------------------------------------------------------------
    const [toastInfo, setToastInfo] = useState(null);
    useEffect(() => {
        // Verificar si hay información de "toast" y mostrar el "toast" correspondiente
        if (props.toast) {
            setToastInfo(props.toast);
        }
    }, [props.toast]);

    useEffect(() => {
        // Mostrar el "toast" cuando se actualice el estado local
        if (toastInfo) {
            toast[toastInfo.tipo](toastInfo.mensaje);
            setToastInfo(null); // Limpiar el estado después de mostrar el "toast"
        }
    }, [toastInfo]);
    //-------------------------------------------------------------------------------------------------------

    return (
        <>
            <ToastContainer />
            <DashboardLayout title={`Recibos de: ${student.name}`} auth={auth}>
                <div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-4 text-[17px] bg-primary text-white border">Alumno</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Fecha de pago</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Número de <br />semanas pagadas</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Importe</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receipt) => (
                                <tr key={receipt.id}>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receipt.student.name}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receipt.date_payment}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receipt.weeks_number}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receipt.amount}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">
                                        <PDFDownloadLink document={<Receipt />} fileName={`Recibo - ${receipt.student.name} - ${receipt.date_payment}`}>
                                            {({loading, url, error, blob}) =>
                                            loading ? (
                                                <ButtonCancel>Cargando...</ButtonCancel>
                                            ) : (
                                                <ButtonSecondary>Descargar</ButtonSecondary>
                                            )}
                                        </PDFDownloadLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardLayout>
            <Head>
                <title>Recibos alumno</title>
            </Head>
        </>


    )

}

export default ShowReceipts;

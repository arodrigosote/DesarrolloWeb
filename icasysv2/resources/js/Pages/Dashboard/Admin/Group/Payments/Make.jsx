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
    Switch
} from '@mui/material';
import { RiCircleFill, RiCheckboxCircleFill } from "react-icons/ri";
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
import 'react-toastify/dist/ReactToastify.css';
import { CImage } from "@coreui/react";
import ButtonYellow from "@/Components/ButtonYellow";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import GroupReceipt from "@/Pages/PDF/GroupReceipt";


const Make = (props) => {



    const { group, professors, schedules, students, auth, baseUrl } = usePage().props;

    //MOSTRAR NOTIFICACIONES EN SISTEMA --------------------------------------------------------
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
    //------------------------------------------------------------------------------------------

    //SHOW GROUP SUBJECTS ----------------------------------------------------------------------
    const handleShowSubjects = ($id) => {
        get(route('grupos.subjects.show', $id))
    }
    //SHOW STUDENT------------------------------------------------------------------------------
    const showStudent = (id) => {
        get(route('alumnos.show', id));
    }


    //------------------------------------------------------------------------------------------
    //Payments algorithm -----------------------------------------------------------------------
    //------------------------------------------------------------------------------------------
    const [dialog, setDialog] = useState(false);
    const [switchChangesCount, setSwitchChangesCount] = useState(0);

    const openDialog = () => {
        setDialog(true);
    }
    const closeDialog = () => {
        setDialog(false);
    }

    const currentDate = new Date();
    const formatterCurretDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayOfWeek = daysOfWeek[currentDate.getDay()];

    const initialData = {};
    students.forEach((student, i) => {
        initialData[`student_id_${student.id}`] = student.id;
        initialData[`payment_date_${student.id}`] = formatterCurretDate;
        initialData[`payment_check_${student.id}`] = false;
    });


    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        date: formatterCurretDate,
        ...initialData
    });

    const handleSwitch = (data, e) => {
        if (e.target.checked === true) {
            setSwitchChangesCount(prevCount => prevCount + 1);
        } else {
            setSwitchChangesCount(prevCount => prevCount - 1);
        }
        setData(`payment_check_${data}`, e.target.checked)
    }

    const submit = (e) => {
        e.preventDefault();
        openDialog(); // Abre el modal de confirmación antes de enviar el formulario
    };

    const cero_weeks = (message) => {
        reset();
        Swal.fire({ title: message, icon: 'error', confirmButtonColor: '#014ba0' })
    };

    const handleConfirmation = () => {
        // Enviar el formulario si se confirma la acción
        if (switchChangesCount === 0) {
            cero_weeks('No es posible crear pago de 0 semanas.')
        } else {
            // data.student_id = student.id;
            post(route('grupos.payment.store', {
                onSuccess: () => { ok('Pagos registrados correctamente.') },
                onError: () => { errorModal('Hubo un error al momento de crear los pagos.') }
            }));
        }

        closeDialog(); // Cierra el modal de confirmación después de enviar el formulario
    };


    const isPaymentDateRegistered = (student, dateToCheck) => {
        // Verifica si el estudiante tiene recibos
        if (!student.receipts || student.receipts.length === 0) {
            return false; // Retorna false si no hay recibos
        }

        // Recorre cada recibo del estudiante
        return student.receipts.some(receipt =>
            // Recorre cada pago del recibo
            receipt.studentpayments.some(payment => {
                // Formatea la fecha del pago
                const paymentDate = new Date(payment.week_topay_date).toISOString().split('T')[0];
                // Compara la fecha del pago con la fecha a verificar
                return paymentDate === dateToCheck;
            })
        );
    };


    // --------------------------------------------------------------------------------------
    // Receipt generation
    // --------------------------------------------------------------------------------------

    // Estado de generacion de PDF --------------------------------------------------------
    const [downloadingReceiptId, setDownloadingReceiptId] = useState(null);
    //-------------------------------------------------------------------------------------

    // Estado para abrir el modal de vista previa
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    // Generacion de PDF ------------------------------------------------------------------
    const handleDownloadClick = () => {
        setPreviewOpen(true);
    };

    const [studentsWithRegisteredPayments, setStudentsWithRegisteredPayments] = useState([]);
    const [matchingReceipts, setMatchingReceipts] = useState([]);

    useEffect(() => {
        // Reset the arrays when students or date change
        setStudentsWithRegisteredPayments([]);
        setMatchingReceipts([]);
        students.forEach(student => {
            const flag = isPaymentDateRegistered(student, formatterCurretDate);
            if (flag) {
                setStudentsWithRegisteredPayments(prevState => [...prevState, student]);
                student.receipts.forEach(receipt => {
                    if (receipt.studentpayments.map(payment => {
                        const paymentDate = new Date(payment.week_topay_date).toISOString().split('T')[0];
                        return paymentDate === formatterCurretDate;
                    })) {
                        setMatchingReceipts(prevState => [...prevState, [student, receipt]]);
                    }
                });
            }
        });
    }, [students, formatterCurretDate]);

    return (
        <>
            <ToastContainer />
            <DashboardLayout title={`Registrando pagos de Grupo: ${group.schedule.day.name} | ${group.schedule.hour.name} | ${group.professor.name}`} auth={auth}>
                <form onSubmit={submit} id="form">

                    {group.schedule.day.name.includes(dayOfWeek) ? (
                        <></>
                    ) : (
                        <div className="flex justify-center mb-3 bg-red-500 text-white py-4">
                            <h3>No se pueden agregar pagos, espere al día de clase</h3>
                        </div>
                    )}



                    <div className="flex justify-end mb-3">
                        {group.schedule.day.name.includes(dayOfWeek) ? <ButtonYellow type="button" onClick={() => handleDownloadClick()} className="mr-3">Generar recibos</ButtonYellow> : <ButtonYellow className="mr-3" disabled={true}>Generar recibos</ButtonYellow>}
                        {group.schedule.day.name.includes(dayOfWeek) ? <ButtonPrimary type='submit'>Generar pagos</ButtonPrimary> : <ButtonPrimary type='submit' disabled={true}>Generar pagos</ButtonPrimary>}
                    </div>


                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>ALUMNO</TableCell>
                                    <TableCell>CORREO</TableCell>
                                    {auth.user.rol === 2 ? (<TableCell>FECHA A PAGAR:</TableCell>) : <></>}
                                    <TableCell>IMPORTE</TableCell>
                                    {auth.user.rol === 2 ? (<TableCell>ACCIONES</TableCell>) : <></>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student) => {
                                    const flag = isPaymentDateRegistered(student, formatterCurretDate); // Asegúrate de pasar un objeto Date

                                    return (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <CImage
                                                    rounded
                                                    thumbnail
                                                    src={`${baseUrl}storage/${student.profile_pic}`}
                                                    width={50}
                                                    height={50}
                                                />
                                            </TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.email}</TableCell>
                                            {auth.user.rol === 2 ? (
                                                <TableCell>{formatterCurretDate} (HOY)</TableCell>
                                            ) : (
                                                <></>
                                            )}
                                            <TableCell>
                                                {student.tuition} pesos
                                            </TableCell>
                                            <TableCell>
                                                {flag ? <RiCheckboxCircleFill className="text-green-500 text-lg py-0 my-0"></RiCheckboxCircleFill> : <></>}
                                                <Switch
                                                    id={`payment_check_${student.id}`}
                                                    name={`payment_check_${student.id}`}
                                                    checked={data[`payment_check_${student.id}`]}
                                                    onChange={(e) => { handleSwitch(student.id, e) }}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                    disabled={group.schedule.day.name.includes(dayOfWeek) === false || flag}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}



                            </TableBody>


                        </Table>
                    </TableContainer>

                </form>

            </DashboardLayout>

            <Head>
                <title>Pagos</title>
            </Head>

            <Dialog open={dialog} onClose={closeDialog}>
                <DialogTitle>
                    <p className="text-primary font-bold">Detalles de pago</p>
                </DialogTitle>
                <DialogContent>
                    <p>¿Estás seguro de que deseas crear los pagos?</p>
                    <p><strong>Semanas a pagar:</strong> {switchChangesCount}</p>
                    {/* <p><strong>Importe</strong> {switchChangesCount * student.tuition} pesos</p> */}
                </DialogContent>
                <DialogActions>
                    <ButtonPrimary className="mt-2 py-3 text-xs" onClick={handleConfirmation} >
                        Confirmar
                    </ButtonPrimary>
                    <ButtonCancel onClick={closeDialog} >
                        Cancelar
                    </ButtonCancel>
                </DialogActions>

            </Dialog>


            {/* Receipt modal */}
            <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="lg" fullWidth>
                <DialogTitle>Vista Previa del Recibo</DialogTitle>
                <DialogContent>
                    <PDFViewer width="100%" height="500">

                        <GroupReceipt
                            matchingReceipts = {matchingReceipts}
                        />

                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <ButtonCancel onClick={() => setPreviewOpen(false)}>Cerrar</ButtonCancel>
                    {matchingReceipts && (
                        <PDFDownloadLink
                            document={<GroupReceipt  matchingReceipts = {matchingReceipts}/>}
                            fileName={`Recibos`}
                        >
                            {({ loading }) =>
                                loading ? (
                                    <ButtonCancel>Cargando...</ButtonCancel>
                                ) : (
                                    <ButtonSecondary>Descargar</ButtonSecondary>
                                )
                            }
                        </PDFDownloadLink>
                    )}
                </DialogActions>
            </Dialog>

        </>
    )
}

// ShowGroup.layout = page => <DashboardLayout children={page} title={'Mostrando grupos en sistema'}></DashboardLayout>

export default Make;

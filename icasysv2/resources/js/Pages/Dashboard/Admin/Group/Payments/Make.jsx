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
import { RiCircleFill } from "react-icons/ri";
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
    const initialData = {};
    students.forEach((student, i) => {
        initialData[`student_id`] = student.id;
        initialData[`payment_date_${student.id}`] = formatterCurretDate;
        initialData[`payment_check_${student.id}`] = false;
    });


    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        student_id: '',
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

    const handleConfirmation = () => {
        // Enviar el formulario si se confirma la acción
        if (switchChangesCount === 0) {
            cero_weeks('No es posible crear pago de 0 semanas.')
        } else {
            data.student_id = student.id;
            post(route('alumnos.payment', {
                onSuccess: () => { ok('Pagos registrados correctamente.') },
                onError: () => { errorModal('Hubo un error al momento de crear los pagos.') }
            }));
        }

        closeDialog(); // Cierra el modal de confirmación después de enviar el formulario
    };

    return (
        <>
            <ToastContainer />
            <DashboardLayout title={`Registrando pagos de Grupo: ${group.schedule.day.name} | ${group.schedule.hour.name} | ${group.professor.name}`} auth={auth}>
                <form onSubmit={submit} id="form">
                    <div className="flex justify-end mb-3">
                        <ButtonPrimary type='submit'>Generar pagos</ButtonPrimary>
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
                                {students.map((student) => (
                                    <TableRow key={student.id}>
                                        <TableCell><CImage rounded thumbnail src={`${baseUrl}storage/${student.profile_pic}`} width={50} height={50} /></TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        {auth.user.rol === 2 ? (<TableCell>{formatterCurretDate} (HOY)</TableCell>) : <></>}
                                        <TableCell>
                                            {/* <Switch checked={student.active} disabled /> */}
                                            {/* {student.active === 1 ? <RiCircleFill className="text-green-600 text-2xl mx-auto" /> : <RiCircleFill className="text-red-600 text-2xl mx-auto" />} */}
                                            {student.tuition} pesos
                                        </TableCell>
                                        <TableCell>
                                            <Switch
                                                id={`payment_check_${student.id}`}
                                                name={`payment_check_${student.id}`}
                                                checked={data[`payment_check_${student.id}`]}
                                                onChange={(e) => { handleSwitch(student.id, e) }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            {/* <Switch
                                                id={`payment_check_${dato[0]}`}
                                                name={`payment_check_${dato[0]}`}
                                                checked={data[`payment_check_${dato[0]}`]}
                                                onChange={(e) => { handleSwitch(dato[0], e) }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            /> */}
                                        </TableCell>
                                    </TableRow>
                                ))}

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
                    {/* <p>¿Estás seguro de que deseas crear el pago?</p>
                            <p><strong>Semanas a pagar:</strong> {switchChangesCount}</p>
                            <p><strong>Importe</strong> {switchChangesCount * student.tuition} pesos</p> */}
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
        </>
    )
}

// ShowGroup.layout = page => <DashboardLayout children={page} title={'Mostrando grupos en sistema'}></DashboardLayout>

export default Make;

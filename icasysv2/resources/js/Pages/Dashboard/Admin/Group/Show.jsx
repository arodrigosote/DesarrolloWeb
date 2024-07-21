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
import ButtonYellow from "@/Components/ButtonYellow";


const ShowGroup = (props) => {



    const { group, professors, schedules, students,auth } = usePage().props;

    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
    })

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

    const studentPayment = (id) => {
        get(route('alumnos.payment.show', id));
    }


    return (
        <>
            <ToastContainer />
            <DashboardLayout title={`Grupo: ${group.schedule.day.name} | ${group.schedule.hour.name} | ${group.professor.name}`} auth={auth}>
                <div className="flex justify-end">
                    <ButtonPrimary onClick={(e)=>{handleShowSubjects(group.id)}}>Ver materias</ButtonPrimary>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ALUMNO</TableCell>
                                <TableCell>CORREO</TableCell>
                                {auth.user.rol === 2 ? (<TableCell>TELEFONO</TableCell>):<></>}
                                <TableCell>ACTIVO</TableCell>
                                {auth.user.rol === 2 ? (<TableCell>ACCIONES</TableCell>):<></>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    {auth.user.rol === 2 ? (<TableCell>{student.phone}</TableCell>):<></>}
                                    <TableCell>
                                        {/* <Switch checked={student.active} disabled /> */}
                                        {student.active === 1 ? <RiCircleFill className="text-green-600 text-2xl mx-auto" /> : <RiCircleFill className="text-red-600 text-2xl mx-auto" />}
                                    </TableCell>
                                    <TableCell>
                                        {auth.user.rol === 2 ? (
                                            <>
                                            <ButtonYellow type='button' className="md:inline-block w-full my-0" onClick={(e) => studentPayment(student.id)}>Pago</ButtonYellow>
                                            <ButtonShow className="md:inline-block w-full my-0" onClick={() => showStudent(student.id)}>
                                            Mostrar
                                        </ButtonShow>
                                        </>
                                        ):(<></>)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </DashboardLayout>

            <Head>
                <title>Grupos</title>
            </Head>
        </>
    )
}

// ShowGroup.layout = page => <DashboardLayout children={page} title={'Mostrando grupos en sistema'}></DashboardLayout>

export default ShowGroup;

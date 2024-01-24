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


const ShowLessonsSubject = (props) => {

    const { subjects, auth, group, subjectsgroup } = usePage().props;
    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const idInput = useRef();
    const group_idInput = useRef();
    const subject_idInput = useRef();
    const start_dateInput = useRef();
    const finish_dateInput = useRef();
    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        id: '',
        group_id: '',
        subject_id: '',
        start_date: '',
        finish_date: '',
        name: '',
    })

    //HANDLE MODAL------------------------------------------------------------------------------
    const openMainModal = (op, id, group_id, subject_id, start_date, finish_date) => {
        setMainModal(true);
        setOperation(op);
        setData({
            id: '',
            group_id: group.id,
            subject_id: '',
            start_date: '',
            finish_date: '',
            name: '',
        })
        if (op === 1) {
            setTitle('Añadir materia');
        } else {
            setTitle('Editar materia');
            setData({
                id: id,
                group_id: group_id,
                subject_id: subject_id,
                start_date: start_date,
                finish_date: finish_date,
            })
        }
    }
    const closeMainModal = () => {
        setMainModal(false);
    }
    //------------------------------------------------------------------------------------------

    //SUBMIT------------------------------------------------------------------------------------
    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('grupos.subjects.store'), {
                onSuccess: () => { ok('Materia creada con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.group_id) { reset('group_id'); group_idInput.current.focus(); }
                    if (errors.subject_id) { reset('subject_id'); subject_idInput.current.focus(); }
                    if (errors.start_date) { reset('start_date'); start_dateInput.current.focus(); }
                    if (errors.finish_date) { reset('finish_date'); finish_dateInput.current.focus(); }
                }
            });
        } else {
            put(route('grupos.subjects.update', data.id), {
                onSuccess: () => { ok('Materia editada con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.group_id) { reset('group_id'); group_idInput.current.focus(); }
                    if (errors.subject_id) { reset('subject_id'); subject_idInput.current.focus(); }
                    if (errors.start_date) { reset('start_date'); start_dateInput.current.focus(); }
                    if (errors.finish_date) { reset('finish_date'); finish_dateInput.current.focus(); }
                }
            });
        }
    }
    //------------------------------------------------------------------------------------------

    //HANDLE DELETE MODAL-----------------------------------------------------------------------
    const [deleteModal, setDeleteModal] = useState(false);
    const openDeleteModal = (subjectgroup_id, name) => {
        setDeleteModal(true);
        setData({
            id: subjectgroup_id,
            name: name,
        })
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
    }
    const deleteSubject = (e) => {
        e.preventDefault();
        destroy(route('grupos.subjects.delete', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Día eliminado con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar el día.');
            },
            onFinish: reset(),
        });
    }
    //------------------------------------------------------------------------------------------

    //OK AND ERROR MODAL------------------------------------------------------------------------
    const ok = (message) => {
        reset();
        closeMainModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };
    const errorModal = (message) => {
        reset();
        closeMainModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'error', confirmButtonColor: '#014ba0' })
    };
    //------------------------------------------------------------------------------------------

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

    //HANDLE FUNTIONS TO MANAGE EDIT, SHOW, AND DELETE -----------------------------------------
    const handleShowLessons = (subjectgroup, group) => {
        get(route('grupos.lessons.show', [subjectgroup, group]))
    }
    //------------------------------------------------------------------------------------------

    return (
        <>
            <ToastContainer />
            <DashboardLayout title={`Materias: ${group.schedule.day.name} | ${group.schedule.hour.name} | ${group.professor.name} `} auth={auth}>
                <div className="flex justify-end">
                    <ButtonSecondary onClick={() => { openMainModal(1) }}>Agregar</ButtonSecondary>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>MATERIA</TableCell>
                                <TableCell>INICIO</TableCell>
                                <TableCell>FIN</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjectsgroup.map((subject) => (
                                <TableRow key={subject.id}>
                                    <TableCell>{subject.subject.name}</TableCell>
                                    <TableCell>{subject.start_date}</TableCell>
                                    <TableCell>{subject.finish_date}</TableCell>
                                    <TableCell>
                                        <ButtonPrimary onClick={() => { handleShowLessons(subject.id, subject.group_id) }}>
                                            Ver clases
                                        </ButtonPrimary>
                                        <ButtonEdit onClick={() => openMainModal(2, subject.id, subject.group_id, subject.subject_id, subject.start_date, subject.finish_date)}>
                                            Editar
                                        </ButtonEdit>
                                        <ButtonDelete onClick={() => openDeleteModal(subject.id, subject.subject.name)}>
                                            Delete
                                        </ButtonDelete>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </DashboardLayout>

            <Modal show={mainModal} onClose={closeMainModal}>
                <h2 className="text-3xl font-medium text-gray-900 pl-6 pr-6 pt-6 text-primary font-extrabold">
                    {title}
                </h2>

                <form onSubmit={submit} className=" pl-6 pr-6 pb-6 ">
                    <div className="mt-6">
                        <InputLabel htmlFor='group_id' value='Grupo'></InputLabel>
                        <TextInput readOnly id='group_id' name='group_id' ref={group_idInput} value={group.id} required='required' onChange={(e) => setData('group_id', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='subject' value='Materia'></InputLabel>
                        <Select
                            className="w-full mt-1"
                            id='subject_id'
                            ref={subject_idInput}
                            value={data.subject_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("subject_id", e.target.value)}
                        >
                            {subjects.map((subject) => (
                                <MenuItem key={subject.id} value={subject.id}>
                                    {subject.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='start_date' value='Fecha de inicio: ' className="mt-2" />
                        <TextInput className='' type='date' id='start_date' name='start_date' ref={start_dateInput} value={data.start_date || ''} onChange={(e) => setData("start_date", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='finish_date' value='Fecha de fin: ' className="mt-2" />
                        <TextInput className='' type='date' id='finish_date' name='finish_date' ref={finish_dateInput} value={data.finish_date || ''} onChange={(e) => setData("finish_date", e.target.value)} />
                        <InputError message={errors.make} />

                    </div>
                    <div className="mt-6">


                    </div>
                    <div className="mt-6 flex justify-end">
                        <ButtonCancel type='button' onClick={closeMainModal}>Cancel</ButtonCancel>
                        <ButtonPrimary disabled={processing} className="ml-3">Guardar</ButtonPrimary>
                    </div>
                </form>
            </Modal>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar la materia "{data.name}"?
                    </h2>
                </div>
                <form onSubmit={deleteSubject} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="">Cancelar</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Borrar Materia
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>


            <Head>
                <title>Grupos</title>
            </Head>
        </>
    )
}

// ShowGroup.layout = page => <DashboardLayout children={page} title={'Mostrando grupos en sistema'}></DashboardLayout>

export default ShowLessonsSubject;

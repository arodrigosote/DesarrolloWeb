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


const ShowSubjectsGroup = (props) => {

    const { subjects, auth, group, subjectgroup, lessons } = usePage().props;
    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const idInput = useRef();
    const nameInput = useRef();
    const descriptionInput = useRef();
    const dateInput = useRef();
    const subjectgroup_idInput = useRef();
    const group_idInput = useRef();
    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        description: '',
        date: '',
        subjectgroup_id: subjectgroup.id,
        group_id:group.id,
    })

    //HANDLE MODAL------------------------------------------------------------------------------
    const openMainModal = (op, id, name, description, date, subjectgroup_id, group_id) => {
        setMainModal(true);
        setOperation(op);
        setData({
            id: '',
            name: '',
            description: '',
            date: '',
            subjectgroup_id: subjectgroup.id,
            group_id: group.id,
        })
        if (op === 1) {
            setTitle('Añadir clase');
        } else {
            setTitle('Editar clase');
            setData({
                id: id,
                name: name,
                description: description,
                date: date,
                subjectgroup_id: subjectgroup_id,
                group_id: group_id,
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
            post(route('grupos.lessons.store'), {
                onSuccess: () => { ok('Clase creada con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.description) { reset('description'); descriptionInput.current.focus(); }
                    if (errors.date) { reset('date'); dateInput.current.focus(); }
                    if (errors.subjectgroup_id) { reset('subjectgroup_id'); subjectgroup_idInput.current.focus(); }
                    if (errors.group_id) { reset('group_id'); group_idInput.current.focus(); }
                }
            });
        } else {
            put(route('grupos.lessons.update', data.id), {
                onSuccess: () => { ok('Clase editada con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.description) { reset('description'); descriptionInput.current.focus(); }
                    if (errors.date) { reset('date'); dateInput.current.focus(); }
                    if (errors.subjectgroup_id) { reset('subjectgroup_id'); subjectgroup_idInput.current.focus(); }
                    if (errors.group_id) { reset('group_id'); group_idInput.current.focus(); }
                }
            });
        }
    }
    //------------------------------------------------------------------------------------------

    //HANDLE DELETE MODAL-----------------------------------------------------------------------
    const [deleteModal, setDeleteModal] = useState(false);
    const openDeleteModal = (lesson_id, name) => {
        setDeleteModal(true);
        setData({
            id: lesson_id,
            name: name,
        })
    }
    const closeDeleteModal = () => {
        setDeleteModal(false);
    }
    const deleteSubject = (e) => {
        e.preventDefault();
        destroy(route('grupos.lessons.delete', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Clase eliminada con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar la clase.');
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
    const handleShowGrades = (lessonId) => {
        get(route('grupos.grades', lessonId));
    }
    //------------------------------------------------------------------------------------------

    return (
        <>
            <ToastContainer />
            <DashboardLayout title={`Clases: ${subjectgroup.subject.name}`} auth={auth}>
                <div className="flex justify-end">
                    <ButtonSecondary onClick={() => { openMainModal(1) }}>Agregar</ButtonSecondary>
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>NOMBRE</TableCell>
                                <TableCell>DESCRIPCIÓN</TableCell>
                                <TableCell>FECHA</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lessons.map((lesson) => (
                                <TableRow key={lesson.id}>
                                    <TableCell>{lesson.name}</TableCell>
                                    <TableCell>{lesson.description}</TableCell>
                                    <TableCell>{lesson.date}</TableCell>
                                    <TableCell>
                                        {/* <form onSubmit={handleShowGrades(lesson.id)}>
                                            <ButtonPrimary>
                                                Calificaciones
                                            </ButtonPrimary>
                                        </form> */}
                                        <ButtonPrimary onClick={() => handleShowGrades(lesson.id)}>
                                            Calificaciones
                                        </ButtonPrimary>

                                        <ButtonEdit onClick={(e) => openMainModal(2, lesson.id, lesson.name, lesson.description, lesson.date, lesson.subjectgroup_id, lesson.group_id)}>
                                            Editar
                                        </ButtonEdit>
                                        <ButtonDelete onClick={(e) => openDeleteModal(lesson.id, lesson.name)}>
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
                        <InputLabel htmlFor='name' value='Nombre'></InputLabel>
                        <TextInput id='name' name='name' ref={nameInput} value={data.name || ''} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='description' value='Descripción'></InputLabel>
                        <TextField multiline className="w-full" rows={4} id="description" name="description" ref={descriptionInput} value={data.description || ''} onChange={(e) => setData('description', e.target.value)} />
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='date' value='Fecha: ' />
                        <TextInput className='' type='date' id='date' name='date' ref={dateInput} value={data.date || ''} onChange={(e) => setData("date", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='subjectgroup_id' value='Materia: ' className="mt-2" />
                        <TextInput className='' readOnly id='subjectgroup_id' name='subjectgroup_id' ref={subjectgroup_idInput} value={data.subjectgroup_id} onChange={(e) => setData("subjectgroup_id", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='group_id' value='Grupo: ' className="mt-2" />
                        <TextInput className='' readOnly id='subjectgroup_id' name='subjectgroup_id' ref={subjectgroup_idInput} value={data.group_id} onChange={(e) => setData("subjectgroup_id", e.target.value)} />
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
                            Borrar Clase
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>


            <Head>
                <title>Clases</title>
            </Head>
        </>
    )
}

// ShowGroup.layout = page => <DashboardLayout children={page} title={'Mostrando grupos en sistema'}></DashboardLayout>

export default ShowSubjectsGroup;

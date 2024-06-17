import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Head, useForm } from "@inertiajs/react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import ButtonDelete from "@/Components/ButtonDelete";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonCancel from "@/Components/ButtonCancel";
import SecondaryLink from "@/Components/SecondaryLink";


const Index = ({ days, auth }) => {

    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const nameInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        name: ''
    });
    const openModal = (op, id, name) => {
        setModal(true);
        setOperation(op);
        setData({
            name: ''
        })
        if (op === 1) {
            setTitle('Añadir dia');
        } else {
            setTitle('Editar día');
            setData({
                id: id,
                name: name
            })
        }
    }
    const closeModal = () => {
        setModal(false);
    }

    const save = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('dias.store'), {
                onSuccess: () => { ok('Día guardado con éxito') },
                onError: () => {
                    if (errors.name) {
                        reset('name');
                        nameInput.current.focus();
                    }
                }
            });
        } else {
            put(route('dias.update', data.id), {
                onSuccess: () => { ok('Día editado con éxito') },
                onError: () => {
                    if (errors.name) {
                        reset('name');
                        nameInput.current.focus();
                    }
                }
            });
        }
    }

    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (dayID, name) => {
        setDeleteModal(true);
        setData({
            id: dayID,
            name: name,
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const deleteDay = (e) => {
        e.preventDefault();
        destroy(route('dias.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Día eliminado con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar el día.');
            },
            onFinish: reset(),
        });
    }


    const ok = (message) => {
        reset();
        closeModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };



    return (
        <>
            <ToastContainer></ToastContainer>
            <DashboardLayout title="Mostrando solicitudes de ayuda" auth={auth}>
                <div className="flex justify-between mb-8">

                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><span className="font-bolder uppercase">ID</span></TableCell>
                                <TableCell><h2 className="font-bold uppercase">Nombre</h2></TableCell>
                                <TableCell><h2 className="font-bold uppercase">Acciones</h2></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        </TableBody>
                    </Table>
                </TableContainer>
            </DashboardLayout>

            <Head>
                <title>Mostrar Dias - Admin</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>

            <Modal show={modal} onClose={closeModal}>
                <h2 className="text-3xl font-medium text-gray-900 pl-6 pr-6 pt-6 text-primary font-extrabold">
                    {title}
                </h2>

                <form onSubmit={save} className=" pl-6 pr-6 pb-6 ">
                    <div className="mt-6">
                        <InputLabel htmlFor='name' value='Nombre'></InputLabel>
                        <TextInput id='name' name='name' ref={nameInput} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>
                    </div>
                    <div className="mt-6">


                    </div>
                    <div className="mt-6 flex justify-end">
                        <ButtonCancel type='button' onClick={closeModal}>Cancel</ButtonCancel>
                        <ButtonPrimary disabled={processing} className="ml-3">Guardar</ButtonPrimary>
                    </div>
                </form>
            </Modal>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar el dia "{data.name}"?
                    </h2>
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Esta acción no se puede revertir.
                    </p> */}
                </div>
                <form onSubmit={deleteDay} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="">Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Borrar Día
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    )
}

// Index.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Index

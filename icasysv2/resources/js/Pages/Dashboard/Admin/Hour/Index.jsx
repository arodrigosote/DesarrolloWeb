import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import React from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl } from '@mui/material';
import { Head, useForm } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonDelete from "@/Components/ButtonDelete";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import SecondaryLink from "@/Components/SecondaryLink";




const Hour = ({ hours, auth }) => {

    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const nameInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        name: ''
    })

    const openMainModal = (op, id, name) => {
        setMainModal(true);
        setOperation(op);
        setData({
            name: ''
        })
        if (op === 1) {
            setTitle('Añadir hora.');
        } else {
            setTitle('Editar hora.');
            setData({
                id: id,
                name: name
            })
        }
    }

    const closeMainModal = () => {
        setMainModal(false);
    }

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('horas.store'), {
                onSuccess: () => { ok('Hora guardada con éxito') },
                onError: () => {
                    if (errors.name) {
                        reset('name');
                        nameInput.current.focus();
                    }
                }
            });
        } else {
            put(route('horas.update', data.id), {
                onSuccess: () => { ok('Hora actualizada con éxito') },
                onError: () => {
                    if (errors.name) {
                        reset('name');
                        nameInput.current.focus();
                    }
                }
            })
        }
    }

    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (hourID, name) => {
        setDeleteModal(true);
        setData({
            id: hourID,
            name: name,
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const deleteHour = (e) => {
        e.preventDefault();
        destroy(route('horas.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Hora eliminada con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar el día.');
            },
            onFinish: reset(),
        });
    }

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
    return (
        <>
            <ToastContainer></ToastContainer>
            <DashboardLayout title={'Mostrando horas en sistema'} auth={auth}>
                <div className="flex justify-between mb-8">
                    <SecondaryLink to={route('horarios.index')}>Ver horarios</SecondaryLink>
                    <ButtonPrimary onClick={() => { openMainModal(1) }}>Agregar</ButtonPrimary>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>NOMBRE</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hours.map((hour) => (
                                <TableRow key={hour.id}>
                                    <TableCell>{hour.id}</TableCell>
                                    <TableCell>{hour.name}</TableCell>
                                    <TableCell>
                                        <ButtonEdit onClick={() => openMainModal(2, hour.id, hour.name)} className="mr-2">Editar</ButtonEdit>
                                        <ButtonDelete type="button" onClick={() => { openDeleteModal(hour.id, hour.name) }}>Eliminar</ButtonDelete>
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
                        <TextInput id='name' name='name' ref={nameInput} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>
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
                        ¿Estás seguro que quieres eliminar el dia "{data.name}"?
                    </h2>
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Esta acción no se puede revertir.
                    </p> */}
                </div>
                <form onSubmit={deleteHour} className="p-6">

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

            <Head>
                <title>Mostrar Horas - Admin</title>
                <meta name="Hours Index" content="It shows created hours" />
            </Head>
        </>
    )

}

// Hour.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Hour;

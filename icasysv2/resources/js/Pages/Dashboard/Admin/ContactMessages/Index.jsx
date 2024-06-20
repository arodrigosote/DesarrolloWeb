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
import ButtonSecondary from "@/Components/ButtonSecondary";




const Message = ({ messages, auth }) => {

    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [operation, setOperation] = useState(1);
    const nameInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        name: ''
    })

    const openMainModal = (id, name, subject, message) => {
        setSubject(subject);
        setMessage(message);
        setName(name);
        setTitle('Mensaje');
        setMainModal(true);
    }

    const closeMainModal = () => {
        setMainModal(false);
    }

    const submit = (e) => {

    }

    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (messageID, name) => {
        setDeleteModal(true);
        setData({
            id: messageID,
            name: name,
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const deletemessage = (e) => {
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
            <DashboardLayout title={'Mensajes recibidos'} auth={auth}>
                <div className="flex justify-between mb-8">
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Asunto</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {messages.map((message) => (
                                <TableRow key={message.id}>
                                    <TableCell>{message.name}</TableCell>
                                    <TableCell>{message.subject}</TableCell>
                                    <TableCell>{message.created_at}</TableCell>
                                    <TableCell>
                                        <ButtonSecondary onClick={() => openMainModal(message.id, message.name, message.subject, message.content)}>Ver</ButtonSecondary>
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
                <div className="p-6">
                    <h3 className="mt-4"><strong>De:</strong> {name}</h3>
                    <h3 className="mt-4"><strong>Asunto:</strong> {subject}</h3>
                    <p className="mt-4"><strong>Mensaje:</strong> {message}</p>
                </div>
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
                <form onSubmit={deletemessage} className="p-6">

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
                <title>Mensajes - Admin</title>
                <meta name="messages Index" content="It shows created messages" />
            </Head>
        </>
    )

}

// message.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Message;

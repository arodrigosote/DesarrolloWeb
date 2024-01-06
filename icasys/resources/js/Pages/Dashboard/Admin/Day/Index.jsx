import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Head, useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { RiEditBoxLine, RiDeleteBin6Fill } from "react-icons/ri";
import { Inertia } from '@inertiajs/inertia';
import Modal from "@/Components/Modal";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import ButtonDelete from "@/Components/ButtonDelete";
import ButtonEdit from "@/Components/ButtonEdit";


const Index = ({ days, props }) => {

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
            post(route('dias.store'),{
                onSuccess: () => { ok('Día guardado con éxito') },
                onError: () => {
                    if(errors.name){
                        reset('name');
                        nameInput.current.focus();
                    }
                }
            });
        }else{
            put(route('dias.update', data.id),{
                onSuccess: () => { ok('Día editado con éxito') },
                onError: () => {
                    if(errors.name){
                        reset('name');
                        nameInput.current.focus();
                    }
                }
            });
        }
    }



    const ok = (message) => {
        reset();
        closeModal();
        // useEffect is typically used at the component level, not inside functions
        // Instead, you can directly check the success condition and display the success message
        Swal.fire({title:message, icon:'success'})
    };

    const deletee = (id, name) => {
        const alert = Swal.mixin({
            buttonsStyling:true
        });
        alert.fire({
            title:`¿Está seguro que quiere eliminar ${name}?`,
            text:'Se perderá el día',
            icon:'question',
            showCancelButton:true,
            confirmButtonText:'Eliminar',
            cancelButtonText:'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('dias.destroy', id),
                {onSuccess: ()=>{
                    ok('Día eliminado correctamente');
                }})
            }
        })
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="flex justify-end mb-8">
                <ButtonPrimary onClick={() => openModal(1)} className="bg-primary">Agregar</ButtonPrimary>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><span className="font-bold uppercase">ID</span></TableCell>
                            <TableCell><h2 className="font-bold uppercase">Nombre</h2></TableCell>
                            <TableCell><h2 className="font-bold uppercase">Acciones</h2></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {days.map((day) => (
                            <TableRow key={day.id}>
                                <TableCell>{day.id}</TableCell>
                                <TableCell>{day.name}</TableCell>
                                <TableCell>
                                    <ButtonEdit onClick={() => openModal(2, day.id, day.name)} className="mr-2">Editar</ButtonEdit>
                                    <ButtonDelete onClick={() => deletee(day.id, day.name)}>Eliminar</ButtonDelete>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Head>
                <title>Mostrar Dias - Admin</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>

            <Modal show={modal} onClose={closeModal}>
                <h2 className="text-lg font-medium text-gray-900">
                    {title}
                </h2>

                <form onSubmit={save} className="p-6">
                    <div className="mt-6">
                            <InputLabel htmlFor='name' value='Nombre'></InputLabel>
                            <TextInput id='name' name='name' ref={nameInput} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                            <InputError message={errors.make}></InputError>
                    </div>
                    <div className="mt-6">


                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <ButtonPrimary processing={processing ? 'true' : undefined}>Guardar</ButtonPrimary>
                        {/* <DangerButton className="ml-3" disabled={processing}>
                            Borrar Día
                        </DangerButton> */}
                    </div>
                </form>
            </Modal>
        </>
    )
}

Index.layout = page => <DashboardLayout children={page} title="Mostrando dias en sistema"></DashboardLayout>

export default Index

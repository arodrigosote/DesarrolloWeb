import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl } from '@mui/material';
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

const Schedule = () => {

    const { days, hours, schedules } = usePage().props;

    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const dayInput = useRef();
    const hourInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        day_id: '',
        hour_id: '',
        day_name: '',
        hour_name: ''
    })

    const openMainModal = (op, id, day_id, hour_id) => {
        setMainModal(true);
        setOperation(op);
        setData({
            day_id: '',
            hour_id: '',
            id:''

        })
        if (op === 1) {
            setTitle('Añadir horario');
        } else {
            setTitle('Editar horario');
            setData({
                id: id,
                day_id: day_id,
                hour_id: hour_id,
            })
        }
    }

    const closeMainModal = () => {
        setMainModal(false);
    }

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('horarios.store'), {
                onSuccess: () => { ok('Horario guardado con éxito.') },
                onError: () => {
                    if (errors.day_id) {
                        reset('day_id');
                        dayInput.current.focus();
                    }
                    if (errors.hour_id) {
                        reset('hour_id');
                        hourInput.current.focus();
                    }
                }
            })
        } else {
            put(route('horarios.update', data.id), {
                onSuccess: () => { ok('Horario actualizado con éxito') },
                onError: () => {
                    if (errors.day_id) {
                        reset('day_id');
                        dayInput.current.focus();
                    }
                    if (errors.hour_id) {
                        reset('hour_id');
                        hourInput.current.focus();
                    }
                }
            })
        }
    }


    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (scheduleID, scheduleDay, scheduleHour) => {
        setDeleteModal(true);
        setData({
            id:scheduleID,
            day_name: scheduleDay,
            hour_name: scheduleHour
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const deletee = (e) => {
        e.preventDefault()
        destroy(route('horarios.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => {ok('Horario eliminado con éxito.')},
            onError: (error) => {
                console.error(error);
                errorModal('Error al eliminar el horario');
            }
        })
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
            <div className="flex justify-between items-center mb-7">
                <div className="flex justify-start">
                    <SecondaryLink to={route('day.index')} className="mr-2">Ver dias</SecondaryLink>
                    <SecondaryLink to={route('horas.index')}>Ver horas</SecondaryLink>
                </div>
                <div>
                    <ButtonPrimary onClick={() => { openMainModal(1) }}>Agregar</ButtonPrimary>
                </div>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>DÍA</TableCell>
                            <TableCell>HORA</TableCell>
                            <TableCell>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {schedules.map((schedule) => (
                            <TableRow key={schedule.id}>
                                <TableCell>{schedule.id}</TableCell>
                                <TableCell>{schedule.day ? schedule.day.name : 'N/A'}</TableCell>
                                <TableCell>{schedule.hour ? schedule.hour.name : 'N/A'}</TableCell>
                                <TableCell>
                                    <ButtonEdit onClick={() => { openMainModal(2, schedule.id, schedule.day.id, schedule.hour.id) }}>Editar</ButtonEdit>
                                    <ButtonDelete className="ml-3" onClick={()=>{openDeleteModal(schedule.id, schedule.day.name, schedule.hour.name)}}>Eliminar</ButtonDelete>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Modal show={mainModal} onClose={closeMainModal}>
                <h2 className="text-3xl font-medium text-gray-900 pl-6 pr-6 pt-6 text-primary font-extrabold">
                    {title}
                </h2>

                <form onSubmit={submit} className="p-6">
                    <InputLabel htmlFor="selectDay">Día</InputLabel>
                    <Select
                        className="w-full mt-1"
                        id='day_id'
                        ref={dayInput}
                        value={data.day_id || ''} // Ensure that value is not undefined
                        onChange={(e) => setData("day_id", e.target.value)}
                    >
                        {days.map((day) => (
                            <MenuItem key={day.id} value={day.id}>
                                {day.name}
                            </MenuItem>
                        ))}
                    </Select>

                    <InputLabel>Hora:</InputLabel>
                    <Select
                        className="w-full mt-1"
                        id="hour_id"
                        ref={hourInput}
                        value={data.hour_id || ''}
                        onChange={(e) => setData('hour_id', e.target.value)}>
                            {hours.map((hour)=>(
                                <MenuItem key={hour.id} value={hour.id}>
                                    {hour.name}
                                </MenuItem>
                            ))}
                    </Select>

                    <div className="flex justify-end mt-6">
                        <ButtonCancel type='button' onClick={closeMainModal} className="mr-2" disabled={processing}>Cancelar</ButtonCancel>
                        <ButtonPrimary type='submit' disabled={processing}>Enviar</ButtonPrimary>
                    </div>
                </form>
            </Modal>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar el horario "{data.day_name} - {data.hour_name}"?
                    </h2>
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Esta acción no se puede revertir.
                    </p> */}
                </div>
                <form onSubmit={deletee} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="" disabled={processing}>Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Borrar Horario
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>

            <Head>
                <title>Horarios</title>
            </Head>

        </>
    )
}

Schedule.layout = page => <DashboardLayout children={page} title={'Mostrando horarios en sistema'}></DashboardLayout>

export default Schedule;

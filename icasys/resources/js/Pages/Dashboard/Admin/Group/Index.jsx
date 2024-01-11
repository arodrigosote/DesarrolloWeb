import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
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

const Group = () => {
    const { groups, professors, schedules } = usePage().props;
    const [mainModal, setMainModal] = useState(false);
    // const [active, setActive] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(0);
    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        professor_id: '',
        shedule_id: '',
        name: '',
        active:false
    });
    const professorInput = useRef();
    const scheduleInput = useRef();
    const activeInput = useRef();

    const openMainModal = (op, id, professor_id, schedule_id, active) => {
        setMainModal(true);
        setOperation(op);
        setData({
            id: '',
            professor_id: '',
            schedule_id: '',
            active: false
        })
        if (op === 1) {
            setTitle('Añadir grupo.')
        } else {
            setTitle('Editar grupo.')
            setData({
                id: id,
                professor_id: professor_id,
                schedule_id: schedule_id,
                active: active
            })
        }
    }

    const closeMainModal = () => {
        setMainModal(false);
    }

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('grupos.store'), {
                onSuccess: () => { ok('Grupo guardado con éxito') },
                onError: () => {
                    if (errors.professor_id) {
                        reset('professor_id');
                        professorInput.current.focus();
                    }
                    if (errors.schedule_id) {
                        reset('schedule_id');
                        scheduleInput.current.focus();
                    }
                    if (errors.active) {
                        reset('active');
                        activeInput.current.focus();
                    }
                }
            });
        } else {
            put(route('grupos.update', data.id), {
                onSuccess: () => { ok('Grupo actualizado con éxito') },
                onError: () => {
                    if (errors.professor_id) {
                        reset('professor_id');
                        professorInput.current.focus();
                    }
                    if (errors.schedule_id) {
                        reset('schedule_id');
                        scheduleInput.current.focus();
                    }
                    if (errors.active) {
                        reset('active');
                        activeInput.current.focus();
                    }
                }
            })
        }
    }
    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (id, name) => {
        setDeleteModal(true);
        setData({
            id: id,
            name: name,
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const deletee = (e) => {
        e.preventDefault();
        destroy(route('grupos.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Grupo eliminada con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar el grupo.');
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


    const handleSwitch = () => {
        setActive(!active);
        console.log(active)
    }

    return (
        <>
            <div className="flex justify-end">
                <ButtonPrimary onClick={() => { openMainModal(1) }}>Agregar</ButtonPrimary>
            </div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>MAESTRO</TableCell>
                            <TableCell>HORARIO</TableCell>
                            <TableCell>ACTIVO</TableCell>
                            <TableCell>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map((group) => (
                            <TableRow key={group.id}>
                                <TableCell>{group.id}</TableCell>
                                <TableCell>{group.professor ? group.professor.name : "N/A"}</TableCell>
                                <TableCell>{group.schedule ? `${group.schedule.day.name} | ${group.schedule.hour.name}` : 'N/A'}</TableCell>
                                <TableCell className="text-center">{group.active === 1 ? <RiCircleFill className="text-green-600 text-2xl" /> : <RiCircleFill className="text-red-600 text-2xl" />}</TableCell>
                                <TableCell>
                                    <ButtonShow>Mostrar</ButtonShow>
                                    <ButtonEdit onClick={(e) => { openMainModal(2, group.id, group.professor.id, group.schedule.id, group.active===1 ? true : false) }}>Editar</ButtonEdit>
                                    <ButtonDelete onClick={(e) => { openDeleteModal(group.schedule.id, `${group.schedule.day.name} | ${group.schedule.hour.name}`) }}>Eliminar</ButtonDelete>
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

                <form onSubmit={submit} className=" pl-6 pr-6 pb-6 ">
                    <div className="mt-6">
                        <InputLabel name="professor_id" htmlFor='professor_id' value='Maestro:'></InputLabel>
                        <Select
                            className="w-full mt-1"
                            id='professor_id'
                            ref={professorInput}
                            value={data.professor_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("professor_id", e.target.value)}
                        >
                            {professors.map((professor) => (
                                <MenuItem key={professor.id} value={professor.id}>
                                    {professor.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make}></InputError>

                        <InputLabel name="schedule_id" htmlFor='schedule_id' value='Horario:'></InputLabel>
                        <Select
                            className="w-full mt-1"
                            id='schedule_id'
                            ref={scheduleInput}
                            value={data.schedule_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("schedule_id", e.target.value)}
                        >
                            {schedules.map((schedule) => (
                                <MenuItem key={schedule.id} value={schedule.id}>
                                    {schedule.day.name} | {schedule.hour.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make}></InputError>

                        <InputLabel name='active' htmlFor='active' value='¿El grupo esá activo?'></InputLabel>
                        <Switch
                            id="active"
                            name="active"
                            checked={data.active}
                            // value={active ? 1 : 0}
                            onChange={(e) => setData("active", e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
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
                        ¿Estás seguro que quieres eliminar al grupo "{data.name}"?
                    </h2>
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
                            Borrar Grupo
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    )
}

Group.layout = page => <DashboardLayout children={page} title={'Mostrando grupos en sistema'}></DashboardLayout>

export default Group;

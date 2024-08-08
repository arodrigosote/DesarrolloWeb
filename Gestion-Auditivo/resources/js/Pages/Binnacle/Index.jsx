import React, { useState } from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { useForm, usePage } from "@inertiajs/react";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import Swal from "sweetalert2";
import ButtonSecondary from "@/Components/ButtonSecondary";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

export default function IndexBinnacle(props) {
    const { binnacle, patients, auth } = usePage().props;
    const getCssVariable = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    const today = new Date();
    const day = today.getDate();
    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${day} de ${month} de ${year}`; // Formato 'día de mes de año'

    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        alias: '',
    });

    const [modal, setModal] = useState(false);
    const [modalTicket, setModalTicket] = useState(false);
    const [title, setTitle] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreation = (alias) => {
        setTitle('Crear bitácora');
        setModal(true);
        setData({
            alias: '',
        });
    }

    const closeModal = () => {
        setModal(false);
    }

    const save = (e) => {
        e.preventDefault();

        post(route('binnacle.store'), {
            onSuccess: () => { ok('Bitácora creada con éxito') },
        });
    }

    const ok = (message) => {
        reset();
        closeModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: getCssVariable('--color1') });
    };

    const openModalTicket = () => {
        setModalTicket(true);
        setTitle('¿Qué desea registrar?');
    }

    const closeModalTicket = () => {
        setModalTicket(false);
    }

    const submit = (e) => {
        e.preventDefault();

        post(route('binnacle.store'), {
            onSuccess: () => { ok('Bitácora creada con éxito') },
        });
    }

    const { data: data2, setData: setData2, delete: delete2, post: post2, get: get2, put: put2, processing: processing2, progress: progress2, errors: errors2, reset: reset2 } = useForm({
        id: '',
        patient_id: '',
    });

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <DashboardLayout user={auth.user} title={'Bitácora'}>
                {binnacle ?
                    <div className="flex justify-between">
                        <h2 className="font-semibold text-color2 text-lg">
                            Mostrando la bitácora del, {formattedDate}.
                        </h2>
                        <ButtonSecondary onClick={() => openModalTicket()}>Crear registro</ButtonSecondary>
                    </div>

                    :
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold text-color2 text-lg">
                                Aún no existe una bitácora del día de hoy, {formattedDate}.
                            </h2>
                            <p className="text-gray-500">Da clic al botón para crearla</p>
                        </div>
                        <ButtonPrimary onClick={() => handleCreation()}>Crear</ButtonPrimary>
                    </div>
                }
            </DashboardLayout>

            <Dialog open={modal} onClose={closeModal} maxWidth="md" fullWidth>
                <form onSubmit={save} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-color1 font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <InputLabel className='text-gray-600' htmlFor='alias' value='¿Desea agregar una nota a la bitácora?'>¿Desea agregar una nota a la bitácora?</InputLabel>
                        <TextInput className='w-full mb-4' id='alias' name='alias' value={data.alias} onChange={(e) => setData('alias', e.target.value)}></TextInput>
                        <InputError message={errors.alias}></InputError>
                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-end items-center mt-4">
                            <ButtonCancel type='button' onClick={closeModal} disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={modalTicket} onClose={closeModalTicket} maxWidth="md" fullWidth>
                <form onSubmit={submit} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-color1 font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <Tabs>
                            <TabList className="flex space-x-4 border-cyan-600 border bg-color1 text-white">
                                <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">Consulta</Tab>
                                <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">Venta</Tab>
                                <Tab className="py-2 px-4 cursor-pointer focus:outline-none transition duration-300 font-semibold text-md" selectedClassName="bg-cyan-500">Ingreso/Egreso</Tab>
                            </TabList>

                            <TabPanel>
                                <h3 className="text-color2 font-bold mt-4 text-lg">Generar consulta:</h3>
                                <InputLabel className='text-gray-600' htmlFor='patient_id' value='¿Desea agregar una nota a la bitácora?'>Seleccione al paciente</InputLabel>
                                <TextField
                                    className="w-full mb-4"
                                    id='search'
                                    label='Buscar paciente'
                                    variant='outlined'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Select
                                    className="w-full mb-4"
                                    id='patient_id'
                                    value={data2.patient_id || ''} // Ensure that value is not undefined
                                    onChange={(e) => setData2("patient_id", e.target.value)}
                                >
                                    {filteredPatients.map((patient) => (
                                        <MenuItem key={patient.id} value={patient.id}>
                                            {patient.name} - {patient.address}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <InputError message={errors.patient_id}></InputError>
                            </TabPanel>
                            <TabPanel>Mostrando ventas</TabPanel>
                            <TabPanel>Mostrando Ingreso</TabPanel>
                        </Tabs>
                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-end items-center mt-4">
                            <ButtonCancel type='button' onClick={closeModalTicket} disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

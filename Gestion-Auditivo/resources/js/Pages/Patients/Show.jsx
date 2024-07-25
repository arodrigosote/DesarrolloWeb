import ButtonPrimary from '@/Components/ButtonPrimary';
import CardPrimary from '@/Components/CardPrimary';
import { RiHotelFill, RiSortAlphabetAsc, RiEditBoxFill, RiDeleteBin5Fill, RiEyeFill} from "react-icons/ri";
import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { CImage } from "@coreui/react";
import { useEffect, useRef, useState } from 'react';
import ButtonSecondary from '@/Components/ButtonSecondary';
import ButtonEdit from '@/Components/ButtonEdit';
import ButtonDelete from '@/Components/ButtonDelete';
import { Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import ButtonCancel from '@/Components/ButtonCancel';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import '../../../css/app.css'
import Modal from '@/Components/Modal';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


export default function PatientShow(props) {
    const { patient, auth, toast: toastProp, url } = usePage().props;

    const getCssVariable = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    // ---------------------------------------------------------------------------------------
    // Toast Notification --------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    const [toastInfo, setToastInfo] = useState(null);

    useEffect(() => {
        // Verificar si hay información de "toast" y mostrar el "toast" correspondiente
        if (toastProp) {
            setToastInfo(toastProp);
        }
    }, [toastProp]);

    useEffect(() => {
        // Mostrar el "toast" cuando se actualice el estado local
        if (toastInfo) {
            toast[toastInfo.tipo](toastInfo.mensaje);
            setToastInfo(null); // Limpiar el estado después de mostrar el "toast"
        }
    }, [toastInfo]);

    // ---------------------------------------------------------------------------------------
    // SUBMIT AND MODAL-----------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);

    // const nameInput = useRef();

    const user_idInput = useRef();
    const nameInput = useRef();
    const addressInput = useRef();
    const phoneInput = useRef();
    const ageInput = useRef();
    const genderInput = useRef();
    const publicity_methodInput = useRef();
    const ailmentsInput = useRef();
    const backgroundInput = useRef();
    const emailInput = useRef();

    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        id: '',
        user_id: '',
        name: '',
        address: '',
        phone: '',
        age: '',
        gender: '',
        publicity_method: '',
        ailments: '',
        background: '',
        email: '',
    });

    //MODAL
    const openModal = (op, id, user_id, name, address, phone, age, gender, publicity_method, ailments, background, email) => {
        setModal(true);
        setOperation(op);
        setData({
            id: '',
            user_id: '',
            name: '',
            address: '',
            phone: '',
            age: '',
            gender: '',
            publicity_method: '',
            ailments: '',
            background: '',
            email: '',
        })
        if (op === 1) {
            setTitle('Crear paciente');
        } else {
            setTitle('Editar paciente');
            setData({
                id: id,
                user_id: user_id,
                name: name,
                address: address,
                phone: phone,
                age: age,
                gender: gender,
                publicity_method: publicity_method,
                ailments: ailments,
                background: background,
                email: email,
            })
        }
    }
    const closeModal = () => {
        setModal(false);
    }

    //SUBMIT SECTION
    const save = (e) => {
        e.preventDefault();

        if (operation === 1) {
            post(route('patient.store'), {
                onSuccess: () => { ok('Paciente creado con éxito') },
            });
        } else {
            post(route('patient.update', data.id), {
                onSuccess: () => { ok('Paciente editado con éxito') },
            });
        }
    }

    const ok = (message) => {
        reset();
        closeModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: getCssVariable('--color1') })
        get(route('patient.index'))
    };

    // ---------------------------------------------------------------------------------------
    // DELETE MODAL --------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------
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

    const borrar = (e) => {
        e.preventDefault();
        // destroy(route('patient.destroy', data.id), {
        //     preserveScroll: true,
        //     onSuccess: () => { ok('Pai con éxito.') },
        // });
    }


    //Handle logo
    const handlelogoChange = (e) => {
        // const file = e.target.files[0];
        // setData('logo', file); // Actualiza el estado solo con el archivo de logon
    };

    const handleShowPatient = (id) => {
        get(route('patient.show', id))
    }

    return (
        <>
            <ToastContainer />
            <DashboardLayout user={auth.user} title={patient.name}>
            <div className="lg:flex sm:block">
                    <div className="lg:w-[33%] sm:w-[100%] flex">
                        {/* <div className="w-[1%]">
                            <IconButton onClick={(e) => { changeImage() }} className="bg-white">
                                <RiLoopRightFill />
                            </IconButton>
                        </div>
                        <div className="w-[99%] flex items-center justify-center">
                            {image === false ? (
                                <CImage rounded thumbnail src={`${baseUrl}storage/${student.profile_pic}`} width={230} height={230} />
                            ) : (
                                <CImage rounded thumbnail src={`${baseUrl}storage/${student.credential_pic}`} width={230} height={230} />
                            )}
                        </div> */}

                    </div>
                    <div className="lg:w-[66%] w-[100%] my-auto mx-auto">
                        <h1 className="text-primary font-bold text-xl mt-5">Información del paciente.</h1>
                        <p className="mt-3"><strong>Nombre:</strong> {patient.name}</p>
                        <p className="mt2"><strong>Fecha de inicio:</strong> {patient.firstday}</p>
                        <p className="mt2"><strong>Teléfono:</strong> {patient.phone}</p>
                        <p className="mt2"><strong>Email:</strong> {patient.email}</p>
                        <div className="lg:flex sm:block justify-between mt-4">
                            <ButtonSecondary className="sm:w-[100%] lg:w-auto">Historia académica</ButtonSecondary>
                            {/* <PDFDownloadLink document={<Inscription student={student} />} fileName={`Formato inscripción ${student.name}`}>
                                {({ loading, url, error, blob }) =>
                                    loading ? (
                                        <ButtonCancel>Cargando...</ButtonCancel>
                                    ) : (
                                        <ButtonSecondary>Formato de inscripción</ButtonSecondary>
                                    )}
                            </PDFDownloadLink> */}
                            <ButtonEdit className="sm:w-[100%] lg:w-auto">Editar</ButtonEdit>
                            <ButtonSecondary className="sm:w-[100%] lg:w-auto">Credencial</ButtonSecondary>
                        </div>
                    </div>




                </div>
            </DashboardLayout>
            <Dialog open={modal} onClose={closeModal} maxWidth="md" fullWidth>
                <form onSubmit={save} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-color1 font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <InputLabel className='text-gray-600' htmlFor='name' value=' '>Nombre:</InputLabel>
                        <TextInput className='w-full mb-4' id='name' name='name' ref={nameInput} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.name}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='address' value=''>Dirección:</InputLabel>
                        <TextInput className='w-full mb-4' id='address' name='address' ref={addressInput} value={data.address} required='required' onChange={(e) => setData('address', e.target.value)}></TextInput>
                        <InputError message={errors.address}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='email' value=' '>Email:</InputLabel>
                        <TextInput className='w-full mb-4' id='email' name='email' ref={emailInput} value={data.email} required='required' onChange={(e) => setData('email', e.target.value)}></TextInput>
                        <InputError message={errors.email}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='phone' value=''>Teléfono:</InputLabel>
                        <TextInput className='w-full mb-4' id='phone' name='phone' ref={phoneInput} value={data.phone} required='required' onChange={(e) => setData('phone', e.target.value)}></TextInput>
                        <InputError message={errors.phone}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='age' value=''>Edad:</InputLabel>
                        <TextInput className='w-full mb-4' id='age' type='number' name='age' ref={ageInput} value={data.age} required='required' onChange={(e) => setData('age', e.target.value)}></TextInput>
                        <InputError message={errors.age}></InputError>

                        <InputLabel htmlFor='gender'>Género:</InputLabel>
                        <Select
                            className="w-full mb-4"
                            id='gender'
                            ref={genderInput}
                            value={data.gender || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("gender", e.target.value)}
                        >
                            <MenuItem value={'Masculino'}>
                                Masculino
                            </MenuItem>
                            <MenuItem value={'Masculino'}>
                                Femenino
                            </MenuItem>
                        </Select>

                        <InputLabel className='text-gray-600' htmlFor='publicity_method' value=''>Método publicitario:</InputLabel>
                        <TextInput className='w-full mb-4' id='publicity_method' name='publicity_method' ref={publicity_methodInput} value={data.publicity_method} required='required' onChange={(e) => setData('publicity_method', e.target.value)}></TextInput>
                        <InputError message={errors.publicity_method}></InputError>

                        <InputLabel htmlFor='ailments'>Padecimientos:</InputLabel>
                        <TextField multiline className="w-full mb-4" rows={6} id="ailments" name="ailments" ref={ailmentsInput} value={data.ailments || ''} onChange={(e) => setData('ailments', e.target.value)} />
                        <InputError message={errors.ailments}></InputError>

                        <InputLabel htmlFor='background'>Antecedentes:</InputLabel>
                        <TextField multiline className="w-full mb-4" rows={6} id="background" name="background" ref={backgroundInput} value={data.background || ''} onChange={(e) => setData('background', e.target.value)} />
                        <InputError message={errors.background}></InputError>

                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-end items-center mt-4">
                            <ButtonCancel type='button' onClick={closeModal} disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={deleteModal} onClose={closeDeleteModal}>
                <DialogTitle>¿Estás seguro de que deseas eliminar este paciente?</DialogTitle>
                <DialogContent>
                    <p>El paciente <strong>{data.name}</strong> será eliminado.</p>
                </DialogContent>
                <DialogActions>
                    <ButtonCancel onClick={closeDeleteModal}>Cancelar</ButtonCancel>
                    <ButtonDelete onClick={borrar}>Eliminar</ButtonDelete>
                </DialogActions>
            </Dialog>
            <Head title="Pacientes" />
        </>
    );
}

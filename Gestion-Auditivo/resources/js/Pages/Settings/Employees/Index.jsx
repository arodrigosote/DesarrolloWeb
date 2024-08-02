import ButtonPrimary from '@/Components/ButtonPrimary';
import CardPrimary from '@/Components/CardPrimary';
import { RiDeleteBin5Fill, RiEditBoxFill, RiEyeFill, RiHotelFill, RiSortAlphabetAsc } from "react-icons/ri";
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
import '../../../../css/app.css'
import Modal from '@/Components/Modal';

export default function SettingsEmployees(props) {
    const { employees, branches, auth, toast: toastProp, url } = usePage().props;

    const getCssVariable = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    // ---------------------------------------------------------------------------------------
    // SORTED FUNCTIONS ----------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------

    const [sortedEmployees, setSortedEmployees] = useState(employees);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortEmployees = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sorted = [...sortedEmployees].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setSortedEmployees(sorted);
        setSortConfig({ key, direction });
    };

    const getColumnClass = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
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

    const idInput = useRef();
    const nameInput = useRef();
    const emailInput = useRef();
    const branch_idInput = useRef();
    const roleInput = useRef();
    const phoneInput = useRef();
    const is_activeInput = useRef();
    const passwordInput = useRef();

    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        id: '',
        name: '',
        email: '',
        branch_id: '',
        role: '',
        phone: '',
        is_active: '',
        password: '',
    });

    //MODAL
    const openModal = (op, id, name, email, branch_id, role, phone, is_active, password) => {
        setModal(true);
        setOperation(op);
        setData({
            id: '',
            name: '',
            email: '',
            branch_id: '',
            role: '',
            phone: '',
            is_active: '',
            password: '',
        })
        if (op === 1) {
            setTitle('Crear empleado');
        } else {
            setTitle('Editar empleado');
            setData({
                id: id,
                name: name,
                email: email,
                branch_id: branch_id,
                role: role,
                phone: phone,
                is_active: is_active,
                password: password,
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
            post(route('employee.store'), {
                onSuccess: () => { ok('Empleado creado con éxito') },
            });
        } else {
            post(route('employee.update', data.id), {
                onSuccess: () => { ok('Empleado editado con éxito') },
            });
        }
    }

    const ok = (message) => {
        reset();
        closeModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: getCssVariable('--color1') })
        get(route('employee.index'))
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
        destroy(route('employee.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Empleado eliminado con éxito.') },
        });
    }


    //Handle logo
    // const handlelogoChange = (e) => {
    //     const file = e.target.files[0];
    //     setData('logo', file); // Actualiza el estado solo con el archivo de logon
    // };

    return (
        <>
            <ToastContainer />
            <DashboardLayout user={auth.user} title={'Ajustes de empleados'}>
                <div className='flex justify-end'>
                    <ButtonSecondary onClick={() => openModal(1)}>Agregar empleado</ButtonSecondary>
                </div>
                <h2 className='text-color1 text-xl my-2 font-semibold'>Listando empleados</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortEmployees('name')}>
                                    <div className='flex justify-between'>
                                        <span>Nombre</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortEmployees('branch')}>
                                    <div className='flex justify-between'>
                                        <span>Sucursal</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortEmployees('rol')}>
                                    <div className='flex justify-between'>
                                        <span>Rol</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortEmployees('email')}>
                                    <div className='flex justify-between'>
                                        <span>Email</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortEmployees('phone')}>
                                    <div className='flex justify-between'>
                                        <span>Teléfono</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border">Accciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEmployees.map((employee, index) => (
                                <tr key={employee.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    {/* <td><CImage rounded thumbnail src={`${url}storage/${employee.logo}`} width={200} height={200} alt={employee.name} /></td> */}
                                    <td className="p-4 border">{employee.name}</td>
                                    <td className="p-4 border">{employee.branch ? employee.branch.name : 'No asignada'}</td>
                                    <td className="p-4 border">{employee.role ? employee.role : 'No asignado'}</td>
                                    <td className="p-4 border">{employee.email}</td>
                                    <td className="p-4 border">{employee.phone}</td>
                                    <td className='p-4 border'>
                                        <div className="flex justify-center">
                                            {/* <ButtonSecondary><RiEyeFill /></ButtonSecondary> */}
                                            <ButtonEdit onClick={(e) => { openModal(2, employee.id, employee.name, employee.email, employee.branch_id, employee.role, employee.phone, employee.is_active, employee.password) }}><RiEditBoxFill /></ButtonEdit>
                                            <ButtonDelete onClick={(e) => { openDeleteModal(employee.id, employee.name) }}><RiDeleteBin5Fill /></ButtonDelete>
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardLayout>
            <Head title="Ajustes" />

            <Dialog open={modal} onClose={closeModal} maxWidth="md" fullWidth>
                <form onSubmit={save} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-color1 font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <InputLabel className='text-gray-600' htmlFor='name' value=' '>Nombre:</InputLabel>
                        <TextInput className='w-full mb-4' id='name' name='name' ref={nameInput} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.name}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='email' value=''>Email:</InputLabel>
                        <TextInput className='w-full mb-4' id='email' name='email' ref={emailInput} value={data.email} required='required' onChange={(e) => setData('email', e.target.value)}></TextInput>
                        <InputError message={errors.email}></InputError>

                        <InputLabel className='text-gray-600' htmlFor='password' value=''>Contraseña:</InputLabel>
                        <TextInput className='w-full mb-4' id='password' name='password' ref={passwordInput} value={data.password} onChange={(e) => setData('password', e.target.value)}></TextInput>
                        <InputError message={errors.password}></InputError>

                        <InputLabel htmlFor='branch_id' value=''>¿En qué sucursal va a trabajar?</InputLabel>
                        <Select
                            className="w-full mb-4"
                            id='branch_id'
                            ref={branch_idInput}
                            value={data.branch_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("branch_id", e.target.value)}
                        >
                            {branches.map((branch) => (
                                <MenuItem key={branch.id} value={branch.id}>
                                    {branch.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <InputLabel htmlFor='role' value=''>¿Qué rol cumple?</InputLabel>
                        <Select
                            className="w-full mb-4"
                            id='role'
                            ref={roleInput}
                            value={data.role || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("role", e.target.value)}
                        >

                                <MenuItem value={'admin'}>
                                    Administrador
                                </MenuItem>
                                <MenuItem value={'employee'}>
                                    Empleado
                                </MenuItem>
                        </Select>

                        <InputLabel className='text-gray-600' htmlFor='phone' value=''>Teléfono:</InputLabel>
                        <TextInput className='w-full mb-4' id='phone' name='phone' ref={phoneInput} value={data.phone} onChange={(e) => setData('phone', e.target.value)}></TextInput>
                        <InputError message={errors.phone}></InputError>

                        <div className="w-full">
                            {progress && (
                                <progress value={progress.percentage} className="w-full text-black" max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-end items-center mt-4">
                            <ButtonCancel type='button' onClick={closeModal} disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl text-color1 text-center">
                        ¿Estás seguro que quieres eliminar el empleado <strong>"{data.name}"</strong>?
                    </h2>

                </div>
                <form onSubmit={borrar} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="">Cancel</ButtonCancel>
                        <ButtonDelete type='submit' className="ml-3" disabled={processing}>
                            Eliminar empleado
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    );
}

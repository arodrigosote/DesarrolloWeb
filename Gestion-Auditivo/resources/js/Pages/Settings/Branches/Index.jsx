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

export default function SettingsBranches(props) {
    const { branches, auth, toast: toastProp, url } = usePage().props;

    const getCssVariable = (variable) => {
        return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
    };

    // ---------------------------------------------------------------------------------------
    // SORTED FUNCTIONS ----------------------------------------------------------------------
    // ---------------------------------------------------------------------------------------

    const [sortedBranches, setSortedBranches] = useState(branches);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortBranches = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }

        const sorted = [...sortedBranches].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setSortedBranches(sorted);
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

    const nameInput = useRef();
    const addressInput = useRef();
    const logoInput = useRef();

    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        id: '',
        name: '',
        address: '',
        logo: '',
    });

    //MODAL
    const openModal = (op, id, name, address, logo) => {
        setModal(true);
        setOperation(op);
        setData({
            id: '',
            name: '',
            address: '',
            logo: '',
        })
        if (op === 1) {
            setTitle('Añadir sucursal');
        } else {
            setTitle('Editar sucursal');
            setData({
                id: id,
                name: name,
                address: address,
                logo: logo,
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
            post(route('admin.settings.branches.store'), {
                onSuccess: () => { ok('Sucursal creada con éxito') },
            });
        } else {
            post(route('admin.settings.branches.update', data.id), {
                onSuccess: () => { ok('Sucursal editado con éxito') },
            });
        }
    }

    const ok = (message) => {
        reset();
        closeModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: getCssVariable('--color1') })
        get(route('admin.settings.branches'))
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
        destroy(route('admin.settings.branches.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Sucursal eliminada con éxito.') },
        });
    }


    //Handle logo
    const handlelogoChange = (e) => {
        const file = e.target.files[0];
        setData('logo', file); // Actualiza el estado solo con el archivo de logon
    };

    return (
        <>
            <ToastContainer />
            <DashboardLayout user={auth.user} title={'Ajustes de sucursales'}>
                <div className='flex justify-end'>
                    <ButtonSecondary onClick={() => openModal(1)}>Agregar sucursal</ButtonSecondary>
                </div>
                <h2 className='text-color1 text-xl my-2 font-semibold'>Listando sucursales</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max">
                        <thead>
                            <tr>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortBranches('logo')}>
                                    <div className='flex justify-between'>
                                        <span>Logo</span>
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortBranches('name')}>
                                    <div className='flex justify-between'>
                                        <span>Nombre</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border cursor-pointer" onClick={() => sortBranches('address')}>
                                    <div className='flex justify-between'>
                                        <span>Dirección</span>
                                        <RiSortAlphabetAsc className='text-xl' />
                                    </div>
                                </th>
                                <th className="p-4 text-[15px] bg-color1 text-white border">Accciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedBranches.map((branch, index) => (
                                <tr key={branch.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                                    <td><CImage rounded thumbnail src={`${url}storage/${branch.logo}`} width={200} height={200} alt={branch.name} /></td>
                                    <td className="p-4 border">{branch.name}</td>
                                    <td className="p-4 border">{branch.address}</td>
                                    <td className='p-4 border'>
                                        <div className="flex justify-center">
                                            <ButtonSecondary><RiEyeFill /></ButtonSecondary>
                                            <ButtonEdit onClick={(e) => { openModal(2, branch.id, branch.name, branch.address, branch.image) }}><RiEditBoxFill /></ButtonEdit>
                                            <ButtonDelete onClick={(e) => { openDeleteModal(branch.id, branch.name) }}><RiDeleteBin5Fill/></ButtonDelete>
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

                        <InputLabel className='text-gray-600' htmlFor='address' value=''>Dirección:</InputLabel>
                        <TextInput className='w-full mb-4' id='address' name='address' ref={addressInput} value={data.address} required='required' onChange={(e) => setData('address', e.target.value)}></TextInput>
                        <InputError message={errors.address}></InputError>

                        {data.logo ?
                            <div className='flex'>
                                <div>
                                    <CImage rounded thumbnail src={`${url}storage/${data.logo}`} width={200} height={200} alt={data.name} />
                                </div>
                                <div>
                                    <InputLabel className='text-gray-600' htmlFor="logo">Logo de la sucursal:</InputLabel>
                                    <TextField className='w-full mb-4'
                                        type="file"
                                        accept="logo/*"
                                        id="logo"
                                        name="logo"
                                        onChange={handlelogoChange}
                                    />
                                </div>
                            </div>
                            :
                            <div>
                                <InputLabel className='text-gray-600' htmlFor="logo">Logo de la sucursal:</InputLabel>
                                <TextField className='w-full mb-4'
                                    type="file"
                                    accept="logo/*"
                                    id="logo"
                                    name="logo"
                                    onChange={handlelogoChange}
                                />
                            </div>
                        }


                        <InputError message={errors.logo} />

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
                        ¿Estás seguro que quieres eliminar la sucursal <strong>"{data.name}"</strong>?
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
                            Eliminar sucursal
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    );
}

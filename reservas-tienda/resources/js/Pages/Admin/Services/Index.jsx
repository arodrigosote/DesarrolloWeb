import ButtonCancel from "@/Components/ButtonCancel";
import ButtonDelete from "@/Components/ButtonDelete";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonPrimary from "@/Components/ButtonPrimary";
import DashboardLayout from "@/Components/Dashboard/DashboardLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { RiEditBoxFill, RiDeleteBin5Fill, RiEyeFill } from "react-icons/ri";


export default function Services() {
    const { categories, url, auth } = usePage().props;

    const [mainModal, setMainModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(0);

    const name = useRef();

    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
    })

    // ----------------------------------------------------------------------------------------------
    // MODAL PARA AGREGAR CATEGORIA
    // ----------------------------------------------------------------------------------------------
    const openMainModal = (op, id, name) => {
        setMainModal(true);
        setOperation(op)
        setData({
            id: '',
            name: '',
        })
        if (op === 1) {
            setTitle('Añadir categoría.');
        } else {
            setTitle('Editar categoría.');
            setData({
                id: id,
                name: name,
            })
        }
    }

    const closeMainModal = () => {
        reset();
        setMainModal(false);
    }

    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('servicecategory.store'), {
                preserveScroll: true,
                onSuccess: () => { ok('Categoría agregada con éxito.') },
                onError: () => {
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                }
            })
        } else {
            put(route('servicecategory.update', data.id), {
                preserveScroll: true,
                onSuccess: () => { ok('Categoría editada con éxito.') },
                onError: () => {
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                }
            })
        }
    }

    // ----------------------------------------------------------------------------------------------
    // MODAL PARA ELIMINAR CATEGORIA
    // ----------------------------------------------------------------------------------------------
    const openDeleteModal = (id, name) => {
        setDeleteModal(true);
        setData({
            id: id,
            name: name,
        })
    }

    const closeDeleteModal = () => {
        reset();
        setDeleteModal(false);
    }

    const deletee = (e) => {
        e.preventDefault();
        destroy(route('servicecategory.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Categoría eliminada con éxito.') },
            onError: (error) => {
                console.error(error);
                errorModal('Error al elimiar categoría.');
            }
        })
    }

    // ----------------------------------------------------------------------------------------------
    // MENSAJES DE OK Y ERROR
    // ----------------------------------------------------------------------------------------------
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

    // ----------------------------------------------------------------------------------------------
    // SHOW SERVICES IN CATEGORY
    // ----------------------------------------------------------------------------------------------
    const handleShowCategory = (id) => {
        get(route('services', id))
    }

    return (
        <>
            <ToastContainer />
            <DashboardLayout title={'Mostrando categorías de servicios'} auth={auth}>
                <div className="flex justify-end">
                    <ButtonPrimary onClick={() => openMainModal(1)}>Agregar categoría</ButtonPrimary>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><span className="text-lg"><strong>NOMBRE</strong></span></TableCell>
                                <TableCell><span className="text-lg"><strong>SERVICIOS AGREGADOS</strong> </span> </TableCell>
                                <TableCell><span className="text-lg"><strong>ACCIONES</strong></span></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell><Link href={route('services', category.id)}><span className="text-lg">{category.name}</span></Link></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <Link href={route('services', category.id)}><span className="text-lg"><ButtonPrimary><RiEyeFill className="text-lg"></RiEyeFill></ButtonPrimary></span></Link>
                                        <ButtonEdit onClick={(e) => openMainModal(2, category.id, category.name)}><RiEditBoxFill className="text-lg"></RiEditBoxFill></ButtonEdit>
                                        <ButtonDelete onClick={(e) => openDeleteModal(category.id, category.name)} className="ml-2"><RiDeleteBin5Fill className="text-lg"></RiDeleteBin5Fill></ButtonDelete>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DashboardLayout>

            <Dialog open={mainModal} onClose={closeMainModal} maxWidth="md" fullWidth>
                <form onSubmit={submit} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-primary font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <InputLabel htmlFor='name' value='Nombre:'></InputLabel>
                        <TextInput className='w-[100%]' id='name' name='name' ref={name} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>
                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-end items-center mt-4">
                            <ButtonCancel type='button' onClick={closeMainModal} disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-color1 font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar la categoría <strong>"{data.name}"</strong>?
                    </h2>
                    <p className="mt-3 text-lg text-center text-gray-600">
                        Esta acción no se puede revertir. Y borrará todos los servicios que estén dentro.
                    </p>
                </div>
                <form onSubmit={deletee} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="">Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Borrar Categoría
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    )
}

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
import { RiEditBoxFill, RiDeleteBin5Fill, RiEyeFill  } from "react-icons/ri";


export default function Category() {
    const { category, services, url, auth } = usePage().props;

    const [mainModal, setMainModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(0);

    const id = useRef();
    const category_id = useRef();
    const name = useRef();
    const price = useRef();
    const duration = useRef();
    const description = useRef();
    const image = useRef();

    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id:'',
        category_id:'',
        name: '',
        price: '',
        duration: '',
        description: '',
        image: '',
    })

    // ----------------------------------------------------------------------------------------------
    // MODAL PARA AGREGAR CATEGORIA
    // ----------------------------------------------------------------------------------------------
    const openMainModal = (op, id, category_id, name, price, duration, description, image) => {
        setMainModal(true);
        setOperation(op)
        setData({
            id:'',
            category_id:'',
            name: '',
            price: '',
            duration: '',
            description: '',
            image: '',
        })
        if (op === 1) {
            setTitle('Añadir categoría.');
        } else {
            setTitle('Editar categoría.');
            setData({
                id:id,
                category_id:category_id,
                name: name,
                price: price,
                duration: duration,
                description: description,
                image: image,
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
                    if (error.id){reset('id'); idInput.current.focus();}
                    if (error.category_id){reset('category_id'); category_idInput.current.focus();}
                    if (error.name){reset('name'); nameInput.current.focus();}
                    if (error.price){reset('price'); priceInput.current.focus();}
                    if (error.duration){reset('duration'); durationInput.current.focus();}
                    if (error.description){reset('description'); descriptionInput.current.focus();}
                    if (error.image){reset('image'); imageInput.current.focus();}
                }
            })
        } else {
            put(route('servicecategory.update', data.id), {
                preserveScroll: true,
                onSuccess: () => { ok('Categoría editada con éxito.') },
                onError: () => {
                    if (error.id){reset('id'); idInput.current.focus();}
                    if (error.category_id){reset('category_id'); category_idInput.current.focus();}
                    if (error.name){reset('name'); nameInput.current.focus();}
                    if (error.price){reset('price'); priceInput.current.focus();}
                    if (error.duration){reset('duration'); durationInput.current.focus();}
                    if (error.description){reset('description'); descriptionInput.current.focus();}
                    if (error.image){reset('image'); imageInput.current.focus();}
                }
            })
        }
    }

    // ----------------------------------------------------------------------------------------------
    // MODAL PARA ELIMINAR CATEGORIA
    // ----------------------------------------------------------------------------------------------
    const openDeleteModal = (id, category_id, name, price, duration, description, image) => {
        setDeleteModal(true);
        setData({
            id:id,
            category_id:category_id,
            name: name,
            price: price,
            duration: duration,
            description: description,
            image: image,
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
        get(route('grupos.show', id))
    }

    return (
        <>
            <ToastContainer/>
            <DashboardLayout title={`Mostrando servicios de ${category.name}`} auth={auth}>
                <div className="flex justify-end">
                    <ButtonPrimary onClick={() => openMainModal(1)}>Agregar categoría</ButtonPrimary>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell><span className="text-lg"><strong>DURACIÓN</strong></span></TableCell> */}
                                <TableCell><span className="text-lg"><strong>NOMBRE</strong></span></TableCell>
                                <TableCell><span className="text-lg"><strong>PRECIO</strong> </span> </TableCell>
                                <TableCell><span className="text-lg"><strong>DURACIÓN</strong></span></TableCell>
                                <TableCell><span className="text-lg"><strong>DESCRIPCIÓN</strong></span></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell><span className="text-lg">{service.name}</span></TableCell>
                                    <TableCell>{}</TableCell>
                                    <TableCell>
                                        <ButtonPrimary onClick={(e) => { handleShowCategory(service.id) }}><RiEyeFill className="text-lg"></RiEyeFill></ButtonPrimary>
                                        <ButtonEdit onClick={(e) => openMainModal(2, service.id, service.category_id, service.name, service.price, service.duration, service.description, service.image)}><RiEditBoxFill className="text-lg"></RiEditBoxFill></ButtonEdit>
                                        <ButtonDelete onClick={(e) => openDeleteModal(service.id, service.name)} className="ml-2"><RiDeleteBin5Fill className="text-lg"></RiDeleteBin5Fill></ButtonDelete>
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
                        <span className="text-2xl text-color1 font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>
                        <InputLabel className="mt-0" htmlFor='name' value='Nombre:'></InputLabel>
                        <TextInput className='w-[100%]' id='name' name='name' ref={name} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel className="mt-7" htmlFor='category' value='Categoría:'></InputLabel>
                        <TextInput className='w-[100%]' id='category' name='category' ref={name} value={data.category} required='required' onChange={(e) => setData('category', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel className="mt-7" htmlFor='name' value='Precio:'></InputLabel>
                        <TextInput className='w-[100%]' id='name' name='name' ref={name} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel className="mt-7" htmlFor='name' value='Duración:'></InputLabel>
                        <TextInput className='w-[100%]' id='name' name='name' ref={name} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel className="mt-7" htmlFor='name' value='Descripción:'></InputLabel>
                        <TextInput className='w-[100%]' id='name' name='name' ref={name} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel className="mt-7" htmlFor='name' value='Image:'></InputLabel>
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

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
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { RiEditBoxFill, RiDeleteBin5Fill, RiEyeFill } from "react-icons/ri";


export default function Category() {
    const { category, services, durations, url, auth } = usePage().props;

    const [mainModal, setMainModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(0);

    const idInput = useRef();
    const category_idInput = useRef();
    const nameInput = useRef();
    const priceInput = useRef();
    const duration_idInput = useRef();
    const descriptionInput = useRef();
    const imageInput = useRef();

    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        category_id: category.id,
        name: '',
        price: '',
        duration_id: '',
        description: '',
        image: '',
    })

    // ----------------------------------------------------------------------------------------------
    // MODAL PARA AGREGAR CATEGORIA
    // ----------------------------------------------------------------------------------------------
    const openMainModal = (op, id, category_id, name, price, duration_id, description, image) => {
        setMainModal(true);
        setOperation(op)
        setData({
            id: '',
            category_id: category.id,
            name: '',
            price: '',
            duration_id: '',
            description: '',
            image: '',
        })
        if (op === 1) {
            setTitle('Añadir categoría.');
        } else {
            setTitle('Editar categoría.');
            setData({
                id: id,
                category_id: category_id,
                name: name,
                price: price,
                duration_id: duration_id,
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
                    if (error.id) { reset('id'); idInput.current.focus(); }
                    if (error.category_id) { reset('category_id'); category_idInput.current.focus(); }
                    if (error.name) { reset('name'); nameInput.current.focus(); }
                    if (error.price) { reset('price'); priceInput.current.focus(); }
                    if (error.duration_id) { reset('duration'); duration_idInput.current.focus(); }
                    if (error.description) { reset('description'); descriptionInput.current.focus(); }
                    if (error.image) { reset('image'); imageInput.current.focus(); }
                }
            })
        } else {
            put(route('servicecategory.update', data.id), {
                preserveScroll: true,
                onSuccess: () => { ok('Categoría editada con éxito.') },
                onError: () => {
                    if (error.id) { reset('id'); idInput.current.focus(); }
                    if (error.category_id) { reset('category_id'); category_idInput.current.focus(); }
                    if (error.name) { reset('name'); nameInput.current.focus(); }
                    if (error.price) { reset('price'); priceInput.current.focus(); }
                    if (error.duration_id) { reset('duration'); duration_idInput.current.focus(); }
                    if (error.description) { reset('description'); descriptionInput.current.focus(); }
                    if (error.image) { reset('image'); imageInput.current.focus(); }
                }
            })
        }
    }

    // MANEJAR IMAGEN
    const handleImage = (e) => {
        const file = e.target.files[0];
        setData('image', file); // Actualiza el estado solo con el archivo de imagen
    };

    // ----------------------------------------------------------------------------------------------
    // MODAL PARA ELIMINAR CATEGORIA
    // ----------------------------------------------------------------------------------------------
    const openDeleteModal = (id, category_id, name, price, duration_id, description, image) => {
        setDeleteModal(true);
        setData({
            id: id,
            category_id: category_id,
            name: name,
            price: price,
            duration_id: duration_id,
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
            <ToastContainer />
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
                                    <TableCell>{ }</TableCell>
                                    <TableCell>
                                        <ButtonPrimary onClick={(e) => { handleShowCategory(service.id) }}><RiEyeFill className="text-lg"></RiEyeFill></ButtonPrimary>
                                        <ButtonEdit onClick={(e) => openMainModal(2, service.id, service.category_id, service.name, service.price, service.duration_id, service.description, service.image)}><RiEditBoxFill className="text-lg"></RiEditBoxFill></ButtonEdit>
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
                        <TextInput className='w-[100%]' id='name' name='name' ref={nameInput} value={data.name} required='required' onChange={(e) => setData('name', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel className="mt-7 hidden" htmlFor='category' value='Categoría:'></InputLabel>
                        <TextInput className='w-[100%] hidden' id='category' name='category' ref={category_idInput} defaultValue={category.id} required='required'></TextInput>
                        <InputError className='hidden' message={errors.make}></InputError>

                        <InputLabel className="mt-7" htmlFor='price' value='Precio:'></InputLabel>
                        <TextInput
                            className='w-[100%]'
                            id='price'
                            name='price'
                            ref={priceInput}
                            value={data.price}
                            required='required'
                            onChange={(e) => setData('price', e.target.value)}
                            type='number'
                            min='0'
                            step='0.01'
                            onWheel={(e) => e.target.blur()} // Evita el scroll
                        ></TextInput>
                        <InputError message={errors.price}></InputError>



                        <InputLabel className="mt-7" htmlFor='duration_id' value='Duración del servicio: ' />
                        <Select
                            className="w-full mt-1"
                            id='duration_id'
                            ref={duration_idInput}
                            value={data.duration_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("duration_id", e.target.value)}
                        >
                            {durations.map((duration) => (
                                <MenuItem key={duration.id} value={duration.id}>
                                    {duration.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make} />


                        <InputLabel className="mt-7" htmlFor='description' value='Descripción:'></InputLabel>
                        <textarea
                            className='w-[100%] h-40 p-2 border rounded border-gray-300'
                            id='description'
                            name='description'
                            ref={descriptionInput}
                            value={data.description}
                            required='required'
                            onChange={(e) => setData('description', e.target.value)}
                        ></textarea>
                        <InputError message={errors.description}></InputError>


                        <InputLabel className="mt-7" htmlFor='image' value='Foto de perfil: ' />
                        <TextField
                            className="w-full"
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            onChange={handleImage}
                        />
                        <InputError message={errors.make} />

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

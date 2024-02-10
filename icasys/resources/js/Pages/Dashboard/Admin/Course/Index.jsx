import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, useForkRef, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch
} from '@mui/material';
import { RiCircleFill } from "react-icons/ri";
import { Head, useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { RiEditBoxLine, RiDeleteBin6Fill } from "react-icons/ri";
import { Inertia } from '@inertiajs/inertia';
import Modal from "@/Components/Modal";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import ButtonDelete from "@/Components/ButtonDelete";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonCancel from "@/Components/ButtonCancel";
import SecondaryLink from "@/Components/SecondaryLink";
import Avatar from '@mui/material/Avatar';
import Image from "@/Components/Image";
import { CImage } from "@coreui/react";
import { router } from '@inertiajs/react'
import ButtonSecondary from "@/Components/ButtonSecondary";


const Course = ({ auth }) => {
    const { courses, difficulties, professors, categories, url, toastt } = usePage().props;
    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const idInput = useRef();
    const titleInput = useRef();
    const descriptionInput = useRef();
    const short_descriptionInput = useRef();
    const slugInput = useRef();
    const difficulty_idInput = useRef();
    const professor_idInput = useRef();
    const category_idInput = useRef();
    const stateInput = useRef();
    const priceInput = useRef();
    const target_learningInput = useRef();
    const target_audienceInput = useRef();
    const houresInput = useRef();
    const files_includedInput = useRef();
    const requirementsInput = useRef();
    const imageInput = useRef();
    const videoInput = useRef();
    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        id: '',
        title: '',
        description: '',
        short_description: '',
        slug: '',
        difficulty_id: '',
        professor_id: '',
        category_id: '',
        state: false,
        price: '',
        target_learning: '',
        target_audience: '',
        houres: '',
        requirements: '',
        image: '',
        video: '',
    });
    const openModal = (op, id, title, description, short_description, slug, difficulty_id, professor_id, category_id, state, price, target_learning, target_audience, houres, requirements, image, video) => {
        setModal(true);
        setOperation(op);
        setData({
            id: '',
            title: '',
            description: '',
            short_description: '',
            slug: '',
            difficulty_id: '',
            professor_id: '',
            category_id: '',
            state: false,
            price: '',
            target_learning: '',
            target_audience: '',
            houres: '',
            requirements: '',
            image: '',
            video: '',
        })
        if (op === 1) {
            setTitle('Añadir curso');
        } else {
            setTitle('Editar curso');
            setData({
                id: id,
                title: title,
                description: description,
                short_description: short_description,
                slug: slug,
                difficulty_id: difficulty_id,
                professor_id: professor_id,
                category_id: category_id,
                state: state,
                price: price,
                target_learning: target_learning,
                target_audience: target_audience,
                houres: houres,
                requirements: requirements,
                image: image,
                video: video,
            })
        }
    }
    const closeModal = () => {
        setModal(false);
    }

    const save = (e) => {
        e.preventDefault();

        if (operation === 1) {
            post(route('admin.courses.store'), {
                onSuccess: () => { ok('Curso creado con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.title) { reset('title'); titleInput.current.focus(); }
                    if (errors.description) { reset('description'); descriptionInput.current.focus(); }
                    if (errors.short_description) { reset('short_description'); short_descriptionInput.current.focus(); }
                    if (errors.slug) { reset('slug'); slugInput.current.focus(); }
                    if (errors.difficulty_id) { reset('difficulty_id'); difficulty_idInput.current.focus(); }
                    if (errors.professor_id) { reset('professor_id'); professor_idInput.current.focus(); }
                    if (errors.category_id) { reset('category_id'); category_idInput.current.focus(); }
                    if (errors.state) { reset('state'); stateInput.current.focus(); }
                    if (errors.price) { reset('price'); priceInput.current.focus(); }
                    if (errors.target_learning) { reset('target_learning'); target_learningInput.current.focus(); }
                    if (errors.target_audience) { reset('target_audience'); target_audienceInput.current.focus(); }
                    if (errors.houres) { reset('houres'); houresInput.current.focus(); }
                    if (errors.files_included) { reset('files_included'); files_includedInput.current.focus(); }
                    if (errors.requirements) { reset('requirements'); requirementsInput.current.focus(); }
                    if (errors.image) { reset('image'); imageInput.current.focus(); }
                    if (errors.video) { reset('video'); videoInput.current.focus(); }
                }
            });
        } else {
            post(route('admin.courses.update', data.id), {
                onSuccess: () => { ok('Curso editado con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.title) { reset('title'); titleInput.current.focus(); }
                    if (errors.description) { reset('description'); descriptionInput.current.focus(); }
                    if (errors.short_description) { reset('short_description'); short_descriptionInput.current.focus(); }
                    if (errors.slug) { reset('slug'); slugInput.current.focus(); }
                    if (errors.difficulty_id) { reset('difficulty_id'); difficulty_idInput.current.focus(); }
                    if (errors.professor_id) { reset('professor_id'); professor_idInput.current.focus(); }
                    if (errors.category_id) { reset('category_id'); category_idInput.current.focus(); }
                    if (errors.state) { reset('state'); stateInput.current.focus(); }
                    if (errors.price) { reset('price'); priceInput.current.focus(); }
                    if (errors.target_learning) { reset('target_learning'); target_learningInput.current.focus(); }
                    if (errors.target_audience) { reset('target_audience'); target_audienceInput.current.focus(); }
                    if (errors.houres) { reset('houres'); houresInput.current.focus(); }
                    if (errors.files_included) { reset('files_included'); files_includedInput.current.focus(); }
                    if (errors.requirements) { reset('requirements'); requirementsInput.current.focus(); }
                    if (errors.image) { reset('image'); imageInput.current.focus(); }
                    if (errors.video) { reset('video'); videoInput.current.focus(); }
                }
            });
        }
    }

    const [deleteModal, setDeleteModal] = useState(false);

    const openDeleteModal = (dayID, name) => {
        setDeleteModal(true);
        setData({
            id: dayID,
            name: name,
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const deleteDay = (e) => {
        e.preventDefault();
        destroy(route('dias.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Día eliminado con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar el día.');
            },
            onFinish: reset(),
        });
    }


    const ok = (message) => {
        reset();
        closeModal();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file); // Actualiza el estado solo con el archivo de imagen
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setData('video', file); // Actualiza el estado solo con el archivo de video
    };

    const handleShow = (id) => {
        get(route('admin.courses.show', id))
    }

    const [toastInfo, setToastInfo] = useState(null);

    useEffect(() => {
        // Verificar si hay información de "toast" y mostrar el "toast" correspondiente
        if (toastt) {
            setToastInfo(toastt);
        }
    }, [toastt]);

    useEffect(() => {
        // Mostrar el "toast" cuando se actualice el estado local
        if (toastInfo) {
            toast[toastInfo.tipo](toastInfo.mensaje);
            setToastInfo(null); // Limpiar el estado después de mostrar el "toast"
        }
    }, [toastInfo]);

    return (
        <>
            <ToastContainer></ToastContainer>
            <DashboardLayout title="Mostrando cursos en sistema" auth={auth}>
                <div className="flex justify-end mb-4" onClick={(e) => { openModal(1) }}>
                    <ButtonPrimary>Agregar</ButtonPrimary>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>IMAGEN</TableCell>
                                <TableCell>TITULO</TableCell>
                                <TableCell>DESCRIPCIÓN CORTA</TableCell>
                                <TableCell>CATEGORÍA</TableCell>
                                <TableCell>ESTADO</TableCell>
                                <TableCell>PRECIO</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map((course) => (
                                <TableRow key={course.id}>
                                    <TableCell>
                                        <CImage rounded thumbnail src={`${url}storage/${course.image}`} width={200} height={200} alt={course.name} />
                                    </TableCell>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.short_description}</TableCell>
                                    <TableCell>{course.coursecategory.name}</TableCell>
                                    <TableCell>{course.state === 1 ? <RiCircleFill className="text-green-600 text-2xl mx-auto" /> : <RiCircleFill className="text-red-600 text-2xl mx-auto" />}</TableCell>
                                    <TableCell>{course.price}</TableCell>
                                    <TableCell>
                                        <ButtonSecondary onClick={(e) => { handleShow(course.id) }}>
                                            Mostrar
                                        </ButtonSecondary>
                                        <ButtonEdit onClick={(e) => { openModal(2, course.id, course.title, course.description, course.short_description, course.slug, course.difficulty_id, course.professor_id, course.category_id, course.state === 1 ? true : false, course.price, course.target_learning, course.target_audience, course.houres, course.requirements, '', course.video) }}>
                                            Editar
                                        </ButtonEdit>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DashboardLayout>

            <Head>
                <title>Cursos</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>

            <Dialog open={modal} onClose={closeModal} maxWidth="md" fullWidth>
                <form onSubmit={save} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-primary font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>

                        <InputLabel htmlFor='title' value='Título'></InputLabel>
                        <TextInput id='title' name='title' ref={titleInput} value={data.title} required='required' onChange={(e) => setData('title', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='description' value='Descripción'></InputLabel>
                        <TextField multiline className="w-full" rows={4} id="description" name="description" ref={descriptionInput} value={data.description || ''} onChange={(e) => setData('description', e.target.value)} />
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='short_description' value='Descripión corta'></InputLabel>
                        <TextInput id='short_description' name='short_description' ref={short_descriptionInput} value={data.short_description} required='required' onChange={(e) => setData('short_description', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='slug' value='Slug'></InputLabel>
                        <TextInput id='slug' name='slug' ref={slugInput} value={data.slug} required='required' onChange={(e) => setData('slug', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='difficulty_id' value='Selecciona una dificultad: ' />
                        <Select
                            className="w-full mt-1"
                            id='difficulty_id'
                            ref={difficulty_idInput}
                            value={data.difficulty_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("difficulty_id", e.target.value)}
                        >
                            {difficulties.map((difficulty) => (
                                <MenuItem key={difficulty.id} value={difficulty.id}>
                                    {difficulty.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <InputLabel htmlFor='professor_id' value='Selecciona un profesor: ' />
                        <Select
                            className="w-full mt-1"
                            id='professor_id'
                            ref={professor_idInput}
                            value={data.professor_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("professor_id", e.target.value)}
                        >
                            {professors.map((professor) => (
                                <MenuItem key={professor.id} value={professor.id}>
                                    {professor.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <InputLabel htmlFor='category_id' value='Selecciona una categoría: ' />
                        <Select
                            className="w-full mt-1"
                            id='category_id'
                            ref={category_idInput}
                            value={data.category_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("category_id", e.target.value)}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <InputLabel htmlFor='state' value='¿El curso está activo? ' />
                        {operation === 1 ? <Switch
                            id="state"
                            name="state"
                            checked={false}
                        /> : <Switch
                            id="state"
                            name="state"
                            checked={data.state}
                            onChange={(e) => setData("state", e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />}


                        <InputLabel htmlFor='price' value='Precio: ' />
                        <TextInput className='h-36 mt-2' type='number' id='price' name='price' ref={priceInput} value={data.price || ''} onChange={(e) => setData("price", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='target_learning' value='¿Qué se aprenderá?'></InputLabel>
                        <TextField multiline className="w-full" rows={6} id="target_learning" name="target_learning" ref={target_learningInput} value={data.target_learning || ''} onChange={(e) => setData('target_learning', e.target.value)} />
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='target_audience' value='¿Cuál es el publico objetivo?'></InputLabel>
                        <TextField multiline className="w-full" rows={6} id="target_audience" name="target_audience" ref={target_audienceInput} value={data.target_audience || ''} onChange={(e) => setData('target_audience', e.target.value)} />
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='houres' value='Horas del curso: ' />
                        <TextInput className='' type='number' id='houres' name='houres' ref={houresInput} value={data.houres || ''} onChange={(e) => setData("houres", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='requirements' value='¿Cuáles son los requerimientos?'></InputLabel>
                        <TextField multiline className="w-full" rows={6} id="requirements" name="requirements" ref={requirementsInput} value={data.requirements || ''} onChange={(e) => setData('requirements', e.target.value)} />
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor="image">Foto de curso:</InputLabel>
                        <TextField
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                        />
                        <InputError message={errors.image} />


                        <InputLabel htmlFor="video">Video de curso:</InputLabel>
                        <TextField
                            type="file"
                            accept="video/*"
                            id="video"
                            name="video"
                            onChange={handleVideoChange}
                        />
                        <InputError message={errors.video} />
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
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar el curso "{data.name}"?
                    </h2>

                </div>
                <form onSubmit={deleteDay} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="">Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Borrar Curso
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    )
}

// Index.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Course

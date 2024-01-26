import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
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


const Course = ({ auth }) => {
    const { courses } = usePage().props;
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
    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        title: '',
        description: '',
        short_description: '',
        slug: '',
        difficulty_id: '',
        professor_id: '',
        category_id: '',
        state: '',
        price: '',
        target_learning: '',
        target_audience: '',
        houres: '',
        files_included: '',
        requirements: '',
        image: '',
        video: '',
    });
    const openModal = (op, id, title, description, short_description, slug, difficulty_id, professor_id, category_id, state, price, target_learning, target_audience, houres, files_included, requirements, image, video) => {
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
            state: '',
            price: '',
            target_learning: '',
            target_audience: '',
            houres: '',
            files_included: '',
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
                files_included: files_included,
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
            post(route('admin.course.store'), {
                onSuccess: () => { ok('Curso creado con éxito') },
                onError: () => {
                    if (errors.name) { reset('id'); idInput.current.focus(); }
                    if (errors.name) { reset('title'); titleInput.current.focus(); }
                    if (errors.name) { reset('description'); descriptionInput.current.focus(); }
                    if (errors.name) { reset('short_description'); short_descriptionInput.current.focus(); }
                    if (errors.name) { reset('slug'); slugInput.current.focus(); }
                    if (errors.name) { reset('difficulty_id'); difficulty_idInput.current.focus(); }
                    if (errors.name) { reset('professor_id'); professor_idInput.current.focus(); }
                    if (errors.name) { reset('category_id'); category_idInput.current.focus(); }
                    if (errors.name) { reset('state'); stateInput.current.focus(); }
                    if (errors.name) { reset('price'); priceInput.current.focus(); }
                    if (errors.name) { reset('target_learning'); target_learningInput.current.focus(); }
                    if (errors.name) { reset('target_audience'); target_audienceInput.current.focus(); }
                    if (errors.name) { reset('houres'); houresInput.current.focus(); }
                    if (errors.name) { reset('files_included'); files_includedInput.current.focus(); }
                    if (errors.name) { reset('requirements'); requirementsInput.current.focus(); }
                    if (errors.name) { reset('image'); imageInput.current.focus(); }
                    if (errors.name) { reset('video'); videoInput.current.focus(); }
                }
            });
        } else {
            put(route('admin.course.store', data.id), {
                onSuccess: () => { ok('Curso editado con éxito') },
                onError: () => {
                    if (errors.name) { reset('id'); idInput.current.focus(); }
                    if (errors.name) { reset('title'); titleInput.current.focus(); }
                    if (errors.name) { reset('description'); descriptionInput.current.focus(); }
                    if (errors.name) { reset('short_description'); short_descriptionInput.current.focus(); }
                    if (errors.name) { reset('slug'); slugInput.current.focus(); }
                    if (errors.name) { reset('difficulty_id'); difficulty_idInput.current.focus(); }
                    if (errors.name) { reset('professor_id'); professor_idInput.current.focus(); }
                    if (errors.name) { reset('category_id'); category_idInput.current.focus(); }
                    if (errors.name) { reset('state'); stateInput.current.focus(); }
                    if (errors.name) { reset('price'); priceInput.current.focus(); }
                    if (errors.name) { reset('target_learning'); target_learningInput.current.focus(); }
                    if (errors.name) { reset('target_audience'); target_audienceInput.current.focus(); }
                    if (errors.name) { reset('houres'); houresInput.current.focus(); }
                    if (errors.name) { reset('files_included'); files_includedInput.current.focus(); }
                    if (errors.name) { reset('requirements'); requirementsInput.current.focus(); }
                    if (errors.name) { reset('image'); imageInput.current.focus(); }
                    if (errors.name) { reset('video'); videoInput.current.focus(); }
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



    return (
        <>
            <ToastContainer></ToastContainer>
            <DashboardLayout title="Mostrando cursos en sistema" auth={auth}>
                <div>

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
                                <Tablerow key={course.id}>
                                    <TableCell>{course.image}</TableCell>
                                    <TableCell>{course.title}</TableCell>
                                    <TableCell>{course.short_description}</TableCell>
                                    <TableCell>{course.coursecategory.name}</TableCell>
                                    <TableCell>{course.state}</TableCell>
                                    <TableCell>{course.price}</TableCell>
                                </Tablerow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DashboardLayout>

            <Head>
                <title>Cursos</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>

            <Modal show={modal} onClose={closeModal}>
                <h2 className="text-3xl font-medium text-gray-900 pl-6 pr-6 pt-6 text-primary font-extrabold">
                    {title}
                </h2>

                <form onSubmit={save} className=" pl-6 pr-6 pb-6 ">
                    <div className="mt-6">
                        <InputLabel htmlFor='title' value='Título'></InputLabel>
                        <TextInput id='title' name='title' ref={titleInput} value={data.title} required='required' onChange={(e) => setData('title', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>



                        <InputLabel htmlFor='short_description' value='Descripión corta'></InputLabel>
                        <TextInput id='short_description' name='short_description' ref={short_descriptionInput} value={data.short_description} required='required' onChange={(e) => setData('short_description', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>
                    </div>
                    <div className="mt-6">


                    </div>
                    <div className="mt-6 flex justify-end">
                        <ButtonCancel type='button' onClick={closeModal}>Cancel</ButtonCancel>
                        <ButtonPrimary disabled={processing} className="ml-3">Guardar</ButtonPrimary>
                    </div>
                </form>
            </Modal>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar el dia "{data.name}"?
                    </h2>
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Esta acción no se puede revertir.
                    </p> */}
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
                            Borrar Día
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    )
}

// Index.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Course

import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, useForkRef, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    makeStyles,
    MenuList,
    Typography,
} from '@mui/material';
import { RiCircleFill } from "react-icons/ri";
import { Head, useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { RiEditBoxLine, RiDeleteBin6Fill, RiArrowDownSFill, RiDeleteBinFill, RiEditBoxFill } from "react-icons/ri";
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
import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CImage } from "@coreui/react";
import { router } from '@inertiajs/react'
import ButtonSecondary from "@/Components/ButtonSecondary";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';


const Course = ({ auth }) => {
    const { course, url, toastt, difficulties, professors, categories, modules, lessons } = usePage().props;
    const [modal, setModal] = useState(false);
    const [courseModal, setCourseModal] = useState(false);
    const [moduleModal, setModuleModal] = useState(false);
    const [lessonModal, setLessonModal] = useState(false);
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
    const course_idInput = useRef();
    const nameInput = useRef();
    const module_idInput = useRef();
    const lesson_numberInput = useRef();
    const contentInput = useRef();
    const content_houresInput = useRef();
    const content_minutesInput = useRef();
    const resources_urlInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, progress, errors, reset } = useForm({
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

        course_id: course.id,
        name: '',

        module_id: '',
        lesson_number: '',
        content: '',
        content_houres: '',
        content_minutes: '',
        resources_url: '',
    });
    const openCourseModal = (op, id, title, description, short_description, slug, difficulty_id, professor_id, category_id, state, price, target_learning, target_audience, houres, requirements, image, video) => {
        setCourseModal(true);
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
    const closeCourseModal = () => {
        setCourseModal(false);
    }

    const submitCourse = (e) => {
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file); // Actualiza el estado solo con el archivo de imagen
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setData('video', file); // Actualiza el estado solo con el archivo de video
    };

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

    //MODULES FUNCTIONS ----------------------------------------------------------------------
    const openModuleModal = (op, id, name, short_description) => {
        setModuleModal(true);
        setOperation(op);
        setData({
            id: '',
            course_id: course.id,
            name: '',
            short_description: '',
        })
        if (op === 1) {
            setTitle('Añadir módulo');
        } else {
            setTitle('Editar módulo');
            setData({
                id: id,
                course_id: course.id,
                name: name,
                short_description: short_description,
            })
        }
    }
    const closeModuleModal = () => {
        setModuleModal(false);
    }
    const submitModal = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('admin.modules.store'), {
                onSuccess: () => { ok('Módulo agregado con éxito.') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.course_id) { reset('course_id'); course_idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.short_description) { reset('short_description'); short_descriptionInput.current.focus(); }
                }
            })
        } else {
            put(route('admin.modules.update', data.id), {
                onSuccess: () => { ok('Módulo editado con éxito.') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.course_id) { reset('course_id'); course_idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.short_description) { reset('short_description'); short_descriptionInput.current.focus(); }
                }
            })
        }
    }
    const [deleteModuleModal, setDeleteModuleModal] = useState(false);

    const openDeleteModuleModal = (module_id, name) => {
        setDeleteModuleModal(true);
        setData({
            id: module_id,
            name: name,
        })
    }

    const closeDeleteModuleModal = () => {
        setDeleteModuleModal(false);
    }

    const deleteModule = (e) => {
        e.preventDefault();
        destroy(route('admin.module.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Módulo eliminado con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar el módulo.');
            },
        });
    }
    //----------------------------------------------------------------------------------------
    //LESSON FUNCTIONS ----------------------------------------------------------------------
    const openLessonModal = (op, module_id, id, lesson_number, name, content, content_houres, content_minutes, resources_url, image, video) => {
        setLessonModal(true);
        setOperation(op);
        setData({
            id: '',
            module_id: module_id,
            lesson_number: '',
            name: '',
            content: '',
            content_houres: '',
            content_minutes: '',
            resources_url: '',
            image: '',
            video: '',
        })
        if (op === 1) {
            setTitle('Añadir lección');
        } else {
            setTitle('Editar lección');
            setData({
                id: id,
                module_id: module_id,
                lesson_number: lesson_number,
                name: name,
                content: content,
                content_houres: content_houres,
                content_minutes: content_minutes,
                resources_url: resources_url,
                image: image,
                video: video,
            })
        }
    }
    const closeLessonModal = () => {
        setLessonModal(false);
    }
    const submitLesson = (e) => {
        e.preventDefault();
        if (operation === 1) {
            post(route('admin.lesson.store'), {
                onSuccess: () => { ok('Lección agregada con éxito.') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.module_id) { reset('module_id'); module_idInput.current.focus(); }
                    if (errors.lesson_number) { reset('lesson_number'); lesson_numberInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.content) { reset('content'); contentInput.current.focus(); }
                    if (errors.content_houres) { reset('content_houres'); content_houresInput.current.focus(); }
                    if (errors.content_minutes) { reset('content_minutes'); content_minutesInput.current.focus(); }
                    if (errors.resources_url) { reset('resources_url'); resources_urlInput.current.focus(); }
                    if (errors.image) { reset('image'); imageInput.current.focus(); }
                    if (errors.video) { reset('video'); videoInput.current.focus(); }
                }
            })
        } else {
            post(route('admin.lesson.update', data.id), {
                onSuccess: () => { ok('Lección editada con éxito.') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.module_id) { reset('module_id'); module_idInput.current.focus(); }
                    if (errors.lesson_number) { reset('lesson_number'); lesson_numberInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.content) { reset('content'); contentInput.current.focus(); }
                    if (errors.content_houres) { reset('content_houres'); content_houresInput.current.focus(); }
                    if (errors.content_minutes) { reset('content_minutes'); content_minutesInput.current.focus(); }
                    if (errors.resources_url) { reset('resources_url'); resources_urlInput.current.focus(); }
                    if (errors.image) { reset('image'); imageInput.current.focus(); }
                    if (errors.video) { reset('video'); videoInput.current.focus(); }
                }
            })
        }
    }

    const [deleteLessonModal, setDeleteLessonModal] = useState(false);

    const openDeleteLessonModal = (lesson_id, name) => {
        setDeleteLessonModal(true);
        setData({
            id: lesson_id,
            name: name,
        })
    }

    const closeDeleteLessonModal = () => {
        setDeleteLessonModal(false);
    }

    const deleteLesson = (e) => {
        e.preventDefault();
        destroy(route('admin.lesson.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Lección eliminado con éxito.') },
            onError: (error) => {
                console.error(error); // Log the error for debugging
                errorModal('Error al eliminar el día.');
            },
        });
    }
    //----------------------------------------------------------------------------------------


    const ok = (message) => {
        reset();
        closeCourseModal();
        closeModuleModal();
        closeLessonModal();
        closeDeleteModal();
        closeDeleteLessonModal();
        closeDeleteModuleModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };


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
            <DashboardLayout title={`${course.title}`} auth={auth}>
                <div className="mb-7 flex justify-end">
                    <ButtonEdit onClick={(e) => { openCourseModal(2, course.id, course.title, course.description, course.short_description, course.slug, course.difficulty_id, course.professor_id, course.category_id, course.state === 1 ? true : false, course.price, course.target_learning, course.target_audience, course.houres, course.requirements, '', course.video) }}>
                        Editar
                    </ButtonEdit>
                    <ButtonSecondary onClick={() => { openModuleModal(1) }}>
                        Agregar módulo
                    </ButtonSecondary>
                </div>
                <div className="lg:flex">
                    <div className="lg:w-[40%] pr-3 text-center flex justify-center md:mb-8">
                        <CImage rounded thumbnail src={`${url}storage/${course.image}`} width={400} height={400} alt={course.name} />
                    </div>
                    <div>
                        <h1 className=""><strong className="text-primary">Titulo: </strong> {course.title}</h1>
                        <h1 className=""><strong className="text-primary">Descripción corta: </strong> {course.short_description}</h1>
                        <h1 className=""><strong className="text-primary">Profesor: </strong> {course.professor.name}</h1>
                        <h1 className=""><strong className="text-primary">Categoría: </strong> {course.coursecategory.name}</h1>
                        <h1 className=""><strong className="text-primary">Dificultad: </strong> {course.coursedifficulty.name}</h1>
                        <h1 className=""><strong className="text-primary">Precio: </strong> {course.price} pesos</h1>
                        <h1 className="flex"><strong className="text-primary">Activo: </strong> {course.state === 1 ? <RiCircleFill className="text-green-600 text-2xl" /> : <RiCircleFill className="text-red-600 text-2xl" />}</h1>
                        <h1 className=""><strong className="text-primary">Horas: </strong> {course.houres} hrs</h1>
                    </div>
                </div>
                <div className="mt-4">
                    <h1 className="text-secondary font-bold text-xl">Descripción</h1>
                    <p>{course.description}</p>
                </div>
                <div className="mt-8">
                    <h1 className="text-secondary font-bold text-xl mb-6">Módulos y lecciones</h1>
                    {modules.map((module) => (
                        <Accordion key={module.id}>
                            <AccordionSummary
                                expandIcon={<RiArrowDownSFill />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography sx={{ width: '15%', flexShrink: 0 }}>
                                    {module.name}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{module.short_description}</Typography>

                            </AccordionSummary>
                            <AccordionDetails sx={{ paddingBottom: 0, paddingTop: 0, flexShrink: 0 }}>
                                {lessons.map((lesson) => (
                                    lesson.module_id === module.id ? (
                                        <MenuItem key={lesson.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CImage rounded className="mr-4" thumbnail src={`${url}storage/${lesson.image}`} width={100} height={100} alt={lesson.name} />
                                                {`${lesson.lesson_number}.   `}
                                                {lesson.name}
                                            </Typography>
                                            <Typography>
                                                <ButtonEdit onClick={(e) => { openLessonModal(2, lesson.module_id, lesson.id, lesson.lesson_number, lesson.name, lesson.content, lesson.content_houres, lesson.content_minutes, lesson.resources_url, lesson.image, lesson.video) }}><RiEditBoxFill className="text-white" /></ButtonEdit>
                                                <ButtonDelete onClick={(e)=>{openDeleteLessonModal(lesson.id, lesson.name)}}><RiDeleteBinFill className="text-white" /></ButtonDelete>
                                            </Typography>
                                        </MenuItem>
                                    ) : null
                                ))}
                            </AccordionDetails>
                            <AccordionActions sx={{ paddingBottom: 2, paddingTop: 0, flexShrink: 0 }}>
                                <ButtonDelete onClick={(e)=>{openDeleteModuleModal(module.id, module.name)}}>Eliminar</ButtonDelete>
                                <ButtonEdit onClick={(e) => { openModuleModal(2, module.id, module.name, module.short_description) }}>Editar módulo</ButtonEdit>
                                <ButtonSecondary onClick={(e) => { openLessonModal(1, module.id) }}>Agregar lección</ButtonSecondary>
                            </AccordionActions>
                        </Accordion>
                    ))}
                </div>
                <div className="mt-8">
                    <h1 className="text-secondary font-bold text-xl">Objetivos de aprendizaje</h1>
                    <p>{course.target_learning}</p>
                </div>
                <div className="mt-8">
                    <h1 className="text-secondary font-bold text-xl">Público objetivo</h1>
                    <p>{course.target_audience}</p>
                </div>
                <div className="mt-8">
                    <h1 className="text-secondary font-bold text-xl">Requerimientos</h1>
                    <p>{course.requirements}</p>
                </div>
                <div className="mt-8">
                    <h1 className="text-secondary font-bold text-xl">Enlace de recursos</h1>
                    <p>{course.files_included}</p>
                </div>
            </DashboardLayout>

            <Head>
                <title>Cursos</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>

            <Modal show={moduleModal} onClose={closeModuleModal}>
                <h2 className="text-3xl font-medium text-gray-900 pl-6 pr-6 pt-6 text-primary font-extrabold">
                    {title}
                </h2>

                <form onSubmit={submitModal} className="p-6">
                    <InputLabel htmlFor='course_id' value='Curso: ' />
                    <TextInput className='h-36 mt-2' readOnly id='course_id' name='course_id' ref={course_idInput} value={data.course_id || ''} onChange={(e) => setData("course_id", e.target.value)} />
                    <InputError message={errors.course_id} />

                    <InputLabel htmlFor='name' value='Nombre: ' />
                    <TextInput className='h-36 mt-2' id='name' name='name' ref={nameInput} value={data.name || ''} onChange={(e) => setData("name", e.target.value)} />
                    <InputError message={errors.name} />

                    <InputLabel htmlFor='short_description' value='Descripción corta: ' />
                    <TextInput className='h-36 mt-2' id='short_description' name='short_description' ref={short_descriptionInput} value={data.short_description || ''} onChange={(e) => setData("short_description", e.target.value)} />
                    <InputError message={errors.short_description} />

                    <div className="flex justify-end mt-6">
                        <ButtonCancel type='button' onClick={closeModuleModal} className="mr-2" disabled={processing}>Cancelar</ButtonCancel>
                        <ButtonPrimary type='submit' disabled={processing}>Enviar</ButtonPrimary>
                    </div>
                </form>
            </Modal>

            <Dialog open={lessonModal} onClose={closeLessonModal} maxWidth="md" fullWidth>
                <form onSubmit={submitLesson} className="p-6">
                    <DialogTitle className="">
                        <span className="text-2xl text-primary font-bold">{title}</span>
                    </DialogTitle>


                    <InputLabel htmlFor='module_id' value='Módulo: ' />
                    <TextInput className='h-36 mt-2' readOnly id='module_id' name='module_id' ref={module_idInput} value={data.module_id || ''} onChange={(e) => setData("module_id", e.target.value)} />
                    <InputError message={errors.module_id} />

                    <InputLabel htmlFor='lesson_number' value='Número de lección: ' />
                    <TextInput className='h-36 mt-2' type='number' id='lesson_number' name='lesson_number' ref={lesson_numberInput} value={data.lesson_number || ''} onChange={(e) => setData("lesson_number", e.target.value)} />
                    <InputError message={errors.lesson_number} />

                    <InputLabel htmlFor='name' value='Nombre: ' />
                    <TextInput className='h-36 mt-2' id='name' name='name' ref={nameInput} value={data.name || ''} onChange={(e) => setData("name", e.target.value)} />
                    <InputError message={errors.name} />

                    <InputLabel htmlFor='content' value='Contenido: ' />
                    <TextField multiline rows={4} className='h-36 mt-2 w-full' id='content' name='content' ref={contentInput} value={data.content || ''} onChange={(e) => setData("content", e.target.value)} />
                    <InputError message={errors.content} />

                    <InputLabel htmlFor='content_houres' value='Horas de lección: ' />
                    <TextInput className='h-36 mt-2' type='number' id='content_houres' name='content_houres' ref={content_houresInput} value={data.content_houres || ''} onChange={(e) => setData("content_houres", e.target.value)} />
                    <InputError message={errors.content_houres} />

                    <InputLabel htmlFor='content_minutes' value='Minutos de lección: ' />
                    <TextInput className='h-36 mt-2' type='number' id='content_minutes' name='content_minutes' ref={content_minutesInput} value={data.content_minutes || ''} onChange={(e) => setData("content_minutes", e.target.value)} />
                    <InputError message={errors.content_minutes} />

                    <InputLabel htmlFor='resources_url' value='Enlace a recursos: ' />
                    <TextInput className='h-36 mt-2' id='resources_url' name='resources_url' ref={resources_urlInput} value={data.resources_url || ''} onChange={(e) => setData("resources_url", e.target.value)} />
                    <InputError message={errors.content_minutes} />

                    <InputLabel htmlFor="image">Foto de lección:</InputLabel>
                    <TextField
                        type="file"
                        accept="image/*"
                        id="image"
                        name="image"
                        className="w-full"
                        onChange={handleImageChange}
                    />
                    <InputError message={errors.image} />


                    <InputLabel htmlFor="video">Video de lección:</InputLabel>
                    <TextField
                        type="file"
                        accept="video/*"
                        id="video"
                        name="video"
                        className="w-full"
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


                    <DialogActions>
                        <div className="flex justify-end mt-6">
                            <ButtonCancel type='button' onClick={closeLessonModal} className="mr-2" disabled={processing}>Cancelar</ButtonCancel>
                            <ButtonPrimary type='submit' disabled={processing}>Enviar</ButtonPrimary>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={courseModal} onClose={closeCourseModal} maxWidth="md" fullWidth>
                <form onSubmit={submitCourse} className="p-6" encType="multipart/form-data" method="POST">
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
                            <ButtonCancel type='button' onClick={closeCourseModal} disabled={processing}>Cancelar</ButtonCancel>
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
                            Eliminar
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
            <Modal show={deleteModuleModal} onClose={closeDeleteModuleModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar el módulo "{data.name}"?
                    </h2>

                </div>
                <form onSubmit={deleteModule} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModuleModal} className="">Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Eliminar
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
            <Modal show={deleteLessonModal} onClose={closeDeleteLessonModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar la lección "{data.name}"?
                    </h2>

                </div>
                <form onSubmit={deleteLesson} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteLessonModal} className="">Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Eliminar
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>
        </>
    )
}

// Index.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Course

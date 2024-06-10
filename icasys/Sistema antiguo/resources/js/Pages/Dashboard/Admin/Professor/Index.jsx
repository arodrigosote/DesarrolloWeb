import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, useForkRef, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonDelete from "@/Components/ButtonDelete";
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import SelectInput from "@mui/material/Select/SelectInput";
import PrimaryButton from "@/Components/PrimaryButton";
import ButtonSecondary from "@/Components/ButtonSecondary";
import SecondaryLink from "@/Components/SecondaryLink";
import Avatar from '@mui/material/Avatar';


const Professor = () => {
    const { professors, url, auth } = usePage().props;

    const [mainModal, setMainModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(0);
    const idInput = useRef();
    const user_idInput = useRef();
    const nameInput = useRef();
    const emailInput = useRef();
    const phoneInput = useRef();
    const skillInput = useRef();
    const careerInput = useRef();
    const biographyInput = useRef();
    const facebook_urlInput = useRef();
    const github_urlInput = useRef();
    const x_urlInput = useRef();
    const linkedin_urlInput = useRef();
    const web_urlInput = useRef();
    const pictureInput = useRef();
    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        id: '',
        user_id: '',
        name: '',
        email: '',
        phone: '',
        skill: '',
        career: '',
        biography: '',
        facebook_url: '',
        github_url: '',
        x_url: '',
        linkedin_url: '',
        web_url: '',
        picture: File,
    })

    const openMainModal = (op, id, user_id, name, email, phone, skill, career, biography, facebook_url, github_url, x_url, linkedin_url, web_url, picture) => {
        setMainModal(true);
        setOperation(op)
        setData({
            id: '',
            user_id: '',
            name: '',
            email: '',
            phone: '',
            skill: '',
            career: '',
            biography: '',
            facebook_url: '',
            github_url: '',
            x_url: '',
            linkedin_url: '',
            web_url: '',
            picture: File,
        })
        if (op === 1) {
            setTitle('Añadir profesor.');
        } else {
            setTitle('Editar profesor.');
            setData({
                id: id,
                user_id: user_id,
                name: name,
                email: email,
                phone: phone,
                skill: skill,
                career: career,
                biography: biography,
                facebook_url: facebook_url,
                github_url: github_url,
                x_url: x_url,
                linkedin_url: linkedin_url,
                web_url: web_url,
                picture: picture,
            })
        }
    }

    const closeMainModal = () => {
        reset();
        setMainModal(false);
    }

    const submit = (e) => {
        const formData = new FormData();
        formData.append('picture', data.picture);
        console.log(data.picture)
        e.preventDefault();
        if (operation === 1) {
            post(route('profesores.store'), {
                preserveScroll: true,
                onSuccess: () => { ok('Profesor agregado con éxito.') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.user_id) { reset('user_id'); user_idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.email) { reset('email'); emailInput.current.focus(); }
                    if (errors.phone) { reset('phone'); phoneInput.current.focus(); }
                    if (errors.skill) { reset('skill'); skillInput.current.focus(); }
                    if (errors.career) { reset('career'); careerInput.current.focus(); }
                    if (errors.biography) { reset('biography'); biographyInput.current.focus(); }
                    if (errors.facebook_url) { reset('facebook_url'); facebook_urlInput.current.focus(); }
                    if (errors.github_url) { reset('github_url'); github_urlInput.current.focus(); }
                    if (errors.x_url) { reset('x_url'); x_urlInput.current.focus(); }
                    if (errors.linkedin_url) { reset('linkedin_url'); linkedin_urlInput.current.focus(); }
                    if (errors.web_url) { reset('web_url'); web_urlInput.current.focus(); }
                    if (errors.picture) { reset('picture'); pictureInput.current.focus(); }
                }
            })
        } else {
            put(route('profesores.update', data.id), formData, {
                preserveScroll: true,
                onSuccess: () => { ok('Profesor editado con éxito.') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.user_id) { reset('user_id'); user_idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.email) { reset('email'); emailInput.current.focus(); }
                    if (errors.phone) { reset('phone'); phoneInput.current.focus(); }
                    if (errors.skill) { reset('skill'); skillInput.current.focus(); }
                    if (errors.career) { reset('career'); careerInput.current.focus(); }
                    if (errors.biography) { reset('biography'); biographyInput.current.focus(); }
                    if (errors.facebook_url) { reset('facebook_url'); facebook_urlInput.current.focus(); }
                    if (errors.github_url) { reset('github_url'); github_urlInput.current.focus(); }
                    if (errors.x_url) { reset('x_url'); x_urlInput.current.focus(); }
                    if (errors.linkedin_url) { reset('linkedin_url'); linkedin_urlInput.current.focus(); }
                    if (errors.web_url) { reset('web_url'); web_urlInput.current.focus(); }
                    if (errors.picture) { reset('picture'); pictureInput.current.focus(); }
                }
            })
        }
    }

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
        destroy(route('profesores.destroy', data.id), {
            preserveScroll: true,
            onSuccess: () => { ok('Profesor eliminado con éxito.') },
            onError: (error) => {
                console.error(error);
                errorModal('Error al elimiar profesor.');
            }
        })
    }

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

    const handleInputChange = (e) => {
        const { name, files } = e.target;

        // Verificar si el campo es de tipo archivo
        if (files && files.length > 0) {

            // Obtener el objeto de archivo y actualizar el estado
            const file = files[0];
            console.log(name)
            setData(name, files[0]);
        } else {
            // Actualizar otros campos de entrada
            setData(name, e.target.value);
        }
    };

    // const handleImageUpdate = async (e) => {
    //     const formData = new FormData();
    //     formData.append('picture', e.target.files[0]);

    //     try {
    //         await put((route()), formData, {
    //             onSuccess: () => {
    //                 // Lógica para manejar el éxito, por ejemplo, redireccionar a otra página.
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error updating image:', error);
    //     }
    // };

    return (
        <>
            <ToastContainer></ToastContainer>
            <DashboardLayout title={'Mostrando profesores en sistema.'} auth={auth}>
                <div className="flex justify-end items-center">
                    <ButtonPrimary onClick={() => { openMainModal(1) }}>Agregar</ButtonPrimary>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>FOTO</TableCell>
                                <TableCell>NOMBRE</TableCell>
                                <TableCell>CORREO</TableCell>
                                <TableCell>TELÉFONO</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {professors.map((professor) => (
                                <TableRow key={professor.id}>
                                    <TableCell>{professor.id}</TableCell>
                                    <TableCell>
                                        <Avatar alt={professor.name} src={`/storage/${professor.picture}`} />
                                    </TableCell>
                                    <TableCell>{professor.name}</TableCell>
                                    <TableCell>{professor.email}</TableCell>
                                    <TableCell>{professor.phone}</TableCell>
                                    <TableCell>
                                        <ButtonEdit onClick={(e) => openMainModal(2, professor.id, professor.user_id, professor.name, professor.email, professor.phone, professor.skill, professor.career, professor.biography, professor.facebook_url, professor.github_url, professor.x_url, professor.linkedin_url, professor.web_url, professor.picture)}>Editar</ButtonEdit>
                                        <ButtonDelete onClick={(e) => openDeleteModal(professor.id, professor.name)} className="ml-2">Eliminar</ButtonDelete>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DashboardLayout>


            <Dialog open={mainModal} onClose={closeMainModal} maxWidth="md" fullWidth>
                <DialogTitle className="text-3xl font-bold text-gray-900 pl-6 pr-6 pt-6 text-primary font-extrabold">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={submit} className="p-6" encType="multipart/form-data" method="POST">

                        <FormControl className="w-full">
                            {/* Name */}
                            <InputLabel htmlFor='name' value='Nombre:'></InputLabel>
                            <TextInput className="" id='name' name='name' ref={nameInput} value={data.name || ''} required='required' onChange={handleInputChange}></TextInput>
                            <InputError message={errors.make}></InputError>

                            {/* Email */}
                            <InputLabel htmlFor='email' value='Correo:'></InputLabel>
                            <TextInput id='email' name='email' ref={emailInput} value={data.email || ''} required='required' onChange={handleInputChange}></TextInput>
                            <InputError message={errors.make}></InputError>

                            {/* Phone */}
                            <InputLabel htmlFor='phone' value="Teléfono:" />
                            <TextInput id="phone" name="phone" ref={phoneInput} value={data.phone || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            {/* Skill */}
                            <InputLabel htmlFor="skill" value="Habilidades:" />
                            <TextField multiline rows={4} id="skill" name="skill" ref={skillInput} value={data.skill || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            {/* Career */}
                            <InputLabel htmlFor='career' value="Profesión:" className="mt-2" />
                            <TextInput id='career' name='career' ref={careerInput} value={data.career || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            {/* facebook_url */}
                            <InputLabel htmlFor='facebook_url' value='Facebook:' />
                            <TextInput id='facebook_url' name='facebook_url' ref={facebook_urlInput} value={data.facebook_url || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            {/* github_url */}
                            <InputLabel htmlFor='github_url' value='Github:' />
                            <TextInput id='github_url' name='github_url' ref={github_urlInput} value={data.github_url || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            {/* x_url */}
                            <InputLabel htmlFor='x_url' value='X:' />
                            <TextInput id='x_url' name='x_url' ref={x_urlInput} value={data.x_url || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            {/* linkedin_url */}
                            <InputLabel htmlFor='linkedin_url' value='Linkedin:' />
                            <TextInput id='linkedin_url' name='linkedin_url' ref={linkedin_urlInput} value={data.linkedin_url || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            {/* web_url */}
                            <InputLabel htmlFor='web_url' value='Web:' />
                            <TextInput id='web_url' name='web_url' ref={web_urlInput} value={data.web_url || ''} onChange={handleInputChange} />
                            <InputError message={errors.make} />

                            <InputLabel htmlFor="picture">Foto de perfil:</InputLabel>
                            <TextField
                                type="file"
                                // accept="image/*"
                                id="picture"
                                name="picture"
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.make} />

                            <div className="flex justify-end items-center mt-4">
                                <ButtonCancel type='button' onClick={closeMainModal} disabled={processing}>Cancelar</ButtonCancel>
                                <ButtonPrimary className="ml-3" disabled={processing}>Enviar</ButtonPrimary>
                            </div>
                        </FormControl>
                    </form>
                </DialogContent>

            </Dialog>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        ¿Estás seguro que quieres eliminar al profesor "{data.name}"?
                    </h2>
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Esta acción no se puede revertir.
                    </p> */}
                </div>
                <form onSubmit={deletee} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="" disabled={processing}>Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Borrar Profesor
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>

            <Head>
                <title>Profesores</title>
            </Head>
        </>
    )
}

// Professor.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Professor;

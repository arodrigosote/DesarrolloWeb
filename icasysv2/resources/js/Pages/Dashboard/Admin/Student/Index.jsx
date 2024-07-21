import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef } from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, useForkRef, TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch
} from '@mui/material';
import { RiCircleFill } from "react-icons/ri";
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
import ButtonShow from "@/Components/ButtonShow";
import ButtonPayment from "@/Components/ButtonPayment";
import ButtonYellow from "@/Components/ButtonYellow";
import Avatar from '@mui/material/Avatar';

const Student = () => {
    const { students, groups, activities, inscriptions, grades, locations, url, auth } = usePage().props;
    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(0);
    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        id: '',
        name: '',
        group_id: '',
        active: false,
        address: '',
        postal_code: '',
        phone: '',
        user_id: '',
        email: '',
        school_cycle: '',
        grade_id: '',
        activity_id: '',
        location_id: '',
        inscription_id: '',
        birthday: '',
        firstday: '',
        curp: '',
        tutor_id: '',
        occupation: '',
        tuition: '',
        profile_pic: '',
        credential_pic: '',
        tutor_name: '',
        tutor_phone: '',
        tutor_email: '',
        tutor_occupation: ''
    });
    const idInput = useRef();
    const nameInput = useRef();
    const group_idInput = useRef();
    const activeInput = useRef();
    const addressInput = useRef();
    const postal_codeInput = useRef();
    const phoneInput = useRef();
    const user_idInput = useRef();
    const emailInput = useRef();
    const school_cycleInput = useRef();
    const grade_idInput = useRef();
    const activity_idInput = useRef();
    const location_idInput = useRef();
    const inscription_idInput = useRef();
    const birthdayInput = useRef();
    const firstdayInput = useRef();
    const curpInput = useRef();
    const tutor_idInput = useRef();
    const occupationInput = useRef();
    const tuitionInput = useRef();
    const profile_picInput = useRef();
    const credential_picInput = useRef();
    const tutor_nameInput = useRef();
    const tutor_phoneInput = useRef();
    const tutor_emailInput = useRef();
    const tutor_occupationInput = useRef();

    const openMainModal = (op, id, name, group_id, active, address, postal_code, phone, user_id, email, school_cycle, grade_id, activity_id, location_id, inscription_id, birthday, firstday, curp, tutor_id, occupation, tuition, profile_pic, credential_pic, tutor_name, tutor_phone, tutor_email, tutor_occupation) => {
        setMainModal(true);
        setOperation(op);
        setData({
            id: '',
            name: '',
            group_id: '',
            active: false,
            address: '',
            postal_code: '',
            phone: '',
            user_id: '',
            email: '',
            school_cycle: '',
            grade_id: '',
            activity_id: '',
            location_id: '',
            inscription_id: '',
            birthday: '',
            firstday: '',
            curp: '',
            tutor_id: '',
            occupation: '',
            tuition: '',
            profile_pic: '',
            credential_pic: '',
            tutor_name: '',
            tutor_phone: '',
            tutor_email: '',
            tutor_occupation: ''
        })
        if (op === 1) {
            setTitle('Dar alta de alumno.')
        } else {
            setTitle('Editar informaciónde alumno.')
            setData({
                id: id,
                name: name,
                group_id: group_id,
                active: active,
                address: address,
                postal_code: postal_code,
                phone: phone,
                user_id: user_id,
                email: email,
                school_cycle: school_cycle,
                grade_id: grade_id,
                activity_id: activity_id,
                location_id: location_id,
                inscription_id: inscription_id,
                birthday: birthday,
                firstday: firstday,
                curp: curp,
                tutor_id: tutor_id,
                occupation: occupation,
                tuition: tuition,
                profile_pic: profile_pic,
                credential_pic: credential_pic,
                tutor_name: tutor_name,
                tutor_phone: tutor_phone,
                tutor_email: tutor_email,
                tutor_occupation: tutor_occupation,
            })
        }
    }
    const closeMainModal = () => {
        setMainModal(false);
    }
    const showStudent = (id) => {
        get(route('alumnos.show', id));
    }
    const studetnPayment = (id) => {
        get(route('alumnos.payment.show', id));
    }
    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {
            data.active = true;
            post(route('alumnos.store'), {
                onSuccess: () => { ok('Alumno dado de alta con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.group_id) { reset('group_id'); group_idInput.current.focus(); }
                    if (errors.active) { reset('active'); activeInput.current.focus(); }
                    if (errors.address) { reset('address'); addressInput.current.focus(); }
                    if (errors.postal_code) { reset('postal_code'); postal_codeInput.current.focus(); }
                    if (errors.phone) { reset('phone'); phoneInput.current.focus(); }
                    if (errors.user_id) { reset('user_id'); user_idInput.current.focus(); }
                    if (errors.email) { reset('email'); emailInput.current.focus(); }
                    if (errors.school_cycle) { reset('school_cycle'); school_cycleInput.current.focus(); }
                    if (errors.grade_id) { reset('grade_id'); grade_idInput.current.focus(); }
                    if (errors.activity_id) { reset('activity_id'); activity_idInput.current.focus(); }
                    if (errors.location_id) { reset('location_id'); location_idInput.current.focus(); }
                    if (errors.inscription_id) { reset('inscription_id'); inscription_idInput.current.focus(); }
                    if (errors.birthday) { reset('birthday'); birthdayInput.current.focus(); }
                    if (errors.firstday) { reset('firstday'); firstdayInput.current.focus(); }
                    if (errors.curp) { reset('curp'); curpInput.current.focus(); }
                    if (errors.tutor_id) { reset('tutor_id'); tutor_idInput.current.focus(); }
                    if (errors.occupation) { reset('occupation'); occupationInput.current.focus(); }
                    if (errors.tuition) { reset('tuition'); tuitionInput.current.focus(); }
                    if (errors.profile_pic) { reset('profile_pic'); profile_picInput.current.focus(); }
                    if (errors.credential_pic) { reset('credential_pic'); credential_picInput.current.focus(); }
                    if (errors.tutor_name) { reset('tutor_name'); tutor_nameInput.current.focus(); }
                    if (errors.tutor_phone) { reset('tutor_phone'); tutor_phoneInput.current.focus(); }
                    if (errors.tutor_email) { reset('tutor_email'); tutor_emailInput.current.focus(); }
                    if (errors.tutor_occupation) { reset('tutor_occupation'); tutor_occupationInput.current.focus(); }
                }
            });
        } else {
            put(route('alumnos.update', data.id), {
                onSuccess: () => { ok('Alumno actualizado con éxito') },
                onError: () => {
                    if (errors.id) { reset('id'); idInput.current.focus(); }
                    if (errors.name) { reset('name'); nameInput.current.focus(); }
                    if (errors.group_id) { reset('group_id'); group_idInput.current.focus(); }
                    if (errors.active) { reset('active'); activeInput.current.focus(); }
                    if (errors.address) { reset('address'); addressInput.current.focus(); }
                    if (errors.postal_code) { reset('postal_code'); postal_codeInput.current.focus(); }
                    if (errors.phone) { reset('phone'); phoneInput.current.focus(); }
                    if (errors.user_id) { reset('user_id'); user_idInput.current.focus(); }
                    if (errors.email) { reset('email'); emailInput.current.focus(); }
                    if (errors.school_cycle) { reset('school_cycle'); school_cycleInput.current.focus(); }
                    if (errors.grade_id) { reset('grade_id'); grade_idInput.current.focus(); }
                    if (errors.activity_id) { reset('activity_id'); activity_idInput.current.focus(); }
                    if (errors.location_id) { reset('location_id'); location_idInput.current.focus(); }
                    if (errors.inscription_id) { reset('inscription_id'); inscription_idInput.current.focus(); }
                    if (errors.birthday) { reset('birthday'); birthdayInput.current.focus(); }
                    if (errors.firstday) { reset('firstday'); firstdayInput.current.focus(); }
                    if (errors.curp) { reset('curp'); curpInput.current.focus(); }
                    if (errors.tutor_id) { reset('tutor_id'); tutor_idInput.current.focus(); }
                    if (errors.occupation) { reset('occupation'); occupationInput.current.focus(); }
                    if (errors.tuition) { reset('tuition'); tuitionInput.current.focus(); }
                    if (errors.profile_pic) { reset('profile_pic'); profile_picInput.current.focus(); }
                    if (errors.credential_pic) { reset('credential_pic'); credential_picInput.current.focus(); }
                    if (errors.tutor_name) { reset('tutor_name'); tutor_nameInput.current.focus(); }
                    if (errors.tutor_phone) { reset('tutor_phone'); tutor_phoneInput.current.focus(); }
                    if (errors.tutor_email) { reset('tutor_email'); tutor_emailInput.current.focus(); }
                    if (errors.tutor_occupation) { reset('tutor_occupation'); tutor_occupationInput.current.focus(); }
                }
            })
        }
    }

    const ok = (message) => {
        reset();
        closeMainModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };

    const errorModal = (message) => {
        reset();
        closeMainModal();
        Swal.fire({ title: message, icon: 'error', confirmButtonColor: '#014ba0' })
    };

    const handleProfilepicChange = (e) => {
        const file = e.target.files[0];
        setData('profile_pic', file); // Actualiza el estado solo con el archivo de imagen
    };
    const handleCredentialpicChange = (e) => {
        const file = e.target.files[0];
        setData('credential_pic', file); // Actualiza el estado solo con el archivo de imagen
    };

    return (
        <>

            <DashboardLayout title={'Mostrando alumnos inscritos y activos.'} auth={auth}>
                <div className="flex justify-end">
                    <ButtonPrimary onClick={(e) => openMainModal(1)}>Alta</ButtonPrimary>
                </div>

                <div className="container mx-auto p-4">
                    <div className="overflow-x-auto">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>FOTO</TableCell>
                                        <TableCell>NOMBRE</TableCell>
                                        <TableCell>DIA</TableCell>
                                        <TableCell>HORA</TableCell>
                                        <TableCell>MAESTRO</TableCell>
                                        <TableCell>COLEGIATURA</TableCell>
                                        <TableCell>ACTIVO</TableCell>
                                        <TableCell>ACCIONES</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell>
                                                <Avatar alt={student.name} src={`${url}/storage/${student.profile_pic}`} />
                                                {/* <img src={`${url}/storage/${student.profile_pic}`} alt="student_pic" className="max-w-20 max-h-20 rounded-full" /> */}
                                            </TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.group.schedule.day.name}</TableCell>
                                            <TableCell>{student.group.schedule.hour.name}</TableCell>
                                            <TableCell>{student.group.professor.name}</TableCell>
                                            <TableCell>{student.tuition}</TableCell>
                                            <TableCell>
                                                {student.active === 1 ? <RiCircleFill className="text-green-600 text-2xl mx-auto" /> : <RiCircleFill className="text-red-600 text-2xl mx-auto" />}
                                            </TableCell>
                                            <TableCell>
                                                <ButtonYellow type='button' className="md:inline-block w-full my-0" onClick={(e) => studetnPayment(student.id)}>Pago</ButtonYellow>
                                                <ButtonShow type='button' className="md:inline-block w-full my-0" onClick={(e) => showStudent(student.id)}>Mostrar</ButtonShow>
                                                <ButtonEdit
                                                    onClick={(e) =>
                                                        openMainModal(
                                                            2,
                                                            student.id,
                                                            student.name,
                                                            student.group_id,
                                                            student.active === 1 ? true : false,
                                                            student.address,
                                                            student.postal_code,
                                                            student.phone,
                                                            student.user_id,
                                                            student.email,
                                                            student.school_cycle,
                                                            student.grade_id,
                                                            student.activity_id,
                                                            student.location_id,
                                                            student.inscription_id,
                                                            student.birthday,
                                                            student.firstday,
                                                            student.curp,
                                                            student.tutor_id,
                                                            student.occupation,
                                                            student.tuition,
                                                            student.profile_pic,
                                                            student.credential_pic,
                                                            student.tutor.name,
                                                            student.tutor.phone,
                                                            student.tutor.email,
                                                            student.tutor.occupation
                                                        )
                                                    }
                                                    className="md:inline-block w-full my-0"
                                                >
                                                    Editar
                                                </ButtonEdit>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <table className="w-full border-collapse border border-gray-300 text-center">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2">FOTO</th>
                                <th className="p-2">NOMBRE</th>
                                <th className="p-2">DIA</th>
                                <th className="p-2">HORA</th>
                                <th className="p-2">MAESTRO</th>
                                <th className="p-2">COLEGIATURA</th>
                                <th className="p-2">ACTIVO</th>
                                <th className="p-2">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-t border-gray-300">
                                    <td className="p-2">
                                        <img src={`${url}/storage/${student.profile_pic}`} alt="student_pic" className="max-w-20 max-h-20 rounded-full" />
                                    </td>
                                    <td className="p-2">{student.name}</td>
                                    <td className="p-2">{student.group.schedule.day.name}</td>
                                    <td className="p-2">{student.group.schedule.hour.name}</td>
                                    <td className="p-2">{student.group.professor.name}</td>
                                    <td className="p-2">{student.tuition}</td>
                                    <td className="p-2">
                                        {student.active === 1 ? <RiCircleFill className="text-green-600 text-2xl mx-auto" /> : <RiCircleFill className="text-red-600 text-2xl mx-auto" />}
                                    </td>
                                    <td className="p-2">
                                        <ButtonYellow type='button' className="md:inline-block" onClick={(e) => studetnPayment(student.id)}>Pago</ButtonYellow>
                                        <ButtonShow type='button' className="md:inline-block" onClick={(e) => showStudent(student.id)}>Mostrar</ButtonShow>
                                        <ButtonEdit
                                            onClick={(e) =>
                                                openMainModal(
                                                    2,
                                                    student.id,
                                                    student.name,
                                                    student.group_id,
                                                    student.active === 1 ? true : false,
                                                    student.address,
                                                    student.postal_code,
                                                    student.phone,
                                                    student.user_id,
                                                    student.email,
                                                    student.school_cycle,
                                                    student.grade_id,
                                                    student.activity_id,
                                                    student.location_id,
                                                    student.inscription_id,
                                                    student.birthday,
                                                    student.firstday,
                                                    student.curp,
                                                    student.tutor_id,
                                                    student.occupation,
                                                    student.tuition,
                                                    student.profile_pic,
                                                    student.credential_pic,
                                                    student.tutor.name,
                                                    student.tutor.phone,
                                                    student.tutor.email,
                                                    student.tutor.occupation
                                                )
                                            }
                                            className="md:inline-block"
                                        >
                                            Editar
                                        </ButtonEdit>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    </div>
                </div>
            </DashboardLayout>



            <Dialog open={mainModal} onClose={closeMainModal} maxWidth="md" fullWidth>
                <form onSubmit={submit} className="p-6" encType="multipart/form-data" method="POST">
                    <DialogTitle className="">
                        <span className="text-2xl text-primary font-bold">{title}</span>
                    </DialogTitle>
                    <DialogContent>

                        <InputLabel htmlFor='name' value='Nombre: ' />
                        <TextInput className='' id='name' name='name' ref={nameInput} value={data.name || ''} required='required' onChange={(e) => setData("name", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='group_id' value='Selecciona un grupo: ' />
                        <Select
                            className="w-full mt-1"
                            id='group_id'
                            ref={group_idInput}
                            value={data.group_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("group_id", e.target.value)}
                        >
                            {groups.map((group) => (
                                <MenuItem key={group.id} value={group.id}>
                                    {group.schedule.day.name} {group.schedule.hour.name} - {group.professor.name}
                                </MenuItem>
                            ))}
                        </Select>

                        <InputLabel htmlFor='active' value='¿El alumno está activo? ' />
                        {operation === 1 ? <Switch
                            id="active"
                            name="active"
                            checked={true}

                        /> : <Switch
                            id="active"
                            name="active"
                            checked={data.active}
                            onChange={(e) => setData("active", e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />}

                        <InputLabel htmlFor='address' value='Dirección: ' />
                        <TextInput className='' id='address' name='address' ref={addressInput} value={data.address || ''} onChange={(e) => setData("address", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='postal_code' value='Código Postal: ' />
                        <TextInput className='' type='number' id='postal_code' name='postal_code' ref={postal_codeInput} value={data.postal_code || ''} onChange={(e) => setData("postal_code", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='phone' value='Teléfono: ' />
                        <TextInput className='' id='phone' name='phone' ref={phoneInput} value={data.phone || ''} onChange={(e) => setData("phone", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='email' value='Email: ' />
                        <TextInput className='' id='email' name='email' ref={emailInput} value={data.email || ''} required='required' onChange={(e) => setData("email", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='school_cycle' value='Ciclo escolar: ' />
                        <TextInput className='' id='school_cycle' name='school_cycle' ref={school_cycleInput} value={data.school_cycle || ''} onChange={(e) => setData("school_cycle", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='grade_id' value='Grado de estudios: ' />
                        <Select
                            className="w-full mt-1"
                            id='grade_id'
                            ref={grade_idInput}
                            value={data.grade_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("grade_id", e.target.value)}
                        >
                            {grades.map((grade) => (
                                <MenuItem key={grade.id} value={grade.id}>
                                    {grade.grade}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='activity_id' value='Actividad: ' />
                        <Select
                            className="w-full mt-1"
                            id='activity_id'
                            ref={activity_idInput}
                            value={data.activity_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("activity_id", e.target.value)}
                        >
                            {activities.map((activity) => (
                                <MenuItem key={activity.id} value={activity.id}>
                                    {activity.activity}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='location_id' value='Ubicación: ' />
                        <Select
                            className="w-full mt-1"
                            id='location_id'
                            ref={location_idInput}
                            value={data.location_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("location_id", e.target.value)}
                        >
                            {locations.map((location) => (
                                <MenuItem key={location.id} value={location.id}>
                                    {location.location}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='inscription_id' value='Forma de inscripción: ' />
                        <Select
                            className="w-full mt-1"
                            id='inscription_id'
                            ref={inscription_idInput}
                            value={data.inscription_id || ''} // Ensure that value is not undefined
                            onChange={(e) => setData("inscription_id", e.target.value)}
                        >
                            {inscriptions.map((inscription) => (
                                <MenuItem key={inscription.id} value={inscription.id}>
                                    {inscription.inscription}
                                </MenuItem>
                            ))}
                        </Select>
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='birthday' value='Fecha de nacimiento: ' />
                        <TextInput className='' type='date' id='birthday' name='birthday' ref={birthdayInput} value={data.birthday || ''} onChange={(e) => setData("birthday", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='firstday' value='Fecha de inicio: ' />
                        <TextInput className='' type='date' id='firstday' name='firstday' ref={firstdayInput} value={data.firstday || ''} required='required' onChange={(e) => setData("firstday", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='curp' value='CURP: ' />
                        <TextInput className='' id='curp' name='curp' ref={curpInput} value={data.curp || ''} onChange={(e) => setData("curp", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='occupation' value='Ocupación: ' />
                        <TextInput className='' id='occupation' name='occupation' ref={occupationInput} value={data.occupation || ''} onChange={(e) => setData("occupation", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='tuition' value='Colegiatura: ' />
                        <TextInput className='' type='number' onWheel={(e) => e.target.blur()} id='tuition' name='tuition' ref={tuitionInput} value={data.tuition || ''} onChange={(e) => setData("tuition", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='profile_pic' value='Foto de perfil: ' />
                        <TextField
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            onChange={handleProfilepicChange}
                        />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='credential_pic' value='Foto de credencial: ' />
                        <TextField
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            onChange={handleCredentialpicChange}
                        />
                        <InputError message={errors.make} />

                        <h2 className="text-2xl text-primary font-bold my-2">Datos del tutor</h2>
                        <InputLabel htmlFor='tutor_name' value='Nombre del tutor:' />
                        <TextInput id='tutor_name' name='tutor_name' ref={tutor_nameInput} value={data.tutor_name || ''} onChange={(e) => setData('tutor_name', e.target.value)} />
                        <InputError message={errors.make} />
                        <InputLabel htmlFor='tutor_phone' value='Teléfono de tutor:' />
                        <TextInput id='tutor_phone' name='tutor_phone' ref={tutor_phoneInput} value={data.tutor_phone || ''} onChange={(e) => setData('tutor_phone', e.target.value)} />
                        <InputError message={errors.make} />
                        <InputLabel htmlFor='tutor_email' value='Email del tutor:' />
                        <TextInput id='tutor_email' name='tutor_email' ref={tutor_emailInput} value={data.tutor_email || ''} onChange={(e) => setData('tutor_email', e.target.value)} />
                        <InputError message={errors.make} />
                        <InputLabel htmlFor='tutor_occupation' value='Ocupación del tutor:' />
                        <TextInput id='tutor_occupation' name='tutor_occupation' ref={tutor_occupationInput} value={data.tutor_occupation || ''} onChange={(e) => setData('tutor_occupation', e.target.value)} />
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

            <Head>
                <title>Alumnos</title>
            </Head>
        </>
    )
}

// Student.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Student;

import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from "react";
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
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import 'react-toastify/dist/ReactToastify.css';


const ShowLessonsGroup = (props) => {

    const { grades, auth, lesson} = usePage().props;
    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');
    const [operation, setOperation] = useState(1);
    const idInput = useRef();
    const student_idInput = useRef();
    const class_subject_group_idInput = useRef();
    const attendanceInput = useRef();
    const gradeInput = useRef();
    const noteInput = useRef();
    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        id: '',
        student_id: '',
        class_subject_group_id: '',
        attendance: false,
        grade: '',
        note:'',
    })

    //HANDLE MODAL------------------------------------------------------------------------------
    const openMainModal = (op, id, student_id, class_subject_group_id, attendance, grade, note) => {
        setMainModal(true);
        setOperation(op);
        setData({
            id: '',
            student_id: '',
            class_subject_group_id: '',
            attendance: false,
            grade: '',
            note:'',
        })
        if (op === 1) {
            setTitle('Añadir clase');
        } else {
            setTitle('Editar calificación');
            setData({
                id: id,
                student_id: student_id,
                class_subject_group_id: class_subject_group_id,
                attendance: attendance,
                grade: grade,
                note:note,
            })
        }
    }
    const closeMainModal = () => {
        setMainModal(false);
    }
    //------------------------------------------------------------------------------------------

    //SUBMIT------------------------------------------------------------------------------------
    const submit = (e) => {
        e.preventDefault();
        if (operation === 1) {

        } else {
            put(route('grupos.grades.update', data.id), {
                onSuccess: () => { ok('Calificación guardada') },
                onError: () => {
                    if (errors.id){reset('id'); idInput.current.focus();}
                    if (errors.student_id){reset('student_id'); student_idInput.current.focus();}
                    if (errors.class_subject_group_id){reset('class_subject_group_id'); class_subject_group_idInput.current.focus();}
                    if (errors.attendance){reset('attendance'); attendanceInput.current.focus();}
                    if (errors.grade){reset('grade'); gradeInput.current.focus();}
                    if (errors.note){reset('note'); noteInput.current.focus();}
                }
            });
        }
    }
    //------------------------------------------------------------------------------------------

    //OK AND ERROR MODAL------------------------------------------------------------------------
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
    //------------------------------------------------------------------------------------------

    //MOSTRAR NOTIFICACIONES EN SISTEMA --------------------------------------------------------
    const [toastInfo, setToastInfo] = useState(null);
    useEffect(() => {
        // Verificar si hay información de "toast" y mostrar el "toast" correspondiente
        if (props.toast) {
            setToastInfo(props.toast);
        }
    }, [props.toast]);
    useEffect(() => {
        // Mostrar el "toast" cuando se actualice el estado local
        if (toastInfo) {
            toast[toastInfo.tipo](toastInfo.mensaje);
            setToastInfo(null); // Limpiar el estado después de mostrar el "toast"
        }
    }, [toastInfo]);
    //------------------------------------------------------------------------------------------

    //HANDLE FUNTIONS TO MANAGE EDIT, SHOW, AND DELETE -----------------------------------------

    //------------------------------------------------------------------------------------------

    return (
        <>
            <ToastContainer />
            <DashboardLayout title={`Calificaciones: ${lesson.name}, ${lesson.subjectgroup.subject.name}`} auth={auth}>
                <div className="flex justify-end">
                    {/* <ButtonSecondary onClick={() => { openMainModal(1) }}>Agregar</ButtonSecondary> */}
                </div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>NOMBRE</TableCell>
                                <TableCell>ASISTENCIA</TableCell>
                                <TableCell>CALIFICACIÓN</TableCell>
                                <TableCell>NOTA</TableCell>
                                <TableCell>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {grades.map((grade) => (
                                <TableRow key={grade.id}>
                                    <TableCell>{grade.student.name}</TableCell>
                                    <TableCell>{grade.attendance === 1 ? <RiCircleFill className="text-green-600 text-2xl" /> : <RiCircleFill className="text-red-600 text-2xl" />}</TableCell>
                                    <TableCell>{grade.grade || 'N/A'}</TableCell>
                                    <TableCell>{grade.note || 'N/A'}</TableCell>
                                    <TableCell>
                                        <ButtonEdit onClick={(e) => openMainModal(2, grade.id, grade.student_id, grade.class_subject_group_id, grade.attendance === 1 ? true : false, grade.grade, grade.note)}>
                                            Editar
                                        </ButtonEdit>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            </DashboardLayout>

            <Modal show={mainModal} onClose={closeMainModal}>
                <h2 className="text-3xl font-medium text-gray-900 pl-6 pr-6 pt-6 text-primary font-extrabold">
                    {title}
                </h2>

                <form onSubmit={submit} className=" pl-6 pr-6 pb-6 ">
                    <div className="mt-6">
                        <InputLabel htmlFor='student_id' value='Alumno'></InputLabel>
                        <TextInput readOnly id='student_id' name='student_id' ref={student_idInput} value={data.student_id || ''} required='required' onChange={(e) => setData('student_id', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='class_subject_group_id' value='Clase'></InputLabel>
                        <TextInput readOnly id='class_subject_group_id' name='class_subject_group_id' ref={class_subject_group_idInput} value={data.class_subject_group_id || ''} required='required' onChange={(e) => setData('class_subject_group_id', e.target.value)}></TextInput>
                        <InputError message={errors.make}></InputError>

                        <InputLabel htmlFor='attendance' value='Asistencia ' />
                        <Switch
                            id="attendance"
                            name="attendance"
                            checked={data.attendance}
                            // value={active ? 1 : 0}
                            onChange={(e) => setData("attendance", e.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='grade' value='Calificación: ' />
                        <TextInput className='' type='number' id='grade' name='grade' ref={gradeInput} value={data.grade || ''} onChange={(e) => setData("grade", e.target.value)} />
                        <InputError message={errors.make} />

                        <InputLabel htmlFor='note' value='Nota'></InputLabel>
                        <TextField multiline className="w-full" rows={4} id="note" name="note" ref={noteInput} value={data.note || ''} onChange={(e) => setData('note', e.target.value)} />
                        <InputError message={errors.make}></InputError>
                    </div>
                    <div className="mt-6">


                    </div>
                    <div className="mt-6 flex justify-end">
                        <ButtonCancel type='button' onClick={closeMainModal}>Cancel</ButtonCancel>
                        <ButtonPrimary disabled={processing} className="ml-3">Guardar</ButtonPrimary>
                    </div>
                </form>
            </Modal>

            <Head>
                <title>Clases</title>
            </Head>
        </>
    )
}

// ShowGroup.layout = page => <DashboardLayout children={page} title={'Mostrando grupos en sistema'}></DashboardLayout>

export default ShowLessonsGroup;

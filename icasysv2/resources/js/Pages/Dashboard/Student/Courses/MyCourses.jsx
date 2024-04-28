import React, { useEffect, useRef, useState } from "react";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { ToastContainer, toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Swal from "sweetalert2";
import ButtonDelete from "@/Components/ButtonDelete";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonCancel from "@/Components/ButtonCancel";
import SecondaryLink from "@/Components/SecondaryLink";
import { CImage } from "@coreui/react";


const MyCourses = (auth, props) => {
    const { pucharses, url } = usePage().props
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

    const openCourse = () => {

    }

    return (
        <>
            <ToastContainer />
            <Head>
                <title>Mis cursos</title>
            </Head>
            <DashboardLayout title={'Mis cursos'} auth={auth}>
                {pucharses.length === 0 ? (
                    <div>
                        <p className="my-4">No hay cursos disponibles.</p>
                        <ButtonPrimary><Link href={route('courses')}>Explorar cursos</Link></ButtonPrimary>
                    </div>
                ) : (
                    <div>
                        {/* <h2>Longitud de cursos: {pucharses.length}</h2> */}
                        {pucharses.map((pucharse, index) => (
                            <div key={index} className="block lg:flex lg:justify-between my-5">
                                <div className="block lg:flex lg:justify-start items-center">
                                    <div className="w-full lg:w-[30%] flex md:justify-center lg:justify-start">
                                        <CImage rounded thumbnail src={`${url}storage/${pucharse.course.image}`} className='w-[100%] md:w-[50%] lg:w-[100%]' alt={pucharse.course.name} />
                                    </div>
                                    <div className="lg:ml-3 text-center lg:text-left py-3">
                                        <p className="text-primary font-bold">{pucharse.course.title}</p>
                                        <p className="text-gray-600">{pucharse.course.coursecategory.name}</p>
                                    </div>
                                </div>
                                <div className="mx-auto flex justify-center items-center">
                                    {/* <ButtonPrimary className="h-[35%]">
                                        <Link href={route('lesson.show', { course_id: pucharse.course.id, course_name: pucharse.course.title})}>Entrar</Link>
                                    </ButtonPrimary> */}
                                    <ButtonPrimary className="h-[35%]">
                                        <Link href={route('lesson.show.updated', { course_id: pucharse.course.id, course_name: pucharse.course.slug})}>Entrar</Link>
                                    </ButtonPrimary>

                                </div>
                            </div>
                        ))}
                        {/* Aquí puedes renderizar el resto de tu componente */}
                    </div>
                )}
            </DashboardLayout>
        </>
    )
}



export default MyCourses

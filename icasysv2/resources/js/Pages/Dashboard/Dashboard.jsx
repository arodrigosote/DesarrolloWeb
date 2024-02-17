import Dashboard from "../../Layouts/Dashboard/DashboardLayout";
import { Head, usePage } from '@inertiajs/react'
import React, { useState, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from "../../Layouts/Dashboard/DashboardLayout";


const Content = (props) => {
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
    return (
        <>
            <ToastContainer />
            <DashboardLayout title="Bienvenido" auth = { props.auth }>
                <div>
                    Pagina principal
                </div>
            </DashboardLayout>


            <Head>
                <title>Escritorio</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>
        </>


    )
}


// Content.layout = page => <Dashboard children={page} ></Dashboard>

export default Content

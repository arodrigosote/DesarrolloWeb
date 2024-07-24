import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard(props) {
    const [toastInfo, setToastInfo] = useState(null);
    const { toast: toastProp, url, auth } = usePage().props;

    useEffect(() => {
        // Verificar si hay información de "toast" y mostrar el "toast" correspondiente
        if (toastProp) {
            setToastInfo(toastProp);
        }
    }, [toastProp]);

    useEffect(() => {
        // Mostrar el "toast" cuando se actualice el estado local
        if (toastInfo) {
            toast[toastInfo.tipo](toastInfo.mensaje);
            setToastInfo(null); // Limpiar el estado después de mostrar el "toast"
        }
    }, [toastInfo]);
    return (
        <DashboardLayout
            user={auth.user}
            title={'Escritorio'}
        >
            <Head title="Escritorio" />
            <ToastContainer />


        </DashboardLayout>
    );
}

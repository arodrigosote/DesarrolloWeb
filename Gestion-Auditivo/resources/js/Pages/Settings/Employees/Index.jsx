import ButtonPrimary from '@/Components/ButtonPrimary';
import CardPrimary from '@/Components/CardPrimary';
import { RiHotelFill } from "react-icons/ri";
import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function SettingsEmployees({ auth }) {
    return (
        <>
            <DashboardLayout
                user={auth.user}
                title={'Ajustes de empleados'}
            >



            </DashboardLayout>
            <Head title="Ajustes" /></>
    );
}

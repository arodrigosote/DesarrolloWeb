import ButtonPrimary from '@/Components/ButtonPrimary';
import CardPrimary from '@/Components/CardPrimary';
import { RiHotelFill, RiUser2Fill  } from "react-icons/ri";
import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import { Head, Link } from '@inertiajs/react';

export default function Settings({ auth }) {
    return (
        <>
            <DashboardLayout
                user={auth.user}
                title={'Ajustes Generales'}
            >

                <div className='flex justify-evenly'>
                <CardPrimary title={'Sucursales'} text={'Administra todas tus sucursales'} icon={<RiHotelFill />} route={route('admin.settings.branches')}/>
                <CardPrimary title={'Usuarios'} text={'Administra a tus usuarios o empleados'} icon={<RiUser2Fill />} route={route('employee.index')}/>
                {/* <CardPrimary title={'Sucursales'} text={'Administra todas tus sucursales'} icon={<RiHotelFill></RiHotelFill>} route={route('admin.settings.branches')}/>
                <CardPrimary title={'Sucursales'} text={'Administra todas tus sucursales'} icon={<RiHotelFill></RiHotelFill>} route={route('admin.settings.branches')}/> */}
                </div>

            </DashboardLayout>
            <Head title="Ajustes" /></>
    );
}

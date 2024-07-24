import ButtonPrimary from '@/Components/ButtonPrimary';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout
            user={auth.user}
            title={'Dashboard'}
        >
            <Head title="Escritorio" />
            <ButtonPrimary>asjdi</ButtonPrimary>

        </DashboardLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Layouts/Dashboard/DashboardLayout';
import ButtonPrimary from '@/Components/ButtonPrimary';
import { CImage } from '@coreui/react';

export default function Show({ auth }) {
    const { url, student } = usePage().props;
    return (
        <DashboardLayout title={'Mi perfil'} auth={auth}>
            <div className='flex justify-end'>
                <Link href={route('profile.edit')}><ButtonPrimary>Editar informacion</ButtonPrimary></Link>
            </div>
            <div className="block lg:flex">
                <div className=''>
                    <CImage rounded thumbnail src={`${url}storage/${auth.user.profile_pic}`} width={300} height={300} />
                </div>
                <div>
                    <h2 className='text-secondary text-xl'>Información</h2>
                    <p className='my-1'><strong>Nombre: </strong>{auth.user.name}</p>
                    <p className='my-1'><strong>Email: </strong>{auth.user.email}</p>
                </div>
            </div>
            {console.log(student)}
            {student === null ? <div>

            </div> : <div className="block lg:flex mt-12">
                    <div className=''>

                        <CImage rounded thumbnail src={`${url}storage/${student.profile_pic}`} width={300} height={300} />
                    </div>
                    <div>
                        <h2 className='text-secondary text-xl'>Información de alumno en sistema</h2>
                        <p className='my-1'><strong>Nombre: </strong>{student.name}</p>
                        <p className='my-1'><strong>Email: </strong>{student.email}</p>
                        <p className='my-1'><strong>Maestro: </strong>{student.group.professor.name}</p>
                        <p className='my-1'><strong>Horario: </strong>{student.group.schedule.day.name} | {student.group.schedule.hour.name}</p>
                    </div>
            </div>}
            <Head>
                <title>Ver perfil</title>
            </Head>
        </DashboardLayout>
    );
}

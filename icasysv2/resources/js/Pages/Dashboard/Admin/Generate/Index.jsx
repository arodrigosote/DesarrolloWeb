import ButtonPrimary from "@/Components/ButtonPrimary";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

export default function IndexGenerate(props) {

    const {auth, groups} = usePage().props;

    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        id:'',
    });

    const handleAssistance = () => {
        get(route('generate.assistance'))
    }

    return (
        <>
            <DashboardLayout title={'Generar'} auth={auth}>
                <div>
                    <ButtonPrimary type="button" onClick={() => handleAssistance()} className="ml-3">Listas de asistencia</ButtonPrimary>
                    <ButtonPrimary type="button" onClick={() => handleAssistance()} disabled={true} className="ml-3">Credenciales</ButtonPrimary>
                </div>
            </DashboardLayout>
            <Head>
                <title>Generar - Admin</title>
                <meta name="Generate" content="Generate" />
            </Head>
        </>
    )
}

import React, { useState } from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { usePage } from "@inertiajs/react";

export default function IndexBinnacle(props) {
    const { binnacle, auth } = usePage().props;

    const today = new Date();
    const day = today.getDate();
    const monthNames = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const month = monthNames[today.getMonth()];
    const year = today.getFullYear();
    const formattedDate = `${day} de ${month} de ${year}`; // Formato 'día de mes de año'

    const { data, setData, delete: destroy, post, get, put, processing, progress, errors, reset } = useForm({
        alias:'',
    });

    const [modal, setModal] = useState(false);


    const handleCreation = () => {

    }

    return (
        <>
            <DashboardLayout user={auth.user} title={'Bitácora'}>
                {binnacle.date ?
                    'hola'
                    :
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold text-color2 text-lg">
                                Aún no existe una bitácora del día de hoy, {formattedDate}.
                            </h2>
                            <p className="text-gray-500">Da clic al botón para crearla</p>
                        </div>
                        <ButtonPrimary onClic={()=>handleCreation()}>Crear</ButtonPrimary>
                    </div>
                }
            </DashboardLayout>
        </>
    );
}

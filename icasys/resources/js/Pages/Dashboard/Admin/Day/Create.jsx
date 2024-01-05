import Dashboard from "../../../../Layouts/Dashboard/DashboardLayout";
import { Head, useForm } from '@inertiajs/react'
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

const Content = ({ }) => {
    // const inputRef = useRef();

    const {data, setData, post, processing, errors} =  useForm({
        name: ''
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de manejo del formulario
        post('/dias')
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputLabel value={'Nombre del día:'}  htmlFor="username" className="mb-2"></InputLabel>
                    <TextInput
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        type="text"
                        placeholder="Ingresa el día aquí"
                        isFocused={true}
                    />
                    <PrimaryButton type="submit" disabled={false} className="bg-primary">
                        Agregar
                    </PrimaryButton>
                </form>
            </div>

            <Head>
                <title>Crear Día - Admin</title>
                <meta name="Create Day" content="It creates a day" />
            </Head>
        </>
    )
}

Content.layout = page => <Dashboard children={page} title="Creando día en sistema"></Dashboard>

export default Content;

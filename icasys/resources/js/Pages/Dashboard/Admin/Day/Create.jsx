import Dashboard from "../../../../Layouts/Dashboard/DashboardLayout";
import { Head } from '@inertiajs/react'
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";

const Content = ({ }) => {
    // const inputRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de manejo del formulario
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputLabel htmlFor="username" className="mb-2">
                        Nombre del día:
                    </InputLabel>
                    <TextInput
                        // ref={inputRef}
                        type="text"
                        placeholder="Ingresa el día aquí"
                        isFocused={true}
                    />
                    <PrimaryButton type="submit" disabled={false}>
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

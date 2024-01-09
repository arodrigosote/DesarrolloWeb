import Dashboard from "../../Layouts/Dashboard/DashboardLayout";
import { Head } from '@inertiajs/react'

const Content = () => {
    return (
        <>
            <div>
                Pagina principal
            </div>

            <Head>
                <title>Escritorio</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>
        </>
    )
}


Content.layout = page => <Dashboard children={page} title="Bienvenido"></Dashboard>

export default Content

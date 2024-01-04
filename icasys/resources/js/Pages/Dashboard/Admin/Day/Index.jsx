import Dashboard from "../../../../Layouts/Dashboard/DashboardLayout";
import { Head } from '@inertiajs/react'

const Content = ({ days }) => {
    return (
        <>
            <div>
                dias works
                {days.map(day => (
                    <div key={day.id}>{day.name}</div>
                ))}

            </div>

            <Head>
                <title>Mostrar Dias - Admin</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>
        </>
    )
}


Content.layout = page => <Dashboard children={page} title="Mostrando dias en sistema"></Dashboard>

export default Content

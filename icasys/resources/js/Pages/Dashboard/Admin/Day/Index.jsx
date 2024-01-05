import Dashboard from "../../../../Layouts/Dashboard/DashboardLayout";
import { Head } from '@inertiajs/react'
import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import PrimaryButton from "@/Components/PrimaryButton";
import { RiEditBoxLine, RiDeleteBin6Fill } from "react-icons/ri";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/react'


const Content = ({ days, ...props }) => {
    const success = props.success;
    useEffect(() => {
        if (success) {
            // Display the success message (e.g., using a notification library)
            toast.success(success);
        }
    }, [success]);

    const handleDelete = (e, dayId) => {
        e.preventDefault();
        try {
            // Realizar una solicitud al servidor para eliminar el elemento
            delete(`/dias/${dayId}`);

        } catch (e) {
            toast.error("Error al eliminar");
            console.error('Error al eliminar:', e);
            // Manejar errores de eliminación
        }
    };

    return (
        <>
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><span className="font-bold uppercase">ID</span></TableCell>
                            <TableCell><h2 className="font-bold uppercase">Nombre</h2></TableCell>
                            <TableCell><h2 className="font-bold uppercase">Acciones</h2></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {days.map((day) => (
                            <TableRow key={day.id}>
                                <TableCell>{day.id}</TableCell>
                                <TableCell>{day.name}</TableCell>
                                <TableCell>
                                    <PrimaryButton className="bg-green-600 my-1 mr-3"><RiEditBoxLine className="" />Editar</PrimaryButton>
                                    <form onSubmit={handleDelete}>
                                        <PrimaryButton className="bg-red-600 my-1 mr-3" type="submit">
                                            <RiDeleteBin6Fill />Eliminar
                                        </PrimaryButton>
                                    </form>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div>
                {days.map(day => (
                    <div key={day.id}>{day.name}</div>
                ))}
            </div> */}

            <Head>
                <title>Mostrar Dias - Admin</title>
                <meta name="Days Index" content="It shows created days" />
            </Head>
        </>
    )
}


Content.layout = page => <Dashboard children={page} title="Mostrando dias en sistema"></Dashboard>

export default Content

import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import React from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { Head } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonDelete from "@/Components/ButtonDelete";



const Hour = ({ hours }) => {

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="flex justify-end mb-8">
                <ButtonPrimary>Agregar</ButtonPrimary>
            </div>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NOMBRE</TableCell>
                            <TableCell>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hours.map((hour) => (
                            <TableRow key={hour.id}>
                                <TableCell>{hour.id}</TableCell>
                                <TableCell>{hour.name}</TableCell>
                                <TableCell>
                                    <ButtonEdit className="mr-2">Editar</ButtonEdit>
                                    <ButtonDelete>Eliminar</ButtonDelete>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Head>
                <title>Mostrar Horas - Admin</title>
                <meta name="Hours Index" content="It shows created hours" />
            </Head>
        </>
    )

}

Hour.layout = page => <DashboardLayout children={page} title={'Mostrando horas en sistema'}></DashboardLayout>

export default Hour;

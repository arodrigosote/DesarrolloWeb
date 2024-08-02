import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import React from "react";
import ButtonPrimary from "@/Components/ButtonPrimary";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, FormControl, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Head, useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import ButtonEdit from "@/Components/ButtonEdit";
import ButtonDelete from "@/Components/ButtonDelete";
import { useState } from "react";
import { useRef } from "react";
import Swal from "sweetalert2";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import ButtonCancel from "@/Components/ButtonCancel";
import SecondaryLink from "@/Components/SecondaryLink";
import ButtonSecondary from "@/Components/ButtonSecondary";
import ButtonYellow from "@/Components/ButtonYellow";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ReceiptPool from "@/Pages/PDF/ReceiptPool";




const GenerateReceipts = (props) => {

    const {auth, receipts} = usePage().props;

    console.log(receipts);

    const [mainModal, setMainModal] = useState(false);
    const [title, setTitle] = useState('');

    const [deleteModal, setDeleteModal] = useState(false);

    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        id:'',
        title:'',
        op:'',
    });

    const openDeleteModal = (id, title, op) => {
        setDeleteModal(true);
        setData({
            id: id,
            title: title,
            op:op,
        })
    }

    const closeDeleteModal = () => {
        setDeleteModal(false);
    }

    const eliminate = (e) => {
        e.preventDefault();
        if(data.op == 1){
            destroy(route('delete.receipts', data.id), {
                preserveScroll: true,
                onSuccess: () => { ok('Recibo eliminado con éxito del concentrado.') },
                onError: (error) => {
                    console.error(error); // Log the error for debugging
                    errorModal('Error al eliminar el recibo del concentrado.');
                },
                onFinish: reset(),
            });
        }else{
            destroy(route('truncate.receipts', data.id), {
                preserveScroll: true,
                onSuccess: () => { ok('Recibos eliminados con éxito del concentrado.') },
                onError: (error) => {
                    console.error(error); // Log the error for debugging
                    errorModal('Error al eliminar el recibo del concentrado.');
                },
                onFinish: reset(),
            });
        }
    }

    const ok = (message) => {
        reset();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };

    const errorModal = (message) => {
        reset();
        closeDeleteModal();
        Swal.fire({ title: message, icon: 'error', confirmButtonColor: '#014ba0' })
    };

    // --------------------------------------------------------------------------------------
    // Receipt generation
    // --------------------------------------------------------------------------------------

    // Estado de generacion de PDF --------------------------------------------------------
    const [downloadingReceiptId, setDownloadingReceiptId] = useState(null);
    //-------------------------------------------------------------------------------------

    // Estado para abrir el modal de vista previa
    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    // Generacion de PDF ------------------------------------------------------------------
    const handleDownloadClick = () => {
        setPreviewOpen(true);
    };

    const handleTruncate = () => {

    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <DashboardLayout title={'Concentrado de recibos'} auth={auth}>
                <div className="flex justify-end mb-8">
                    <ButtonYellow onClick={() => openDeleteModal(1,'¿Estás seguro que quieres eliminar todos los recibos del concentrado?', 2)}>Limpiar concentrado</ButtonYellow>
                    <ButtonPrimary type="button" onClick={() => handleDownloadClick()} className="ml-3">Generar recibos</ButtonPrimary>

                </div>
                <table className="w-full">
                        <thead>
                            <tr>
                                <th className="p-4 text-[17px] bg-primary text-white border">Alumno</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Fecha de pago</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Número de <br />semanas pagadas</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Importe</th>
                                <th className="p-4 text-[17px] bg-primary text-white border">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receiptpool) => (
                                <tr key={receiptpool.id}>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receiptpool.receipt.student.name}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receiptpool.receipt.date_payment}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receiptpool.receipt.weeks_number}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">{receiptpool.receipt.amount}</td>
                                    <td className="border rounded text-xs text-center mx-auto my-auto">
                                        {/* <ButtonYellow onClick={() => handleDownloadClick(receiptpool.receipt)}>Generar</ButtonYellow> */}
                                        <ButtonDelete onClick={()=>{openDeleteModal(receiptpool.id, '¿Estás seguro que quieres eliminar el recibo del concentrado?', 1)}}>Eliminar</ButtonDelete>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                {/* <TableContainer>
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
                                        <ButtonDelete type="button" onClick={() => { openDeleteModal(receipt.id) }}>Eliminar</ButtonDelete>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </DashboardLayout>

            <Modal show={deleteModal} onClose={closeDeleteModal}>
                <div className="p-6">
                    <h2 className="text-3xl font-medium text-primary font-extrabold text-center">
                        {data.title}
                    </h2>
                    {/* <p className="mt-1 text-sm text-gray-600">
                        Esta acción no se puede revertir.
                    </p> */}
                </div>
                <form onSubmit={eliminate} className="p-6">

                    <TextInput
                        id="id"
                        name='id'
                        defaultValue={data.id}
                        style={{ display: 'none' }}
                    />
                    <div className="flex justify-end items-center">
                        <ButtonCancel type='button' onClick={closeDeleteModal} className="">Cancel</ButtonCancel>
                        <ButtonDelete className="ml-3" disabled={processing}>
                            Eliminar
                        </ButtonDelete>
                    </div>
                </form>
            </Modal>

            <Head>
                <title>Generar recibos - Admin</title>
                <meta name="Generate receipts Index" content="Generate receipts Index" />
            </Head>

            {/* Receipt modal */}
            <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="lg" fullWidth>
                <DialogTitle>Vista Previa del Recibo</DialogTitle>
                <DialogContent>
                    <PDFViewer width="100%" height="500">

                        <ReceiptPool
                            Poolreceipts = {receipts}
                        />

                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <ButtonCancel onClick={() => setPreviewOpen(false)}>Cerrar</ButtonCancel>
                    {receipts && (
                        <PDFDownloadLink
                            document={<ReceiptPool  Poolreceipts = {receipts}/>}
                            fileName={`Recibos`}
                        >
                            {({ loading }) =>
                                loading ? (
                                    <ButtonCancel>Cargando...</ButtonCancel>
                                ) : (
                                    <ButtonSecondary>Descargar</ButtonSecondary>
                                )
                            }
                        </PDFDownloadLink>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )

}

// Hour.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default GenerateReceipts;

import React, { useState } from 'react';
import ButtonPrimary from "@/Components/ButtonPrimary";
import InputLabel from "@/Components/InputLabel";
import DashboardLayout from "@/Layouts/Dashboard/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { MenuItem, Select, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, pdf } from '@react-pdf/renderer';

// Define styles for the PDF document
const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { margin: 10, padding: 10, fontSize: 12 }
});

// PDF Document Component
const MyDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Grupo: {data.group_id}</Text>
                <Text>Materia: {data.subject_id}</Text>
                <Text>Fecha de Inicio: {data.start_date}</Text>
                <Text>Fecha Final: {data.end_date}</Text>
            </View>
        </Page>
    </Document>
);

export default function IndexGenerate(props) {
    const { auth, groups, subjects } = usePage().props;

    const { data, setData, delete: destroy, post, get, put, processing, errors, reset } = useForm({
        id: '',
        group_id: '',
        subject_id: '',
        start_date: '',
        end_date: '',
    });

    const [open, setOpen] = useState(false);
    const [pdfInstance, setPdfInstance] = useState(null);

    const handleAssistance = async () => {
        const instance = pdf(<MyDocument data={data} />);
        const blob = await instance.toBlob();
        setPdfInstance(blob);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <DashboardLayout title={'Generar Lista Asistencia'} auth={auth}>
                <div>
                    <InputLabel htmlFor='group_id' value='Selecciona un grupo: ' />
                    <Select
                        className="w-full mb-4"
                        id='group_id'
                        value={data.group_id || ''}
                        onChange={(e) => setData("group_id", e.target.value)}
                    >
                        {groups.map((group) => (
                            <MenuItem key={group.id} value={group.id}>
                                {group.schedule.day.name} {group.schedule.hour.name} - {group.professor.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel htmlFor='subject_id' value='Seleccione una materia: ' />
                    <Select
                        className="w-full mt-1"
                        id='subject_id'
                        value={data.subject_id || ''}
                        onChange={(e) => setData("subject_id", e.target.value)}
                    >
                        {subjects.map((subject) => (
                            <MenuItem key={subject.id} value={subject.id}>
                                {subject.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputLabel htmlFor='start_date' value='Fecha de Inicio: ' />
                    <TextField
                        className="w-full mt-1 mb-4"
                        id='start_date'
                        type='date'
                        value={data.start_date || ''}
                        onChange={(e) => setData("start_date", e.target.value)}
                    />
                    <InputLabel htmlFor='end_date' value='Fecha Final: ' />
                    <TextField
                        className="w-full mt-1 mb-4"
                        id='end_date'
                        type='date'
                        value={data.end_date || ''}
                        onChange={(e) => setData("end_date", e.target.value)}
                    />
                    <ButtonPrimary onClick={handleAssistance}>Generar PDF</ButtonPrimary>
                </div>
            </DashboardLayout>
            <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
                <DialogTitle>Vista Previa del PDF</DialogTitle>
                <DialogContent>
                    {pdfInstance && (
                        <iframe
                            src={URL.createObjectURL(pdfInstance)}
                            width="100%"
                            height="600px"
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cerrar</Button>
                    <PDFDownloadLink
                        document={<MyDocument data={data} />}
                        fileName="asistencia.pdf"
                    >
                        {({ blob, url, loading, error }) => (loading ? 'Generando PDF...' : <Button color="primary">Descargar PDF</Button>)}
                    </PDFDownloadLink>
                </DialogActions>
            </Dialog>
            <Head>
                <title>Asistencias - Admin</title>
                <meta name="Asistencia" content="Asistencia" />
            </Head>
        </>
    );
}

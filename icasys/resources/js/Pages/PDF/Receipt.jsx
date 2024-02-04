import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import seg from '../../Assets/Images/seg/segg.png'
import blue from '../../Assets/Images/Logo.png'
import greca from '../../Assets/Images/banner.png'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: '100px',
        height: '35px',
        marginTop: '20px',
    },
    header: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    instituteInfo: {
        width: '30%',
        textAlign: 'center',
        fontSize: 11,
    },
    box_logo:{
       width: '33%',
       justifyContent: 'center',
       flexDirection: 'row',
       alignContent: 'center',
    },
    icaLogo: {
        width: '100px',
        height: '41px',
        marginTop: '20px',
    },
    greca: {
        width: '90%',
        height: '5px',
        padding: '0px',
        margin: '0px',

    },
    table: {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        padding: 5,
        border: '1px solid black',
    },
    conceptCell: {
        width: '80%',
    },
    amountCell: {
        width: '20%',
    },
    header_text: {
        fontSize: 8,
    },
    smallText: {
        fontSize: 9,
    },
    tinyText: {
        fontSize: 7,
    },
    title_text: {
        fontSize: 11,
    },
    upperCase: {
        textTransform: 'uppercase',
    },

    box:{
        flexDirection: 'row',
        border: '1px solid red',
        justifyContent: 'space-between',
        width: '90%',
        marginHorizontal: '15px'
    },
    box_content:{
        border: '1 solid black',
        flexDirection: 'row',
        width:'40%'
    }
});

const Receipt = ({ receipt, student, payments }) => {
    // Your PHP logic for numberEnTexto function and other calculations can go here

    return (
        <Document>
            <Page size="LETTER" style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.box_logo}>
                        <Image style={styles.logo} src={seg} />
                    </View>

                    <View style={styles.instituteInfo}>
                       <Text style={[styles.header_text]}>INSTITUTO DE COMPUTACIÓN ACTUALIZADA</Text>
                       <Text style={[styles.header_text]}>Poder Ejecutivo del Estado</Text>
                       <Text style={[styles.header_text]}>Secretaría de Educación Guerrero</Text>
                       <Text style={[styles.header_text]}>Subsecretaría de Planeación Educativa</Text>
                       <Text style={[styles.header_text]}>Dirección de Seguimiento Control y Evaluación</Text>
                       <Text style={[styles.header_text]}>Departamento de Revalidación de Estudios e</Text>
                       <Text style={[styles.header_text]}>Incoorporación de Escuelas</Text>
                       <Text style={[styles.header_text]}>CLAVE DE INCOORPORACIÓN 12PBT0233H</Text>
                    </View>
                    <View style={styles.box_logo}>
                        <Image style={styles.icaLogo} src={blue} />
                    </View>

                </View>

                <View style={styles.box}>
                    <View style={styles.box_content}>
                        <Text style={styles.title_text}>DATOS DEL ALUMNO:</Text>
                    </View>
                    <View style={styles.box_content}>
                        <Text style={styles.title_text}>FOLIO: </Text>
                        <Text style={styles.title_text}>{receipt.id}</Text>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.box_content}>
                        <Text style={styles.title_text}>{student.name}</Text>
                    </View>
                    <View style={styles.box_content}>
                        <Text style={styles.title_text}>FOLIO: </Text>
                        <Text style={styles.title_text}>{receipt.id}</Text>
                    </View>
                </View>
                {/* <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.conceptCell]}>DATOS DEL ALUMNO:</Text>
                        <Text style={[styles.cell, styles.amountCell]}>FOLIO: </Text>
                        <Text style={[styles.cell, styles.amountCell]}></Text>
                    </View>


                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.conceptCell]}>jasd</Text>
                        <Text style={[styles.cell, styles.amountCell]} colSpan={2}></Text>
                    </View>
                </View> */}

                <Text style={[styles.smallText, { marginTop: 5 }]}>
                    CONTACTO - TEL: 627-15-22 CORREO: contacto@icasys.mx
                </Text>

                <Text style={styles.tinyText}>
                    para cualquier duda o aclaración favor de presentarse en nuestras Instalaciones en horario de oficina, donde
                    con gusto le atenderemos.
                </Text>

                <Image style={styles.greca} src={greca} />
            </Page>
        </Document>
    );
};

export default Receipt;

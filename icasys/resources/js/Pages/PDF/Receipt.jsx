import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import seg from '../../Assets/Images/seg/rec.png'
import blue from '../../Assets/Images/azul.png'
import greca from '../../Assets/Images/seg/greca.png'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 10,
    },
    logo: {
        width: '30%',
    },
    header: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    instituteInfo: {
        width: '50%',
        textAlign: 'center',
    },
    icaLogo: {
        width: '30%',
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
    smallText: {
        fontSize: 9,
    },
    tinyText: {
        fontSize: 7,
    },
    upperCase: {
        textTransform: 'uppercase',
    },
});

const Receipt = ({ receipt, student, payments }) => {
    // Your PHP logic for numberEnTexto function and other calculations can go here

    return (
        <Document>
            <Page size="LETTER" style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.logo} src={seg} />
                    <View style={styles.instituteInfo}>
                       <Text>
                       INSTITUTO DE COMPUTACIÓN ACTUALIZADA
                       </Text>
                    </View>
                    <Image style={styles.icaLogo} src={blue} />
                </View>

                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.conceptCell]}>DATOS DEL ALUMNO:</Text>
                        <Text style={[styles.cell, styles.amountCell]}>FOLIO: </Text>
                        <Text style={[styles.cell, styles.amountCell]}></Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.conceptCell]}>jasd</Text>
                        <Text style={[styles.cell, styles.amountCell]} colSpan={2}></Text>
                    </View>
                </View>

                <Text style={[styles.smallText, { marginTop: 5 }]}>
                    CONTACTO - TEL: 627-15-22 CORREO: contacto@icasys.mx
                </Text>

                <Text style={styles.tinyText}>
                    para cualquier duda o aclaración favor de presentarse en nuestras Instalaciones en horario de oficina, donde
                    con gusto le atenderemos.
                </Text>

                <Image style={styles.logo} src={greca} />
            </Page>
        </Document>
    );
};

export default Receipt;

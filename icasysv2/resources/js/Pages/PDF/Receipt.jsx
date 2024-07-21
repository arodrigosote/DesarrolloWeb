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
        width: '130px',
        height: '45px',
        marginTop: '15px',
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
    box_logo: {
        width: '33%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center',
    },
    icaLogo: {
        width: '130px',
        height: '53px',
        marginTop: '15px',
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
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: '5px',
        paddingTop: '5px',
        color: '#014ba0',
        fontStyle: 'normal',
    },
    name_text: {
        fontSize: 11.5,
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: '21px',
        paddingTop: '21px',
        textTransform: 'uppercase', // Agrega esta línea
    },

    sub_text: {
        fontSize: 7,
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: '5px',
        paddingTop: '5px',
    },
    mid_text: {
        fontSize: 9,
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: '5px',
        paddingTop: '5px',
    },
    upperCase: {
        textTransform: 'uppercase',
    },

    box: {
        width: '90%',
        marginHorizontal: '15px',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box_two: {
        marginTop: '12px',
        width: '90%',
        marginHorizontal: '15px',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    box_left: {
        width: '70%',
        border: '0.8 solid black',
    },
    box_right: {
        width: '28%',
        border: '0.8 solid black',
    },
    border_up: {
        borderTop: '1 solid black',
    },
    border_bottom: {
        borderBottom: '0.8 solid black',
    },
    border_left: {
        borderLeft: '1 solid black',
    },
    border_right: {
        borderRight: '1 solid black',
    }
});

const Receipt = ({ receipt, student, payments, schedule }) => {
    // Your PHP logic for numberEnTexto function and other calculations can go here

    const UNIDADES = ["Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve"];
    const DECENAS = ["Diez", "Veinte", "Treinta", "Cuarenta", "Cincuenta", "Sesenta", "Setenta", "Ochenta", "Noventa"];
    const CENTENAS = ["Ciento", "Doscientos", "Trescientos", "Cuatrocientos", "Quinientos", "Seiscientos", "Setecientos", "Ochocientos", "Novecientos"];
    const MILLARES = ["Mil", "Millón", "Millardo", "Billón", "Trillón", "Cuatrillón", "Quintillón", "Sextillón", "Septillón", "Octillón", "Nonillón", "Decillón"];

    const convertirNumeroALetra = (numero) => {
        const UNIDADES = ["", "Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve", "Diez", "Once", "Doce", "Trece", "Catorce", "Quince", "Dieciséis", "Diecisiete", "Dieciocho", "Diecinueve"];
        const DECENAS = ["", "", "Veinte", "Treinta", "Cuarenta", "Cincuenta", "Sesenta", "Setenta", "Ochenta", "Noventa"];
        const CENTENAS = ["", "Ciento", "Doscientos", "Trescientos", "Cuatrocientos", "Quinientos", "Seiscientos", "Setecientos", "Ochocientos", "Novecientos"];

        if (isNaN(numero)) {
            return "No es un número válido";
        }

        if (numero === 0) {
            return "Cero";
        }

        let numeroStr = numero.toString();
        let negativo = numero < 0;
        numeroStr = numeroStr.replace("-", "");

        let parteEntera = parseInt(numeroStr.split(".")[0], 10);
        let parteDecimal = numeroStr.split(".")[1] || "";

        const convertirSeccion = (numero) => {
            let salida = "";

            if (numero < 20) {
                salida = UNIDADES[numero];
            } else if (numero < 100) {
                let unidades = numero % 10;
                let decenas = Math.floor(numero / 10);
                salida = DECENAS[decenas];
                if (unidades > 0) {
                    salida += " y " + UNIDADES[unidades];
                }
            } else {
                let unidades = numero % 10;
                let decenas = Math.floor((numero % 100) / 10);
                let centenas = Math.floor(numero / 100);
                salida = CENTENAS[centenas];
                if (decenas > 0 || unidades > 0) {
                    salida += " " + convertirSeccion(numero % 100);
                }
            }

            return salida;
        };

        const seccionMiles = (numero) => {
            if (numero === 0) {
                return "";
            } else if (numero === 1) {
                return "Mil";
            } else {
                return convertirSeccion(numero) + " Mil";
            }
        };

        let resultado = "";
        let miles = Math.floor(parteEntera / 1000);
        let resto = parteEntera % 1000;

        if (miles > 0) {
            resultado += seccionMiles(miles) + " ";
        }

        if (resto > 0) {
            resultado += convertirSeccion(resto);
        }

        if (parteDecimal.length > 0) {
            resultado += " con " + convertirSeccion(parseInt(parteDecimal, 10)) + " centavos";
        }

        if (negativo) {
            resultado = "Menos " + resultado;
        }

        return resultado.trim();
    };

    const money = convertirNumeroALetra(receipt.amount);

    return (
        <Document>
            <Page size="LETTER" style={[styles.container, { marginTop: 10 }]}>
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
                    <View style={styles.box_left}>
                        <Text style={[styles.title_text, styles.border_bottom]}>DATOS DEL ALUMNO:</Text>
                        <Text style={[styles.name_text, styles.border_bottom]}>{student.name}</Text>
                        <Text style={[styles.title_text, styles.border_bottom]}>HORARIO:</Text>
                        <Text style={[styles.mid_text]}>{schedule}</Text>
                    </View>
                    <View style={styles.box_right}>
                        <Text style={[styles.title_text, styles.border_bottom]}>FOLIO: {receipt.id}</Text>
                        <Text style={[styles.sub_text, styles.border_bottom]}>LUGAR DE EXPEDICIÓN</Text>
                        <Text style={[styles.sub_text, styles.border_bottom]}>TAXCO DE ALARCÓN</Text>
                        <Text style={[styles.sub_text, styles.border_bottom]}>PLAZUELA DEL TORIL 4</Text>
                        <Text style={[styles.title_text, styles.border_bottom]}>FECHA:</Text>
                        <Text style={[styles.mid_text]}>{receipt.date_payment}</Text>
                    </View>
                </View>

                <View style={styles.box_two}>
                    <View style={styles.box_left}>
                        <Text style={[styles.title_text, styles.border_bottom]}>CONCEPTO:</Text>
                        <Text style={[styles.mid_text]}>{`Colegiatura correspondiente a semana(s):`} {payments.map((payment) => (
                            <Text key={payment.id}>{`${payment.week_topay_number} del ${payment.week_topay_date}, `}</Text>
                        ))} de clases.</Text>
                    </View>
                    <View style={styles.box_right}>
                        <Text style={[styles.sub_text, styles.border_bottom]}> </Text>
                        <Text style={[styles.mid_text, styles.border_bottom]}>{`$${receipt.amount}.00`}</Text>
                        <Text style={[styles.mid_text]}>{money} 00/100</Text>
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

                <Text style={[styles.smallText, { marginTop: 10 }]}>
                    CONTACTO - TEL: 627-15-22 CORREO: contacto@icasys.mx
                </Text>

                <Text style={[styles.tinyText, { marginTop: 5 }]}>
                    para cualquier duda o aclaración favor de presentarse en nuestras Instalaciones en horario de oficina, donde
                    con gusto le atenderemos.
                </Text>

                <Image style={[styles.greca, { marginTop: 5 }]} src={greca} />
            </Page>
        </Document>
    );
};

export default Receipt;

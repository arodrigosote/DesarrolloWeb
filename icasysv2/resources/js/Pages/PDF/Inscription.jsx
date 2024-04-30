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
    main_title: {
        fontSize: 14,
        color: '#014ba0',
        marginTop: '28px',
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
        fontWeight: 'bold',
    },
    name_text: {
        fontSize: 11,
        alignItems: 'center',
        textAlign: 'center',
        paddingBottom: '21px',
        paddingTop: '21px',
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

const Inscription = ({ student }) => {
    // Your PHP logic for numberEnTexto function and other calculations can go here

    const UNIDADES = ["Un", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete", "Ocho", "Nueve"];
    const DECENAS = ["Diez", "Veinte", "Treinta", "Cuarenta", "Cincuenta", "Sesenta", "Setenta", "Ochenta", "Noventa"];
    const CENTENAS = ["Ciento", "Doscientos", "Trescientos", "Cuatrocientos", "Quinientos", "Seiscientos", "Setecientos", "Ochocientos", "Novecientos"];
    const MILLARES = ["Mil", "Millón", "Millardo", "Billón", "Trillón", "Cuatrillón", "Quintillón", "Sextillón", "Septillón", "Octillón", "Nonillón", "Decillón"];

    // const convertirNumeroALetra = (numero) => {
    //     if (isNaN(numero)) {
    //         return "No es un número válido";
    //     }

    //     if (numero === 0) {
    //         return "cero";
    //     }

    //     let numeroStr = numero.toString();
    //     let negativo = numero < 0;
    //     numeroStr = numeroStr.replace("-", "");

    //     let parteEntera = numeroStr.split(".")[0];
    //     let parteDecimal = numeroStr.split(".")[1] || "";

    //     let resultado = "";
    //     let gruposDeTres = parteEntera.length / 3;
    //     let resto = parteEntera.length % 3;

    //     for (let i = 0; i < gruposDeTres; i++) {
    //         let grupo = parseInt(parteEntera.substr(i * 3, 3));
    //         let centena = Math.floor(grupo / 100);
    //         let decena = Math.floor((grupo % 100) / 10);
    //         let unidad = grupo % 10;

    //         if (centena > 0) {
    //             resultado += CENTENAS[centena - 1] + " ";
    //         }

    //         if (decena > 1) {
    //             resultado += DECENAS[decena - 1] + " ";
    //         } else if (decena === 1 && unidad > 0) {
    //             resultado += "once ";
    //         } else if (decena === 1) {
    //             resultado += "diez ";
    //         }

    //         if (unidad > 0) {
    //             if (decena === 1 && unidad === 1) {
    //                 resultado += "y uno";
    //             } else {
    //                 resultado += UNIDADES[unidad - 1] + " ";
    //             }
    //         }

    //         if (i < gruposDeTres - 1) {
    //             resultado += MILLARES[i] + " ";
    //         }
    //     }

    //     if (resto > 0) {
    //         let grupo = parseInt(parteEntera.substr(parteEntera.length - resto));
    //         resultado += convertirNumeroALetra(grupo);
    //     }

    //     if (parteDecimal.length > 0) {
    //         resultado += " con ";
    //         for (let i = 0; i < parteDecimal.length; i++) {
    //             resultado += UNIDADES[parseInt(parteDecimal[i])] + " ";
    //         }
    //         resultado += "décimas";
    //     }

    //     if (negativo) {
    //         resultado = "menos " + resultado;
    //     }

    //     return resultado.trim();
    // }

    // const money = convertirNumeroALetra(receipt.amount);

    return (
        <Document>
            <Page size="LETTER" style={[styles.container, { marginTop: 10 }]}>
                <View style={styles.header}>
                    <View style={styles.box_logo}>
                        <Image style={styles.logo} src={seg} />
                    </View>

                    <View style={styles.instituteInfo}>
                        <Text style={[styles.main_title]}>Formato de Incorporación</Text>
                    </View>
                    <View style={styles.box_logo}>
                        <Image style={styles.icaLogo} src={blue} />
                    </View>

                </View>
                <Image style={[styles.greca, { marginTop: 5 }]} src={greca} />

                {/* <View style={styles.box}>
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
                </View>  */}

                {/* <View style={styles.box_two}>
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
                </View> */}

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

export default Inscription;

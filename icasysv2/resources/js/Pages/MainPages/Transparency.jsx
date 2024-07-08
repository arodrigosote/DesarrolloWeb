import React, { useState, useRef } from "react";
import Header from "../Components/Header/Header";
import { Head, useForm } from '@inertiajs/react';
import { CImage } from "@coreui/react";
import icono from '../../Assets/Images/azul.png';
import Footer from "../Components/Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import ButtonPrimary from "@/Components/ButtonPrimary";

export default function Transparency(auth) {

    return (
        <>
            <ToastContainer></ToastContainer>
            <Head>
                <title>Contacto</title>
            </Head>
            <Header auth={auth}></Header>

            <div className="bg-lighter text-center pt-28 pb-16 md:pt-32 md:pb-32">
                <CImage rounded thumbnail src={icono} className="mx-auto w-14 md:w-14 lg:w-14 xl:w-14" />
                <h1 className="text-primary font-bold text-3xl md:text-5xl">Transparencia</h1>
                <p className="mt-2 md:mt-4 font-light text-gray-500 w-[90%] md:w-[40%] m-auto">En ICASYS, estamos comprometidos con la transparencia y la confianza de nuestros usuarios. Por ello, ponemos a tu disposición la información necesaria para que puedas comprobar nuestro registro oficial ante la Secretaría de Educación.</p>
            </div>

            <div class="max-w-4xl my-14 mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Transparencia</h2>
                <p class="mb-6 text-gray-700">En ICASYS, nos enorgullece mantener un alto nivel de transparencia con todos nuestros usuarios. Por ello, queremos facilitarte la verificación de nuestro registro oficial ante la Secretaría de Educación. A continuación, te mostramos los pasos para acceder a esta información:</p>

                <h3 class="text-xl font-semibold mb-2 text-gray-800">¿Cómo verificar nuestro registro?</h3>
                <p class="mb-4 text-gray-700">Nuestro registro oficial puede ser confirmado a través de varios portales de la Secretaría de Educación. Te proporcionamos dos enlaces a continuación para que puedas acceder de manera sencilla:</p>
                <ol class="list-decimal list-inside mb-6 text-blue-600">
                    <li><a href="https://servicios.seg.gob.mx/planeacion_educativa#consulta_rvoe" class="underline hover:text-blue-800" target="_blank">Portal de Verificación 1: Servicios Secretaría de Educación Guerrero (SEG)</a></li>
                    <li><a href="https://www.siged.sep.gob.mx/SIGED/escuelas.html" class="underline hover:text-blue-800" target="_blank">Portal de Verificación 2: Sistema de Información y Gestión Educativa
                    Consulta de escuelas (SIGED)</a></li>

                </ol>

                <h3 class="text-xl font-semibold mb-2 text-gray-800">Datos necesarios para la verificación</h3>
                <p class="mb-4 text-gray-700">Para poder obtener los registros de ICASYS, deberás ingresar los siguientes datos en los portales mencionados:</p>
                <ol class="list-decimal list-inside mb-6 text-gray-700">
                    <li><strong>Región:</strong> Norte</li>
                    <li><strong>Nivel educativo:</strong> Capacitación para el trabajo</li>
                    <li><strong>Instituto:</strong> INSTITUTO DE COMPUTACIÓN ACTUALIZADA SYSTEM</li>
                    <li><strong>C.C.T:</strong> 12PBT0233H</li>
                </ol>

                <h3 class="text-xl font-semibold mb-2 text-gray-800">Contacto</h3>
                <p class="mb-6 text-gray-700">Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nosotros dando clic <strong><a href={route('page.contact')}>aquí</a></strong>. Nuestro equipo está aquí para ayudarte a resolver cualquier duda y asegurar que tengas toda la información necesaria.</p>

                <p class="text-gray-700">Gracias por confiar en ICASYS. Estamos dedicados a ofrecer soluciones educativas innovadoras en <strong>computación</strong> e <strong>inglés</strong>, y estamos comprometidos con tu éxito y satisfacción.</p>
            </div>





            <Footer></Footer>
        </>
    );
}

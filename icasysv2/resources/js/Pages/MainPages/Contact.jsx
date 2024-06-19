import React from "react";
import Header from "../Components/Header/Header";
import { Head } from '@inertiajs/react';
import { CImage } from "@coreui/react";
import icono from '../../Assets/Images/azul.png';

export default function (auth) {
    return (
        <>
            <Head>
                <title>Contacto</title>
            </Head>
            <Header auth={auth}></Header>

            <div className="bg-lighter text-center pt-28 pb-16 md:pt-32 md:pb-32">
                <CImage rounded thumbnail src={icono} className="mx-auto w-14 md:w-14 lg:w-14 xl:w-14" />
                <h1 className="text-primary font-bold text-3xl md:text-5xl">Contacto</h1>
                <p className="mt-2 md:mt-4 font-light text-gray-500 w-[90%] md:w-[40%] m-auto">Somos un equipo apasionado, dedicado a ofrecer soluciones educativas innovadoras en computación e inglés. Estamos aquí para ayudarte a alcanzar tus metas. ¡No dudes en ponerte en contacto con nosotros!</p>
            </div>
        </>

    )
}

import React from "react";
import Header from "../Components/Header/Header";
import { Head } from '@inertiajs/react';
import '../../../css/app.css'
import { RiMegaphoneFill, RiGlobalLine  } from "react-icons/ri";
import Footer from "../Components/Footer/Footer";

export default function (auth) {
    return (
        <>
            <Head>
                <title>Servicios</title>
            </Head>
            <Header auth={auth}></Header>
            <div className="bg-lighter text-primary font-bold text-center py-44">
                <h1 className="text-5xl">Servicios</h1>
            </div>

            <div>
                <div className="lg:flex justify-evenly my-16">
                    <div className="text-center bg-secondary hover:bg-blue-900 transition duration-300 ease-in-out lg:w-[23%] m-auto my-6 lg:m-0 w-[80%] text-white p-7 rounded-lg">
                        <RiMegaphoneFill className="text-center w-full text-[45px]"></RiMegaphoneFill>
                        <h3 className="font-extrabold text-[16px]">Marketing</h3>
                        <p className="text-[15px]">Escala tu negocio y vende más</p>
                    </div>
                    <div className="text-center bg-secondary hover:bg-blue-900 transition duration-300 ease-in-out lg:w-[23%] m-auto my-6 lg:m-0 w-[80%] text-white p-7 rounded-lg">
                        <RiGlobalLine  className="text-center w-full text-[45px]"></RiGlobalLine >
                        <h3 className="font-extrabold text-[16px]">Sitios web</h3>
                        <p className="text-[15px]">Que te conozca todo el mundo</p>
                    </div>
                    <div className="text-center bg-secondary hover:bg-blue-900 transition duration-300 ease-in-out lg:w-[23%] m-auto my-6 lg:m-0 w-[80%] text-white p-7 rounded-lg">
                        <RiMegaphoneFill className="text-center w-full text-[45px]"></RiMegaphoneFill>
                        <h3 className="font-extrabold text-[16px]">Sistemas</h3>
                        <p className="text-[15px]">Sistemas para gestionar negocios</p>
                    </div>
                </div>

            </div>


            <Footer></Footer>
        </>

    )
}

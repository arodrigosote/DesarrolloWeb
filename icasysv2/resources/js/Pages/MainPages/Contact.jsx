import React from "react";
import Header from "../Components/Header/Header";
import { Head, useForm } from '@inertiajs/react';
import { CImage } from "@coreui/react";
import icono from '../../Assets/Images/azul.png';
import Footer from "../Components/Footer/Footer";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from "sweetalert2";
import ButtonPrimary from "@/Components/ButtonPrimary";

export default function (auth) {

    const { data, setData, delete: destroy, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        content: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('page.contact.message', data), {
            onSuccess: () => { ok('Mensaje enviado con éxito') },
            onError: () => {
                if (errors.name) {
                    reset('name');
                    nameInput.current.focus();
                }
            }
        });

    };

    const ok = (message) => {
        reset();
        Swal.fire({ title: message, icon: 'success', confirmButtonColor: '#014ba0' })
    };

    return (
        <>
        <ToastContainer></ToastContainer>
            <Head>
                <title>Contacto</title>
            </Head>
            <Header auth={auth}></Header>

            <div className="bg-lighter text-center pt-28 pb-16 md:pt-32 md:pb-32">
                <CImage rounded thumbnail src={icono} className="mx-auto w-14 md:w-14 lg:w-14 xl:w-14" />
                <h1 className="text-primary font-bold text-3xl md:text-5xl">Contacto</h1>
                <p className="mt-2 md:mt-4 font-light text-gray-500 w-[90%] md:w-[40%] m-auto">Somos un equipo apasionado, dedicado a ofrecer soluciones educativas innovadoras en computación e inglés. Estamos aquí para ayudarte a alcanzar tus metas. ¡No dudes en ponerte en contacto con nosotros!</p>
            </div>

            <div className="w-full max-w-md mx-auto px-2 py-8">
                <h2 className="text-2xl font-bold mb-4 text-secondary">Mándanos un mensaje</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label for="name" className="block text-sm font-medium text-muted-foreground">
                                Nombre
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="name"
                                placeholder="Escribe tu nombre"
                                type="text"
                                value={data.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label for="email" className="block text-sm font-medium text-muted-foreground">
                                Email
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="email"
                                placeholder="Escribe tu email"
                                type="email"
                                value={data.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label for="subject" className="block text-sm font-medium text-muted-foreground">
                            Asunto
                        </label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="subject"
                            placeholder="Escribe el asunto"
                            type="text"
                            value={data.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label for="message" className="block text-sm font-medium text-muted-foreground">
                            Mensaje
                        </label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="content"
                            rows="4"
                            placeholder="Escribe tu mensaje"
                            value={data.content}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <ButtonPrimary disabled={processing} className="w-full flex justify-center">Enviar</ButtonPrimary>
                    </div>
                </form>
            </div>

            <Footer></Footer>
        </>

    )
}

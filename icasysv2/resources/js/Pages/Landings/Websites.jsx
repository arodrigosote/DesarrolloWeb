import React from 'react';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import Service from '../Components/Services/Service';
import SocialMedia from '../Components/SocialMedia/SocialMedia';
import { Head } from '@inertiajs/react';
import Footer from '../Components/Footer/Footer';
import ButtonPrimary from '@/Components/ButtonPrimary';
import ButtonSecondary from '@/Components/ButtonSecondary';
import ButtonYellow from '@/Components/ButtonYellow';
import { BigPlayButton, ControlBar, LoadingSpinner, PlayToggle, Player, ReplayControl, VolumeMenuButton } from "video-react";

export default function Websites(auth) {
    return (
        <>
            <Head>
                <title>Inicio</title>
            </Head>
            <Header auth={auth}></Header>
            <div className="bg-lighter text-primary font-bold text-center py-44">
                <h1 className="text-5xl mb-10 lg:mx-0 mx-5">Ten presencia en internet HOY mismo</h1>
                <p className='text-secondary lg:text-xl text-md lg:mx-0 mx-5 text-center'>✅ Sitioweb optimizado completamente en SEO</p>
                <p className='text-secondary lg:text-xl text-md lg:mx-0 mx-5 text-center'>✅ Diseñado y lanzado en 2 semanas</p>
                <p className='text-secondary lg:text-xl text-md lg:mx-0 mx-5 text-center'>✅ Diseñado especialmente para obtener clientes potenciales</p>
                <div className='flex justify-center mt-14 lg:mx-0 mx-5'>
                    <iframe className='w-[720px] h-[440px]' src="https://www.youtube-nocookie.com/embed/fVR03j24N-U?si=gfK0AcgRDaDQpUcF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
                <p className='text-gray-500 lg:mx-0 mx-5 mt-8'>Descubre como conseguir muchas más clientes en el video ☝️</p>
                <div className='flex justify-center mt-12'>
                    <ButtonPrimary>Cotizar</ButtonPrimary>
                </div>

            </div>


            {/* Service section */}
            <div>
                <h1 className='text-center py-16 text-4xl text-primary font-bold'>Paquetes</h1>
            </div>
            <div className='block lg:flex justify-evenly'>
                <div className='text-center  lg:w-[22%] w-[80%] mx-auto my-9 lg:my-0 lg:mx-0 border-4 rounded-lg shadow-lg'>
                    <h1 className='bg-blue-500 m-0 py-10 px-14 text-white font-bold text-lg border-b-4 border-blue-500'>Landing page</h1>
                    <h2 className='pt-7 pb-3' >INCLUYE</h2>
                    <ol>
                        <li className='py-3 text-sm px-10'>1 página de ventas optimizada para generar clientes potenciales.</li>
                        <li className='py-3 text-sm px-10'>Integración con el píxel de Facebook para seguimiento de campañas.</li>
                        <li className='py-3 text-sm px-10'>Creación de todos los diseños necesarios.</li>
                        <li className='py-3 text-sm px-10'>Creación de perfil de negocio en Google.</li>
                    </ol>
                    <ButtonYellow className='my-10 mx-auto w-[70%]'>Contactar</ButtonYellow>
                </div>
                <div className='text-center  lg:w-[22%] w-[80%] mx-auto my-9 lg:my-0 lg:mx-0 border-4 rounded-lg shadow-lg'>
                    <h1 className='bg-blue-500 m-0 py-10 px-14 text-white font-bold text-lg border-b-4 border-blue-500'>Tienda Online</h1>
                    <h2 className='pt-7 pb-3' >INCLUYE</h2>
                    <ol>
                        <li className='py-3 text-sm px-10'>1 página de ventas optimizada para generar clientes potenciales.</li>
                        <li className='py-3 text-sm px-10'>Página de contacto</li>
                        <li className='py-3 text-sm px-10'>Tienda online</li>
                        <li className='py-3 text-sm px-10'>Página del carrito</li>
                        <li className='py-3 text-sm px-10'>Checkout</li>
                    </ol>
                    <ButtonYellow className='my-10 mx-auto w-[70%]'>Contactar</ButtonYellow>
                </div>
                <div className='text-center  lg:w-[22%] w-[80%] mx-auto my-9 lg:my-0 lg:mx-0 border-4 rounded-lg shadow-lg'>
                    <h1 className='bg-blue-500 m-0 py-10 px-14 text-white font-bold text-lg border-b-4 border-blue-500'>Sitio Web profesional</h1>
                    <h2 className='pt-7 pb-3' >INCLUYE</h2>
                    <ol>
                        <li className='py-3 text-sm px-10'>Página de <strong>Home</strong></li>
                        <li className='py-3 text-sm px-10'>Página de <strong>contacto</strong></li>
                        <li className='py-3 text-sm px-10'>Página de <strong>acerca de</strong></li>
                    </ol>
                    <ButtonYellow className='my-10 mx-auto w-[70%]'>Contactar</ButtonYellow>
                </div>
            </div>
            <div className='text-center py-14'>
                <h2 className='text-secondary font-bold text-2xl'>Todos nuestros paquetes, Incluyen:</h2>
                <ol className='py-5'>
                    <li>✅Dominio por 1 año</li>
                    <li>✅Hosting por 1 año</li>
                    <li>✅Certificados de seguridad SSL</li>
                    <li>✅Cuentas de correo corporativo</li>
                    <li>✅Formularios de contacto</li>
                    <li>✅Botón flotante de Whatsapp</li>
                    <li>✅Seguridad contra malware, ataques DDoS</li>
                    <li>✅SEO avanzado</li>
                </ol>
            </div>

            <Footer></Footer>
        </>
    )
}

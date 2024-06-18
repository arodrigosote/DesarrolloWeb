import React from 'react';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import Service from '../Components/Services/Service';
import SocialMedia from '../Components/SocialMedia/SocialMedia';
import { Head } from '@inertiajs/react';
import Footer from '../Components/Footer/Footer';

export default function Websites(auth) {
    return (
        <>
            <Head>
                <title>Inicio</title>
            </Head>
            <Header auth={auth}></Header>
            <div>
                <p>Hola mundo</p>
            </div>

            {/* Service section */}
            <div className='block lg:flex justify-evenly'>
                <div className='text-center border-blue-600 w-[22%]'>
                    <h1 className='bg-secondary m-0 py-10 px-14 text-white font-bold text-lg'>Landing page</h1>
                    <h2>INCLUYE</h2>
                    <ol>
                        <li>1 página de ventas optimizada para generar clientes potenciales.</li>
                        <li>Integración con el píxel de Facebook para seguimiento de campañas.</li>
                        <li>Creación de todos los diseños necesarios.</li>
                        <li>Creación de perfil de negocio en Google.</li>
                    </ol>
                </div>
                <div className='text-center border-blue-600 w-[22%]'>
                    <h1 className='bg-secondary m-0 py-10 px-14 text-white font-bold text-lg'>Tienda Online</h1>
                    <h2>INCLUYE</h2>
                    <ol>
                        <li>1 página de ventas optimizada para generar clientes potenciales.</li>
                        <li>Página de contacto</li>
                        <li>Tienda online</li>
                        <li>Página del carrito</li>
                        <li>Checkout</li>

                    </ol>
                </div>
                <div className='text-center border-blue-600 w-[22%]'>
                    <h1 className='bg-secondary m-0 py-10 px-14 text-white font-bold text-lg'>Sitio Web profesional</h1>
                    <h2>INCLUYE</h2>
                    <ol>
                        <li>Página de <strong>Home</strong></li>
                        <li>Página de <strong>contacto</strong></li>
                        <li>Página de <strong>acerca de</strong></li>
                        <li>Dominio gratis 1 año</li>
                        <li>Hospedaje gratis 1 año</li>

                    </ol>
                </div>
            </div>
            <div>
                <h2>Todos nuestros planes, Incluyen</h2>
                <ol>
                    <li>Dominio por 1 año</li>
                    <li>Hosting por 1 año</li>
                    <li>Certificados de seguridad SSL</li>
                    <li>Cuentas de correo corporativo</li>
                    <li>Formularios de contacto</li>
                    <li>Botón flotante de Whatsapp</li>
                    <li>Seguridad contra malware, ataques DDoS</li>
                    <li>SEO avanzado</li>
                </ol>
            </div>

            <Footer></Footer>
        </>
    )
}

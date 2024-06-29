import React from 'react';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import Service from '../Components/Services/Service';
import SocialMedia from '../Components/SocialMedia/SocialMedia';
import { Head } from '@inertiajs/react';
import Footer from '../Components/Footer/Footer';
import image from '../../../js/Assets/Images/fondo.webp'

export default function Home(auth) {
    return (
        <>
            <Head>
                <title>Cursos de Computación e Inglés</title>
                <meta property="og:title" content="Cursos de Computación e Inglés" />
                <meta name='description' property="og:description" content="Somos un instituto de educación que busca proporcionar enseñanza de calidad a nuestros estudiantes en áreas como: Ofimática, Programación, Diseño Gráfico, Diseño Web, Marketing e Inglés." />
                <meta property="og:image" content={image} />
            </Head>
            <Header auth={auth}></Header>
            <Hero></Hero>
            <Service></Service>
            <SocialMedia></SocialMedia>
            <Footer></Footer>
        </>
    )
}

import React from 'react';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import Service from '../Components/Services/Service';
import SocialMedia from '../Components/SocialMedia/SocialMedia';
import { Head } from '@inertiajs/react';
import Footer from '../Components/Footer/Footer';

export default function Home(auth) {
    return (
        <>
            <Head>
                <title>Inicio</title>
            </Head>
            <Header auth={auth}></Header>
            <Hero></Hero>
            <Service></Service>
            <SocialMedia></SocialMedia>
            <Footer></Footer>
        </>
    )
}

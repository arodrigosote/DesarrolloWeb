import React from "react";
import Header from "../Components/Header/Header";
import { Head } from '@inertiajs/react';
import img1 from '../../Assets/Images/about us/1.webp'
import img2 from '../../Assets/Images/about us/2.webp'
import { RiHeart3Fill } from "react-icons/ri";
import { RiTeamFill, RiSparkling2Fill } from "react-icons/ri";
import { CImage } from "@coreui/react";
import icono from '../../Assets/Images/azul.png';
import Footer from "../Components/Footer/Footer";

export default function (auth) {
    return (
        <>
            <Head>
                <title>Acerca de</title>
            </Head>
            <Header auth={auth}></Header>
            <div className="bg-lighter text-center pt-28 pb-16 md:pt-32 md:pb-32">
                <CImage rounded thumbnail src={icono} className="mx-auto w-14 md:w-14 lg:w-14 xl:w-14" />
                <h1 className="text-primary font-bold text-3xl md:text-5xl">Acerca de</h1>
                <p className="mt-2 md:mt-4 font-light text-gray-500">Somos un equipo de individuos apasionados, dedicados a crear soluciones educativas innovadoras que marcan la diferencia en el mundo.</p>
            </div>
            <section className="py-20 px-4 md:px-8 bg-background">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-primary">Nuestra historia</h2>
                        <p className="text-muted-foreground text-justify">
                            Desde 1996, hemos sido un referente en la enseñanza de computación e inglés, ayudando a miles de estudiantes a alcanzar sus metas académicas y profesionales. Con más de 27 años de experiencia, combinamos un equipo de profesores altamente capacitados con programas educativos actualizados y personalizados. En ICASYS, estamos comprometidos con la excelencia, la innovación y la formación integral, asegurando que cada alumno esté preparado para enfrentar los desafíos del mundo moderno.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <img src={img1} width={500} height={300} alt="History" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-center">
                        <img src={img2} width={500} height={300} alt="Values" className="rounded-lg shadow-lg" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-4 text-primary">Nuestros valores</h2>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <RiSparkling2Fill className="w-10 h-10 text-secondary"></RiSparkling2Fill>
                                <div>
                                    <h3 className="text-xl font-bold">Innovation</h3>
                                    <p className="text-muted-foreground text-justify">
                                        Siempre buscamos nuevas y mejores maneras de resolver problemas y crear valor para nuestros alumnos.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <RiHeart3Fill className="w-9 h-9 text-secondary"></RiHeart3Fill>
                                <div>
                                    <h3 className="text-xl font-bold">Passion</h3>
                                    <p className="text-muted-foreground text-justify">
                                        Nos apasiona nuestro trabajo y nos esforzamos por ofrecer resultados excepcionales a nuestros alumnos.
                                    </p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                {/* <UsersIcon className="w-8 h-8 text-primary" /> */}
                                <RiTeamFill className="w-9 h-9 text-secondary"></RiTeamFill>
                                <div>
                                    <h3 className="text-xl font-bold">Collaboration</h3>
                                    <p className="text-muted-foreground text-justify">
                                        Creemos en el poder del trabajo en equipo y colaboramos estrechamente con nuestros alumnos para alcanzar sus objetivos.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>

    )
}

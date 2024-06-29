import React from "react";
import Header from "../Components/Header/Header";
import { Head } from '@inertiajs/react';
import '../../../css/app.css'
import { RiMegaphoneFill, RiGlobalLine, RiCodeSSlashFill   } from "react-icons/ri";
import Footer from "../Components/Footer/Footer";
import ButtonPrimary from "@/Components/ButtonPrimary";
import ButtonYellow from "@/Components/ButtonYellow";
import image from '../../Assets/Images/service/imageservice.webp'

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
                <h2 className="text-4xl font-bold text-secondary text-center mt-14">Nuestros servicios</h2>
                <div className="lg:flex justify-evenly mt-16">
                    <div className="text-center bg-auxiliar2 transition-transform transform hover:scale-105 duration-300 ease-in-out lg:w-[23%] m-auto my-6 lg:m-0 w-[80%] text-white p-7 rounded-lg">
                        <RiMegaphoneFill className="text-center w-full text-[45px]"></RiMegaphoneFill>
                        <h3 className="font-extrabold text-[16px]">Marketing</h3>
                        <p className="text-[15px]">Escala tu negocio y vende más</p>
                        {/* <ButtonYellow className="mt-4">Conocer más</ButtonYellow> */}
                    </div>
                    <div className="text-center bg-auxiliar2 transition-transform transform hover:scale-105 duration-300 ease-in-out lg:w-[23%] m-auto my-6 lg:m-0 w-[80%] text-white p-7 rounded-lg">
                        <RiGlobalLine  className="text-center w-full text-[45px]"></RiGlobalLine >
                        <h3 className="font-extrabold text-[16px]">Sitios web</h3>
                        <p className="text-[15px]">Que te conozca todo el mundo</p>
                        {/* <ButtonYellow className="mt-4">Conocer más</ButtonYellow> */}
                    </div>
                    <div className="text-center bg-auxiliar2 transition-transform transform hover:scale-105 duration-300 ease-in-out lg:w-[23%] m-auto my-6 lg:m-0 w-[80%] text-white p-7 rounded-lg">
                        <RiCodeSSlashFill  className="text-center w-full text-[45px]"></RiCodeSSlashFill >
                        <h3 className="font-extrabold text-[16px]">Sistemas</h3>
                        <p className="text-[15px]">Sistemas para gestionar negocios</p>
                        {/* <ButtonYellow className="mt-4">Conocer más</ButtonYellow> */}
                    </div>
                </div>

            </div>

            <AboutUsSection />
            <FAQSection />
            <OurProcessSection />

            {/* <TestimonialsSection />


            <PortfolioSection />
            <BlogSection />
            <TeamSection />
            <ContactSection /> */}

            <Footer></Footer>
        </>

    )
}


function AboutUsSection() {
    return (
        <div className="bg-white py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Acerca de Nosotros</h2>
            <p className="text-lg text-gray-600 w-3/4 mx-auto mb-8">Somos un equipo apasionado, dedicado a ofrecer soluciones educativas innovadoras en temas de marketing, educación, software y más. Estamos aquí para ayudarte a alcanzar tus metas. ¡No dudes en ponerte en contacto con nosotros!</p>
            <div className="w-3/4 mx-auto flex justify-center">
                <img src={image} alt="Team Photo" width='350px' className="rounded-lg shadow-lg"/>
            </div>
        </div>
    );
}

function TestimonialsSection() {
    return (
        <div className="bg-gray-100 py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Testimonios</h2>
            <div className="w-3/4 mx-auto flex flex-col space-y-8">
                <Testimonial
                    name="Juan Pérez"
                    message="La mejor experiencia con sus servicios. Altamente recomendados."
                />
                <Testimonial
                    name="María López"
                    message="Profesionalismo y calidad en cada paso. ¡Excelentes resultados!"
                />
            </div>
        </div>
    );
}

function OurProcessSection() {
    return (
        <div className="bg-white py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Nuestro Proceso</h2>
            <p className="text-lg text-gray-600 w-3/4 mx-auto mb-8">Desde la consulta inicial hasta la entrega final y el soporte continuo, seguimos un proceso estructurado para garantizar la satisfacción de nuestros clientes.</p>
            <div className="w-3/4 mx-auto flex flex-col space-y-8">
                <ProcessStep step="Consulta Inicial" description="Nos reunimos contigo para entender tus necesidades y objetivos." />
                <ProcessStep step="Planificación" description="Creamos un plan detallado para abordar tus requerimientos." />
                <ProcessStep step="Ejecución" description="Llevamos a cabo el plan con precisión y profesionalismo." />
                <ProcessStep step="Entrega y Soporte" description="Te entregamos el producto final y ofrecemos soporte continuo." />
            </div>
        </div>
    );
}

function FAQSection() {
    return (
        <div className="bg-gray-100 py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Preguntas Frecuentes</h2>
            <div className="w-3/4 mx-auto flex flex-col space-y-8">
                <FAQ question="¿Cómo puedo contactarlos?" answer="Puedes contactarnos a través del formulario en la sección de contacto o llamarnos al 7621248057." />
                <FAQ question="¿Qué tipos de servicios ofrecen?" answer="Ofrecemos servicios de marketing, desarrollo de sitios web y sistemas de gestión." />
            </div>
        </div>
    );
}

function PortfolioSection() {
    return (
        <div className="bg-white py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Portafolio</h2>
            <p className="text-lg text-gray-600 w-3/4 mx-auto mb-8">Estos son algunos de los proyectos en los que hemos trabajado.</p>
            <div className="w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <PortfolioItem title="Proyecto 1" description="Descripción del proyecto 1." />
                <PortfolioItem title="Proyecto 2" description="Descripción del proyecto 2." />
                <PortfolioItem title="Proyecto 3" description="Descripción del proyecto 3." />
            </div>
        </div>
    );
}

function BlogSection() {
    return (
        <div className="bg-gray-100 py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Blog</h2>
            <div className="w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BlogPost title="Publicación 1" excerpt="Resumen de la publicación 1." />
                <BlogPost title="Publicación 2" excerpt="Resumen de la publicación 2." />
                <BlogPost title="Publicación 3" excerpt="Resumen de la publicación 3." />
            </div>
        </div>
    );
}

function TeamSection() {
    return (
        <div className="bg-white py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Nuestro Equipo</h2>
            <p className="text-lg text-gray-600 w-3/4 mx-auto mb-8">Conoce a las personas que hacen posible nuestro trabajo.</p>
            <div className="w-3/4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TeamMember name="Juan Pérez" position="CEO" />
                <TeamMember name="María López" position="CTO" />
                <TeamMember name="Carlos Gómez" position="Desarrollador" />
            </div>
        </div>
    );
}

function ContactSection() {
    return (
        <div className="bg-gray-100 py-16">
            <h2 className="text-4xl font-bold text-secondary text-center mb-8">Contacto</h2>
            <div className="w-3/4 mx-auto">
                <ContactForm />
            </div>
        </div>
    );
}

function ServiceCard({ icon, title, description }) {
    return (
        <div className="text-center bg-auxiliar2 transition-transform transform hover:scale-105 duration-300 ease-in-out lg:w-[23%] m-auto my-6 lg:m-0 w-[80%] text-white p-7 rounded-lg shadow-lg">
            <div className="flex justify-center mb-4">
                {icon}
            </div>
            <h3 className="font-extrabold text-lg mb-2">{title}</h3>
            <p className="text-sm mb-4">{description}</p>
            <ButtonPrimary className="mt-4">Conocer más</ButtonPrimary>
        </div>
    );
}

function Testimonial({ name, message }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-600 mb-4">"{message}"</p>
            <h4 className="text-lg font-bold text-gray-800">{name}</h4>
        </div>
    );
}

function ProcessStep({ step, description }) {
    return (
        <div className="flex flex-col md:flex-row items-center md:justify-between">
            <h4 className="text-xl font-bold text-gray-800 mb-2 md:mb-0">{step}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

function FAQ({ question, answer }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold text-gray-800 mb-2">{question}</h4>
            <p className="text-sm text-gray-600">{answer}</p>
        </div>
    );
}

function PortfolioItem({ title, description }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
}

function BlogPost({ title, excerpt }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold text-gray-800 mb-2">{title}</h4>
            <p className="text-sm text-gray-600">{excerpt}</p>
        </div>
    );
}

function TeamMember({ name, position }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img src="path/to/member-photo.jpg" alt={name} className="w-24 h-24 rounded-full mx-auto mb-4"/>
            <h4 className="text-lg font-bold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-600">{position}</p>
        </div>
    );
}

function ContactForm() {
    return (
        <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        id="name"
                        placeholder="Escribe tu nombre"
                        type="text"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                        id="email"
                        placeholder="Escribe tu email"
                        type="email"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Asunto
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                    id="subject"
                    placeholder="Escribe el asunto"
                    type="text"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Mensaje
                </label>
                <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                    id="message"
                    rows="4"
                    placeholder="Escribe tu mensaje"
                ></textarea>
            </div>
            <div className="mt-6 flex justify-center">
                <ButtonPrimary className="w-full flex justify-center">Enviar</ButtonPrimary>
            </div>
        </form>
    );
}

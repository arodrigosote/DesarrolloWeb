import React from "react";
import './Service.css';
import foto1 from '../../../Assets/Images/oferta-educativa/1.webp';
import foto2 from '../../../Assets/Images/oferta-educativa/2.webp';
import foto3 from '../../../Assets/Images/oferta-educativa/3.webp';


export default function(){
    return(
        <div className="bg-primary">
            <div className="flex justify-center">
                <h1 className="text-white font-bold text-center my-12 text-4xl">Oferta Educativa</h1>
            </div>
            <div className="flex justify-around text-center">
                <div className="w-96 ml-44">
                    <img src={foto1} alt="" className="rounded-[80px]" />
                    <h2 className="font-bold text-white text-3xl mt-5">Curso</h2>
                    <p className="text-white text-xl mt-2">Programas y clases de vanguardia</p>
                </div>
                <div className="w-96">
                    <img src={foto2} alt="" className="rounded-[80px]" />
                    <h2 className="font-bold text-white text-3xl mt-5">Carrera</h2>
                    <p className="text-white text-xl mt-2">Vuélvete Técnico En Sistemas Digitales</p>
                </div>
                <div className="w-96 mr-44">
                <img src={foto3} alt="" className="rounded-[80px]" />
                    <h2 className="font-bold text-white text-3xl mt-5">Tutoriales</h2>
                    <p className="text-white text-xl mt-2">Videos Explicativos gratuitos</p>
                </div>
            </div>
        </div>
    )
}

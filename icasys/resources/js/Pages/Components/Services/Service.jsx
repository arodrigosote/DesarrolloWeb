import React from "react";
import './Service.css';
import foto1 from '../../../Assets/Images/oferta-educativa/1.webp';
import foto2 from '../../../Assets/Images/oferta-educativa/2.webp';
import foto3 from '../../../Assets/Images/oferta-educativa/3.webp';


export default function () {
    return (
        <div className="oferta text-center">
            <h2 className="font-bold text-center mb-2 text-white py-14 text-4xl">Oferta Educativa</h2>
            <div className="cajaOfertaEducativa mr-32 ml-32 pb-14">
                <div className="col-4 cajaOferta ml-5">
                    <a href="#">
                        <img src={foto1} className="imagenCuadrada" alt="icasys"/>
                        <h2 className="font-bold text-white text-3xl my-4"><strong>Cursos</strong></h2>
                        <p className="text-white text-xl mt-2">Programas y clases de vanguardia</p>
                    </a>
                </div>
                <div className="col-4 cajaOferta">
                    <a href="#">
                        <img src={foto2} className="imagenCuadrada" alt="icasys"/>
                        <h2 className="font-bold text-white text-3xl my-4"><strong>Carrera</strong></h2>
                        <p className="text-white text-xl mt-2">Vuélvete Técnico En Sistemas Digitales</p>
                    </a>
                </div>
                <div className="col-4 cajaOferta mr-5">
                    <a href="https://www.youtube.com/c/ICASYS">
                        <img src={foto3} className="imagenCuadrada" alt="icasys"/>
                        <h2 className="font-bold text-white text-3xl my-4"><strong>Tutoriales</strong></h2>
                        <p className="text-white text-xl mt-2">Videos Explicativos gratuitos</p>
                    </a>
                </div>
            </div>
        </div>
    )
}

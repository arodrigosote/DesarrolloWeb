import React, { useState } from "react"
import './Hero.css';


export default function () {
    return (
        <div className="hero imagen">
            <div className="whiteBackground">
                <div className="text-center">
                    <div className="content">
                        <h1 className="title">ICASYS</h1>
                        <p className="description">Somos un instituto de educación que busca proporcionar enseñanza de calidad a nuestros estudiantes en áreas como:</p>
                        <h3 className="offering"><strong>Ofimática, Programación, Diseño Gráfico, Diseño Web, Marketing e Inglés.</strong></h3>
                        <div className="mt-9">
                            <a href={route('courses')} className="button">Explorar Cursos</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

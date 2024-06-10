import React from "react";
import '../../../../css/app.css';
import './SocialMedia.css';

export default function () {
    return (
        <div className="pb-24">
            <h2 className="text-center font-bold text-primary text-4xl mt-14">Contácto</h2>
            <p className="text-center mb-14 text-auxiliar2">Estamos ubicados en Taxco de Alarcón, Guerrero, México.</p>
            <div className="flex justify-center boxs">
                <div className="text-center w-64 box">
                    <a href="https://facebook.com/icasys">
                        <div className="cajaImagenChica">
                            <box-icon type='logo' color='#3b5998' name='facebook-square' size='160px'></box-icon>
                        </div>
                        <h3 className="text-primary font-bold text-2xl">Facebook</h3>
                        <h4 className="text-auxiliar2 ">Ver posts</h4>
                    </a>
                </div>
                <div className="text-center w-64 box">
                    <a href="https://www.instagram.com/_icasys_/">
                        <div className="cajaImagenChica">
                            <box-icon name='instagram-alt' color='#bc2a8d' type='logo' size='160px'></box-icon>
                        </div>
                        <h3 className="text-primary font-bold text-2xl">Instagram</h3>
                        <h4 className="text-auxiliar2 ">Ver posts</h4>
                    </a>
                </div>
                <div className="text-center w-64 box">
                    <a href="https://www.youtube.com/c/ICASYS">
                        <div className="cajaImagenChica">
                            <box-icon name='youtube' color='#c4302b' type='logo' size='160px'></box-icon>
                        </div>
                        <h3 className="text-primary font-bold text-2xl">Youtube</h3>
                        <h4 className="text-auxiliar2 ">Ver videos</h4>
                    </a>
                </div>
                <div className="text-center w-64 box">
                    <a href="https://bit.ly/WhatsIcasys">
                        <div className="cajaImagenChica">
                            <box-icon name='whatsapp' color='#128c7e' type='logo' size='160px'></box-icon>
                        </div>
                        <h3 className="text-primary font-bold text-2xl">WhatsApp</h3>
                        <h4 className="text-auxiliar2 ">Mándanos mensaje</h4>
                    </a>
                </div>
                <div className="text-center w-64 box">
                    <a href="https://maps.app.goo.gl/oiYHntraR2tAJ2oa9">
                        <div className="cajaImagenChica">
                            <box-icon name='map' color='#4a80f5' type='solid' size='160px'></box-icon>
                        </div>
                        <h3 className="text-primary font-bold text-2xl">Maps</h3>
                        <h4 className="text-auxiliar2 ">¿Dónde estámos?</h4>
                    </a>
                </div>
            </div>
        </div>
    )
}

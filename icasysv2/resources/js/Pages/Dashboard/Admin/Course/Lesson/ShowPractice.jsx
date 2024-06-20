import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import LessonLayout from "@/Layouts/LessonLayout/LessonLayout";
import { BigPlayButton, ControlBar, LoadingSpinner, PlayToggle, Player, ReplayControl, VolumeMenuButton } from "video-react";
import 'video-react/dist/video-react.css'; // Importar el CSS directamente
import ButtonPrimary from "@/Components/ButtonPrimary";
import { RiEyeFill, RiEyeOffFill  } from "react-icons/ri";

const Lesson = ({ auth }) => {
    const { course, url, modules, lessons, lesson } = usePage().props;

    const [isSolutionShow, setSolution] = useState(true);
    const [btnText, setBtnText] = useState('Mostrar solución');

    const solutionToggle = () => {
        if(isSolutionShow){
            setBtnText("Ocultar solución")
        }else{
            setBtnText("Mostrar solución")
        }
        setSolution(!isSolutionShow);
    }

    // Función para manejar errores en la carga del video
    const handleVideoError = (error) => {
        console.error("Error cargando el video:", error);
        // Aquí podrías mostrar un mensaje de error al usuario
    };

    return (
        <>
            <ToastContainer></ToastContainer>
            <Head>
                <title>{course.title}</title>
            </Head>
            <LessonLayout auth={auth} title={`Ejercicio práctica: ${lesson.name}`} url={url} modules={modules} lessons={lessons} course={course}>

                <div className="">
                    <h2 className="text-primary text-xl mb-1">Planteamiento: </h2>
                    <p className="mb-3">{lesson.content}</p>
                    {/* <h2 className="text-primary text-xl mb-3">Enlace a recursos:</h2> */}
                </div>

                <h2 className="text-primary text-xl mb-1">Solución: </h2>
                <ButtonPrimary className="my-2" onClick={solutionToggle}>{isSolutionShow ? <RiEyeFill className="text-xl mr-2"></RiEyeFill> : <RiEyeOffFill className="text-xl mr-2"></RiEyeOffFill>} {btnText}</ButtonPrimary>
                <div className={`sm:w-full lg:w-auto ${isSolutionShow ? 'hidden' : 'block'}`}>

                    <Player
                        playsInline
                        // poster=""
                        src={`${url}storage/${lesson.video}`}
                        onError={handleVideoError} // Manejar errores en la carga del video
                    >
                        <BigPlayButton position="center" />
                        <LoadingSpinner />
                        <ControlBar autoHide={true}>
                            <PlayToggle />
                            <ReplayControl seconds={10} order={2.2} />
                            <VolumeMenuButton vertical />
                        </ControlBar>
                    </Player>


                </div>
            </LessonLayout>
        </>
    );
};

export default Lesson;

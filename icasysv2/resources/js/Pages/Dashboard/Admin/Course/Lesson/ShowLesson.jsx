import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import LessonLayout from "@/Layouts/LessonLayout/LessonLayout";
import { BigPlayButton, ControlBar, LoadingSpinner, PlayToggle, Player, ReplayControl, VolumeMenuButton } from "video-react";
import '../../../../../../../node_modules/video-react/dist/video-react.css'

const Lesson = ({ auth }) => {
    const { course, url, modules, lessons, lesson } = usePage().props
    return (
        <>
            <ToastContainer></ToastContainer>
            <Head>
                <title>{course.title}</title>
            </Head>
            <LessonLayout auth={auth} title={`Lección ${lesson.lesson_number}: ${lesson.name}`} url={url} modules={modules} lessons={lessons} course={course}>
                <div className="sm:w-full lg:w-auto">
                    <Player
                        playsInline
                        // poster=""
                        src={`${url}storage/${lesson.video}`}

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
                <div className="mt-6">
                    <h2 className="text-primary text-xl mb-1">Contenido</h2>
                    <p className="mb-3">{lesson.content}</p>
                    {/* <h2 className="text-primary text-xl mb-3">Enlace a recursos:</h2> */}
                </div>

            </LessonLayout>
        </>
    )
}

// Index.layout = page => <DashboardLayout children={page} ></DashboardLayout>

export default Lesson

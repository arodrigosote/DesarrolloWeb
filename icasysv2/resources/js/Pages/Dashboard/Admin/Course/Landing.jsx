import React, { useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import CourseCard from '@/Components/CourseCard';
import { Grid, Container, Accordion, AccordionSummary, Typography, AccordionDetails, MenuItem } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '@/Pages/Components/Header/Header';
import HeaderCallToAction from '@/Components/HeaderCallToAction';
import CourseHero from '@/Components/CourseHero';
import { CImage } from '@coreui/react';
import ButtonPrimary from '@/Components/ButtonPrimary';
import { RiArrowDownSFill, RiBarChartFill, RiTimeLine } from "react-icons/ri";
import Footer from '@/Pages/Components/Footer/Footer';


export default function Courses(auth) {
    const { course, modules, lessons, url, payed, pucharse } = usePage().props;

    const { data, setData, get, errors } = useForm({});

    const handleShowLessons = (course_id, course_slug) => {
        get(route('course.show.content', [course_id, course_slug]));
    }

    const handlePaymentCourse = (course_id, course_slug) => {
        get(route('course.cart', [course_id, course_slug]));
    }

    return (
        <>
            <Head>
                <title>{course.slug}</title>
            </Head>

            {/* <Header auth={auth}></Header> */}
            <HeaderCallToAction></HeaderCallToAction>
            <CourseHero course={course}></CourseHero>
            <div className='lg:flex block mx-4 md:mx-24 lg:mx-36 xl:mx-36 mt-12 mx-auto'>
                <div className='w-full lg:w-[65%]'>
                    <CImage rounded thumbnail src={`${url}storage/${course.image}`} width='100%' className='text-center mx-auto' alt={course.name} />
                    <h2 className='text-2xl mt-6 font-bold text-secondary'>Descripción</h2>
                    <p>{course.description}</p>

                    <h2 className='text-2xl mt-6 mb-2 font-bold text-secondary'>Contenido</h2>
                    {modules.map((module) => (
                        <Accordion key={module.id}>
                            <AccordionSummary
                                expandIcon={<RiArrowDownSFill />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography sx={{ width: '28%', flexShrink: 0 }}>
                                    {module.name}
                                </Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{module.short_description}</Typography>

                            </AccordionSummary>
                            <AccordionDetails sx={{ paddingBottom: 0, paddingTop: 0, flexShrink: 0 }}>
                                {lessons.map((lesson) => (
                                    lesson.module_id === module.id ? (
                                        <MenuItem key={lesson.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                                <CImage rounded className="mr-4" thumbnail src={`${url}storage/${lesson.image}`} width={100} height={100} alt={lesson.name} />
                                                {`${lesson.lesson_number}.   `}
                                                {lesson.name}
                                            </Typography>
                                        </MenuItem>
                                    ) : null
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))}

                    <h2 className='text-2xl mt-6 font-bold text-secondary'>Audiencia</h2>
                    <p>{course.target_audience}</p>
                </div>
                <div className='w-full lg:w-[35%] mt-6 md:mt-0'>
                    <div className=' lg:mx-12 lg:mb-12 border border-gray-300'>
                        <div className='bg-lighter p-7'>
                            <p className='font-bold text-2xl'>${course.price}</p>

                            {payed ? (
                                <ButtonPrimary className="h-[35%] w-full text-center flex justify-center">
                                    <Link href={route('lesson.show.updated', { course_id: course.id, course_name: course.slug })}>Acceder al curso</Link>
                                </ButtonPrimary>
                            ) : (
                                <ButtonPrimary onClick={(e) => { handlePaymentCourse(course.id, course.slug) }} className='w-full text-center flex justify-center'>Inscríbete</ButtonPrimary>
                            )}
                        </div>
                        <div className='p-7'>
                            <div className='flex justify-start items-center'><RiBarChartFill />{course.coursedifficulty.name}</div>
                            <div className='flex justify-start items-center'><RiTimeLine />{course.houres} horas de curso</div>
                        </div>
                    </div>
                    <div className=' lg:m-12 my-12 border border-gray-300'>
                        <div className='bg-lighter p-7'>
                            <p className='text-sm'>Un curso de:</p>
                            <p className='font-bold text-md'>{course.professor.name}</p>
                        </div>
                        <div className='p-7'>
                            <div className='mb-3'>
                                <h3 className='font-bold text-sm'>Materiales incluídos:</h3>
                                <p className='text-sm'>{course.files_includes}</p>
                            </div>
                            <div className='mb-3'>
                                <h3 className='font-bold text-sm'>Requisitos:</h3>
                                <p className='text-sm'>{course.requirements}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='my-12 md:my-32 text-center mx-4 md:mx-10 lg:mx-24 xl:mx-36'>
                <h2 className='font-bold text-primary text-2xl md:text-4xl lg:text-5xl mb-3'>Invierte en tu futuro, aprende habilidades de alto valor</h2>
                {payed ? (
                    <ButtonPrimary className="h-[35%]">
                        <Link href={route('lesson.show.updated', { course_id: course.id, course_name: course.slug })}>Acceder al curso</Link>
                    </ButtonPrimary>
                ) : (
                    <ButtonPrimary onClick={(e) => { handlePaymentCourse(course.id, course.slug) }} variant="contained">Inscríbete</ButtonPrimary>
                )}
            </div>
            {console.log(payed)}
            <Footer></Footer>
        </>
    )
}

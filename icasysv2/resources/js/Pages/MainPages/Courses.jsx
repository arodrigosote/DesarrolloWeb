import React from 'react';
import Header from '../Components/Header/Header';
import Hero from '../Components/Hero/Hero';
import Service from '../Components/Services/Service';
import SocialMedia from '../Components/SocialMedia/SocialMedia';
import { Head, usePage } from '@inertiajs/react';
import CourseCard from '@/Components/CourseCard';
import { Grid, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../Components/Footer/Footer';

export default function Courses(auth) {
    const { courses, url } = usePage().props;
    return (
        <>
            <Head>
                <title>Cursos</title>
            </Head>
            <Header auth={auth}></Header>
            <Container sx={{ paddingTop: '6rem' }}>
                <Grid container spacing={3} justifyContent="space-evenly">
                    {courses.map((course) => (
                        <Grid item key={course.id} xs={12} sm={6} md={4} lg={4} sx={{paddingTop:'0px'}}>
                            <CourseCard course={course} url={url}></CourseCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Footer></Footer>
        </>
    )
}

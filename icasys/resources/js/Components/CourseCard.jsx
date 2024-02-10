import React, { useState } from "react"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm, usePage } from "@inertiajs/react";
import ButtonPrimary from "./ButtonPrimary";
import { RiTimeLine, RiUser2Fill, RiUser2Line } from "react-icons/ri";
import Box from '@mui/system/Box';



export default function CourseCard({ course, url }) {
    // const { url, course } = usePage().props;

    const {data, setData, get, errors} = useForm({});

    const showCourse = (id, slug) => {
        get(route('course.landing', [id, slug]));
    }

    return (
        <>
            {/* {console.log(url)} */}
            <Card sx={{ maxWidth: 345, width:'100%' }}>
                <CardMedia
                    sx={{ height: 200 }}
                    image={`${url}storage/${course.image}`}
                    title={`${course.slug}`}
                />
                <CardContent>
                    <Typography variant="h5" fontWeight={600}>
                        {course.title}
                    </Typography>

                    <Box mt={1}>
                        <Box display="flex" alignItems="center">
                            <RiTimeLine />
                            <Typography sx={{ paddingLeft: '8px' }}>
                                {course.houres} hrs
                            </Typography>
                        </Box>

                        <Box display="flex" alignItems="center">
                            <RiUser2Line />
                            <Typography sx={{ paddingLeft: '8px'}} fontWeight={550}>
                                {course.professor.name}
                            </Typography>
                        </Box>
                    </Box>

                </CardContent>
                <CardActions sx={{ flexDirection: "row", justifyContent: "end", alignItems:'ceneter', paddingTop:'0'}}>
                    {/* <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button> */}
                    <ButtonPrimary className="mt-0" onClick={(e) => showCourse(course.id, course.slug)}>Ver más</ButtonPrimary>
                </CardActions>
            </Card>
        </>

    )
}

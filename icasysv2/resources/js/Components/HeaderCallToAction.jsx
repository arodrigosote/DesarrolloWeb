import { Box } from "@mui/material";
import '../../css/app.css';
import ButtonYellow from "./ButtonYellow";
import { Link, useForm, usePage } from "@inertiajs/react";
import ButtonPrimary from "./ButtonPrimary";

export default function HeaderCallToAction(){
    const { course, modules, lessons, url, payed } = usePage().props;
    const { data, setData, get, errors } = useForm({});
    const handlePaymentCourse = (course_id, course_slug) => {
        get(route('course.cart', [course_id, course_slug]));
    }
    return(
        <>
            <Box sx={{ backgroundColor: '#014ba0', color: 'white', py: 2, px: { xs: 4, md: 10, lg: 20 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p>Accede y aprende hoy mismo</p>
                {payed ? (
                    <ButtonYellow className="h-[35%]">
                        <Link href={route('lesson.show.updated', { course_id: course.id, course_name: course.slug })}>Acceder al curso</Link>
                    </ButtonYellow>
                ) : (
                    <ButtonYellow onClick={(e) => {handlePaymentCourse(course.id, course.slug)}} sx={{ my: 0 }}>Inscribirme</ButtonYellow>
                )}
            </Box>
        </>
    )
}

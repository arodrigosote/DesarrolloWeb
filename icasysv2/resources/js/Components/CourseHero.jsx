import { Avatar } from "@mui/material";
import { CImage } from "@coreui/react";
import icono from '../Assets/Images/azul.png';

export default function CourseHero({ course }) {
    return (
            <div className="bg-lighter text-center py-10 md:py-20">
                <CImage rounded thumbnail src={icono} className="mx-auto w-14 md:w-14 lg:w-14 xl:w-14" alt={course.name} />
                <h1 className="text-primary font-bold text-3xl md:text-5xl">{course.title}</h1>
                <p className="mt-2 md:mt-4 font-light text-gray-500">{course.short_description}</p>
            </div>
    );
}

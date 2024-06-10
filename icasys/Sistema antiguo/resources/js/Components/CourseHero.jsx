import { CImage } from "@coreui/react";
import { Avatar } from "@mui/material";
import icono from '../Assets/Images/azul.png';

export default function CourseHero({course}){
    return(
        <>
            <div className="bg-lighter text-center py-20">
                <Avatar alt="icasys logo" src={icono} className="w-1/6 mx-auto" />
                <h1 className="text-primary font-bold text-5xl">{course.title}</h1>
                <p className="mt-4 font-light text-gray-500 ">{course.short_description}</p>
            </div>
        </>
    )
}

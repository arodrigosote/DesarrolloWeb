import { Box } from "@mui/material";
import '../../css/app.css';
import ButtonYellow from "./ButtonYellow";

export default function HeaderCallToAction(){
    return(
        <>
            <div className="bg-primary text-white py-3 px-60 flex justify-between items-center">
                <p>Accede y aprende hoy mismo</p>
                <ButtonYellow className="my-0">Inscribirme</ButtonYellow>
            </div>
        </>
    )
}

import { CImage } from "@coreui/react";
import icono from '../Assets/Images/azul.png'

export default function ApplicationLogo(props) {
    return (
        <CImage rounded thumbnail src={icono} width={150} height={150} alt={`icasys logo blanco`} />
    );
}

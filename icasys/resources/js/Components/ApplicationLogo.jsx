import Avatar from '@mui/material/Avatar';
import logo from '../Assets/Images/azul.png'

export default function ApplicationLogo(props) {
    return (
        <Avatar alt="icasys logo" src={logo} sx={{ width: 150, height: 150 }}/>
    );
}

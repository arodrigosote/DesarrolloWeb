import { Link } from "@inertiajs/react";
import PrimaryButton from "../PrimaryButton";
import SecondaryButton from "../SecondaryButton";

export default function Header() {
    return (
        <header className="bg-slate-50 flex justify-end  items-center h-20 bg-blue-400">
            <Link className="h-10 mr-3" href={route('login')}>
                <PrimaryButton>Iniciar sesión</PrimaryButton>
            </Link>

            <Link href={route('register')} className="h-10 mr-3"><SecondaryButton >
                Registrarse
            </SecondaryButton></Link>
        </header>

    );
}

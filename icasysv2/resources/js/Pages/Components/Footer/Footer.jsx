export default function Footer() {
    return (
        <div className="flex my-24">
            <div className="w-[30%] text-center">
                © 2024
            </div>
            <div className="w-[60%]">
                <div className="flex justify-end">
                    <div className="w-[26%]">
                        <h2 className="font-bold">Contáctanos</h2>
                        <p className="text-sm text-gray-500">¡Nos encantaía saber de ti, escríbenos!</p>
                    </div>
                    <div className="w-[26%]">
                        <h2 className="font-bold">Páginas</h2>
                        <ul>
                            <li className="text-sm text-gray-500"><a href="">Términos y condiciones</a></li>
                            <li className="text-sm text-gray-500"><a href="">Política de privacidad</a></li>
                        </ul>
                    </div>
                    <div className="w-[26%]">
                        <h2 className="font-bold">ICASYS</h2>
                        <ul>
                            <li className="text-sm text-gray-500"><a href="">Inicio</a></li>
                            <li className="text-sm text-gray-500"><a href="">Cursos</a></li>
                            <li className="text-sm text-gray-500"><a href="">Acerca de</a></li>
                            <li className="text-sm text-gray-500"><a href="">Contacto</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

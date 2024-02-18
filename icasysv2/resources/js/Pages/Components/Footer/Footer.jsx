export default function Footer() {
    return (
        <div className="flex flex-wrap my-12 md:my-24">
            <div className="w-full md:w-1/3 text-end md:text-left mb-8 md:mb-0">
                <p className="text-center">© 2024</p>
            </div>
            <div className="w-full md:w-2/3 flex flex-wrap justify-center md:justify-end">
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 lg:py-0 text-center lg:text-left">
                    <h2 className="font-bold">Contáctanos</h2>
                    <p className="text-sm text-gray-500">¡Nos encantaría saber de ti, escríbenos!</p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 lg:py-0 text-center lg:text-left">
                    <h2 className="font-bold">Páginas</h2>
                    <ul>
                        <li className="text-sm text-gray-500"><a href="">Términos y condiciones</a></li>
                        <li className="text-sm text-gray-500"><a href="">Política de privacidad</a></li>
                    </ul>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 lg:py-0 text-center lg:text-left">
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
    )
}

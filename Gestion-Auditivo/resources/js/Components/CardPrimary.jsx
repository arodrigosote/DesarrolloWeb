import { Link } from "@inertiajs/react";

export default function CardPrimary({ title, text, icon, route }) {
    return (
        <Link href={route} className="bg-color1 w-64 text-white rounded-lg py-4 flex items-center hover:bg-opacity-70">
            <div className="ml-4 flex items-center justify-center h-12 w-12 text-3xl">
                {icon}
            </div>
            <div className="mx-5">
                <h3 className="text-gray-100 font-bold uppercase text-md">{title}</h3>
                <p className="mt-2 text-sm text-white">{text}</p>
            </div>
        </Link>

    )
}

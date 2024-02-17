import '../../css/app.css'

export default function SecondaryLink({ className = '',to, disabled, children, ...props }) {
    return (
        <a
            href={to}
            {...props}
            className={
                `inline-flex items-center mt-2 px-4 py-3 border border-transparent rounded-md font-semibold text-sm text-white uppercase bg-auxiliar2 hover:bg-blue-500 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
        >
            {children}
        </a>
    );
}

import '../../css/app.css'

export default function ButtonSecondary({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-sm text-white uppercase bg-color2 hover:bg-opacity-25 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

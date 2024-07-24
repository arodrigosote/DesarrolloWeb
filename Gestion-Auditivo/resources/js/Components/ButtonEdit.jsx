import '../../css/app.css'

export default function ButtonEdit({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center mx-auto px-4 py-2 border border-transparent rounded-md font-semibold text-sm text-white uppercase bg-green-600 hover:bg-green-400 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

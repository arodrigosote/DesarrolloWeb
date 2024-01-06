import '../../css/app.css'

export default function ButtonDelete({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center mt-2 px-2 py-2 border border-transparent rounded-md font-semibold text-sm text-white uppercase bg-red-600 hover:bg-red-400 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

import '../../css/app.css'

export default function ButtonPrimary({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center mt-2 px-4 py-3 border border-transparent rounded-md font-semibold text-sm text-white uppercase bg-primary hover:bg-blue-500 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

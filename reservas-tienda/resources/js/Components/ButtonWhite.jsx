import '../../css/app.css'

export default function ButtonWhite({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center mt-2 mx-3 px-3 py-3 bg-white border border-gray-300 rounded-md font-semibold text-xs text-primary uppercase shadow-sm hover:bg-gray-50 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

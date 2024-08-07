import '../../css/app.css'

export default function ButtonCancel({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-3 py-3 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase shadow-sm hover:bg-gray-50 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

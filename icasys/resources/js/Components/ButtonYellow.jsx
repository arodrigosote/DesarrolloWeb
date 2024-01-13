import '../../css/app.css'

export default function ButtonYellow({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center mt-2 px-3 py-3 bg-yellow border-yellow-400 rounded-md font-semibold text-xs text-white uppercase shadow-sm hover:bg-yellow-300  transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

import '../../css/app.css'

export default function ButtonInvisible({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center bg-transparent transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

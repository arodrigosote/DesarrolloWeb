import '../../css/app.css'

export default function ButtonSearch({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center  h-auto m-0 p-3 text-white uppercase bg-primary hover:bg-blue-500 transition-colors ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

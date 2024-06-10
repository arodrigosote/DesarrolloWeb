import { forwardRef, useEffect, useRef } from 'react';
import '../../css/TextInput.css'

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...props}
                type={type}
                className={
                    'border-gray-300 focus:border-primary rounded-md shadow-sm w-full my-2' +
                    className
                }
                ref={input}
            />
        </div>
    );
});

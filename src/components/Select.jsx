import { forwardRef, useId } from "react";

function Select({
    options,
    label,
    className="",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="">
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bh-white text-black outline-none focus:bg-gray-50 duration-300 border border-gray-200 w-full ${className}`}
                { ...props }
            >
                {options.length > 0 && (
                    options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >

                        </option>
                    ))
                )}
            </select>
        </div>
    );
};

export default forwardRef(Select);

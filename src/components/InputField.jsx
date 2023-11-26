import React from 'react';

const InputField = ({ label, name, value, placeholder, error, handleChange, disable, required }) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm text-left font-bold leading-6 text-gray-900 ml-[105px]">
                {label}{required && <p className='inline-block text-sm font-bold text-red-900'>*</p>}
            </label>
            <div className="mt-2">
                <input
                    type="text"
                    name={name}
                    id={name}
                    autoComplete="given-name"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    disabled={disable}
                    className={`w-2/3 rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ${error && 'ring-2 ring-inset ring-red-500' }` }
                />
            </div>
        </div>
    );
};

export default InputField;
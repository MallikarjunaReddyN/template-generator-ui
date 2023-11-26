import React from 'react';

const TextInput = ({label, disable, name, value, placeholder, error, handleChange }) => {

  
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm text-left font-bold mb-2">
        {label}
      </label> 
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-[425px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder={placeholder}
        disabled={disable}
      />
      {error && <span className="block text-left ml-[95px]">{error}</span>}
    </div>
  );
};

export default TextInput;
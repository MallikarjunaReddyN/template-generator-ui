import React from 'react';

const Dropdown = ({options, disable, label, name, value, error, handleChange}) => {

  return (
    <div className="mb-4">
    <label htmlFor={name} className="block text-sm text-left font-bold mb-2">
      {label}
    </label> 

    <select 
        id={name} 
        name={name} 
        value={value} 
        onChange={handleChange}
        disabled={disable}
        className="shadow appearance-none border rounded w-[425px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option selected value>-- select an option --</option>  
         {options.map((option) => (
           <option key={option.value} value={option.value}>
             {option.label}
           </option>
         ))}
    </select>
    {error && <span className="block text-left ml-[95px]">{error}</span>}
  </div>
  );
};

export default Dropdown;
import React from 'react';
import { Radio, Typography } from "@material-tailwind/react";

const RadioInput = ({label, name, value, options, handleChange, disable}) => {
    return (
        <div className="mb-3">
            <legend className="text-sm text-left font-bold leading-6 text-gray-900">{label}</legend>
            <div className="flex gap-10">
                {
                    options.map(option => (
                        <Radio key={option.label} name={name} label={<Typography className="font-bold">{option.label}</Typography>} value={value} color="indigo"  onChange={handleChange} defaultChecked={option.checked} disabled={disable} />
                    ))
                }
            </div>
        </div>
    );
};

export default React.memo(RadioInput);
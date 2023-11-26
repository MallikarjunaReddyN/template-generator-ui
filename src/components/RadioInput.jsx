import { Radio, Typography } from "@material-tailwind/react";

const RadioInput = ({label, name,  options, handleChange, disable}) => {
    return (
        <div className="mb-4">
            <legend className="text-sm text-left font-bold leading-6 text-gray-900 ml-[105px]">{label}</legend>
            <div className="flex gap-10 ml-[100px]">
                {
                    options.map(option => (
                        <Radio key={option.label} name={name} label={<Typography className="font-bold">{option.label}</Typography>} value={option.value} color="indigo"  onChange={handleChange} defaultChecked={option.checked} disabled={disable} />
                    ))
                }
            </div>
        </div>
    );
};

export default RadioInput;
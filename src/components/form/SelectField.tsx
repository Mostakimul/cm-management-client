import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface SelectFieldProps {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  register?: UseFormRegister<any>;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  onChange,
}) => {
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        className="select select-info w-full max-w-xs"
        onChange={(e) => onChange(e)}
        name={name}
      >
        <option value="" disabled selected>
          Select {label || 'option'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;

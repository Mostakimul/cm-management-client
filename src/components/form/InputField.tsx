import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  type: string;
  register: UseFormRegister<any>;
  placeholder: string;
  required: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  register,
  placeholder,
  required,
}) => {
  return (
    <label className="input input-bordered input-info flex items-center gap-2">
      <input
        {...register(label, { required })}
        type={type}
        className="grow placeholder-slate-700"
        placeholder={placeholder}
      />
    </label>
  );
};

export default InputField;

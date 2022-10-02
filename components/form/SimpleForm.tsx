interface InputProps {
  register?: any;
  label: string;
  value?: string;
  type: string;
  placeholder?: string;
  required: boolean;
  errors: any;
  icon: JSX.Element;
}

import { useState } from "react";
//icons
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconType } from "react-icons/lib";

const SimpleForm: React.FC<InputProps> = ({
  label,
  value,
  type,
  required,
  register,
  errors,
  placeholder,
  icon,
}) => {
  const [inputType, setInputType] = useState(type);

  const togglePassword = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className="w-full ">
      <label htmlFor={label} className="block text-sm text-gray-900">
        <label htmlFor={label}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </label>
      <div className="w-full relative">
        {icon}
        <input
          {...register}
          type={inputType}
          id={label}
          value={value}
          className={`border pl-8 border-gray-200 ${
            errors
              ? "focus:ring-red-500 focus:border-red-500 border-red-500"
              : "focus:ring-primary focus:border-primary"
          } text-gray-900 outline-none block  w-full text-md rounded-md mt-2 p-2`}
          placeholder={placeholder}
          autoComplete="off"
        />
        {type === "password" ? (
          <button type="button" onClick={togglePassword}>
            {inputType === "password" ? (
              <AiFillEyeInvisible className="w-4 h-4 text-gray-500 absolute top-3 right-4" />
            ) : (
              <AiFillEye
                className="w-4 h-4 text-gray-500 absolute top-3 right-4"
                onClick={togglePassword}
              />
            )}
          </button>
        ) : (
          ""
        )}
      </div>

      {errors && (
        <p className="block text-xs font-normal text-red-500 mt-2">{errors}</p>
      )}
    </div>
  );
};

export default SimpleForm;

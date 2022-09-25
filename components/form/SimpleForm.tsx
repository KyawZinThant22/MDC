interface InputProps {
  register?: any;
  label: string;
  value?: string;
  type: string;
  placeholder?: string;
  required: boolean;
  errors: any;
}

const SimpleForm: React.FC<InputProps> = ({
  label,
  value,
  type,
  required,
  register,
  errors,
  placeholder,
}) => {
  return (
    <div className="w-full ">
      <label htmlFor={label} className="block text-sm text-gray-900">
        <label htmlFor={label}>
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </label>
      <input
        {...register}
        type={type}
        id={label}
        value={value}
        className={`border border-gray-200 ${
          errors
            ? "focus:ring-red-500 focus:border-red-500 border-red-500"
            : "focus:ring-primary focus:border-primary"
        } text-gray-900 outline-none block  w-full text-md rounded-md mt-2 p-2`}
        placeholder={placeholder}
      />

      {errors && (
        <p className="block text-xs font-normal text-red-500 mt-2">{errors}</p>
      )}
    </div>
  );
};

export default SimpleForm;

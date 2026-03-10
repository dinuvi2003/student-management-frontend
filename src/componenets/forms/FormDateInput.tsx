import React from "react";

interface Props {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormDateInput = ({
  label,
  required,
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="date"
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
      />
    </div>
  );
};

export default FormDateInput;
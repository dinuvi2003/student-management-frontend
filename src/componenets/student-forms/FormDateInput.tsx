interface Props {
  label: string;
  required?: boolean;
  value?: string;
}

const FormDateInput = ({ label, required, value }: Props) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type="date"
        defaultValue={value}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
      />
    </div>
  );
};

export default FormDateInput;
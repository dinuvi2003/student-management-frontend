import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";

const AddStudentForm = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
      <form className="space-y-6">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            placeholder="Enter first name"
            required
          />
          <FormInput
            label="Last Name"
            placeholder="Enter last name"
            required
          />
        </div>

        {/* Email */}
        <FormInput
          label="Email"
          type="email"
          placeholder="student@school.edu"
          required
        />

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormDateInput label="Date of Birth" required />
          <FormDateInput label="Enrollment Date" required />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg 
                       font-medium hover:bg-blue-700 transition"
          >
            Add Student
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddStudentForm;
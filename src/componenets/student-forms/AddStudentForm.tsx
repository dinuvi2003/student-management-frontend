import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";
import API from "../../services/api";

const AddStudentForm = () => {
  const navigate = useNavigate();

  const[formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    enrollmentDate: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/api/students", formData);
      alert("Student created successfully");
      navigate("/students");
    } catch(error) {
      console.error("Error creating student", error);
      alert("Failed to create student");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            placeholder="Enter first name"
            required
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <FormInput
            label="Last Name"
            placeholder="Enter last name"
            required
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        {/* Email */}
        <FormInput
          label="Email"
          type="email"
          placeholder="student@school.edu"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        {/* Bith date & Enrollment date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormDateInput
           label="Date of Birth" 
           required 
           value={formData.dateOfBirth}
           onChange={(e) => handleChange("dateOfBirth", e.target.value)}
          />
          <FormDateInput 
           label="Enrollment Date" 
           required 
           value={formData.enrollmentDate}
           onChange={(e) => handleChange("enrollmentDate", e.target.value)}
          />
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
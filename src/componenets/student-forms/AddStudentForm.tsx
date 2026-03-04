import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";
import API from "../../services/api";
import axios from "axios";

const AddStudentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    enrollmentDate: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    enrollmentDate: "",
  });

  const validate = () => {
    let valid = true;

    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      enrollmentDate: "",
    };

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First Name
    if (formData.firstName && !nameRegex.test(formData.firstName)) {
      newErrors.firstName = "First name must contain letters only";
      valid = false;
    }

    // Last Name
    if (formData.lastName && !nameRegex.test(formData.lastName)) {
      newErrors.lastName = "Last name must contain letters only";
      valid = false;
    }

    // Email
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    // Date of Birth
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      dob.setHours(0, 0, 0, 0);

      if (dob > today) {
        newErrors.dateOfBirth = "Date of birth cannot be in the future";
        valid = false;
      }
    }

    // Enrollment Date → cannot be future (today allowed)
    if (formData.enrollmentDate) {
      const enrollment = new Date(formData.enrollmentDate);
      enrollment.setHours(0, 0, 0, 0);

      if (enrollment > today) {
        newErrors.enrollmentDate = "Enrollment date cannot be in the future";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when typing
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await API.post("/api/students", formData);
      alert("Student created successfully");
      navigate("/students");
    } catch (error: unknown) {
      console.error("Error creating student", error);

      if(axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;

        //duplicate email
        if(backendMessage === "Email already exists") {
          setErrors((prev) => ({
            ...prev,
            email: "Email already exists",
          }));
          return;
        }
      }
      

      alert("Something went wrong. Please try again");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormInput
              label="First Name"
              placeholder="Enter first name"
              required
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName}
              </p>
            )}
          </div>

          <div>
            <FormInput
              label="Last Name"
              placeholder="Enter last name"
              required
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <FormInput
            label="Email"
            type="email"
            placeholder="student@school.edu"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormDateInput
              label="Date of Birth"
              required
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm mt-1">
                {errors.dateOfBirth}
              </p>
            )}
          </div>

          <div>
            <FormDateInput
              label="Enrollment Date"
              required
              value={formData.enrollmentDate}
              onChange={(e) =>
                handleChange("enrollmentDate", e.target.value)
              }
            />
            {errors.enrollmentDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.enrollmentDate}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
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
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateStudentForm = () => {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);

  // Fetch student on mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await API.get(`/api/students/${id}`);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          dateOfBirth: response.data.dateOfBirth,
          enrollmentDate: response.data.enrollmentDate,
        });
      } catch {
        alert("Student not found or access denied");
        navigate("/students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id, navigate]);

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
        newErrors.dateOfBirth =
          "Date of birth cannot be in the future";
        valid = false;
      }
    }

    // Enrollment Date
    if (formData.enrollmentDate) {
      const enrollment = new Date(formData.enrollmentDate);
      enrollment.setHours(0, 0, 0, 0);

      if (enrollment > today) {
        newErrors.enrollmentDate =
          "Enrollment date cannot be in the future";
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

    // Clear error while typing
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await API.put(`/api/students/${id}`, formData);
      toast.success("Student updated successfully!");
      navigate("/students");
    } catch(error: unknown) {
      console.log("Error updating student", error);

      if(axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;

        if(backendMessage === "Email already exists") {
          setErrors((prev) => ({
            ...prev,
            email: "Email already exists",
          }));
        }
        return;
      }

      toast.error("Something went wrong. Please try again");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormInput
              label="First Name"
              required
              value={formData.firstName}
              onChange={(e) =>
                handleChange("firstName", e.target.value)
              }
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
              required
              value={formData.lastName}
              onChange={(e) =>
                handleChange("lastName", e.target.value)
              }
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
            required
            value={formData.email}
            onChange={(e) =>
              handleChange("email", e.target.value)
            }
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
              onChange={(e) =>
                handleChange("dateOfBirth", e.target.value)
              }
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
            Update Student
          </button>
        </div>

      </form>
    </div>
  );
};

export default UpdateStudentForm;
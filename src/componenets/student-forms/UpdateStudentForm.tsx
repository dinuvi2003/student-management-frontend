import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";

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

  const [loading, setLoading] = useState(true);

  // 🔹 Fetch student on mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await API.get(`/api/students/${id}`);
        //setFormData(response.data);
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

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.put(`/api/students/${id}`, formData);
      alert("Student updated successfully!");
      navigate("/students");
    } catch {
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="First Name"
            required
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <FormInput
            label="Last Name"
            required
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        <FormInput
          label="Email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import API from "../../services/api";
import toast from "react-hot-toast";

interface Props {
  courseId: string;
}

const UpdateCourseForm = ({ courseId }: Props) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {

    API.get(`/api/courses/${courseId}`)
      .then((response) => {
        setFormData({
          name: response.data.name,
          description: response.data.description
        });
      })
      .catch((error) => {
        console.error("Error fetching course:", error);
        toast.error("Failed to load course");
      });

  }, [courseId]);

  const validate = () => {

    let valid = true;

    const newErrors = {
      name: "",
      description: ""
    };

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleChange = (field: string, value: string) => {

    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: ""
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!validate()) return;

    try {

      await API.put(`/api/courses/${courseId}`, formData);

      toast.success("Course updated successfully");

      navigate("/courses");

    } catch (error) {

      console.error("Error updating course:", error);

      toast.error("Failed to update course");
    }
  };

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full">

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Course Name */}
        <div>
          <FormInput
            label="Course Name"
            placeholder="Enter course name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>

          <textarea
            value={formData.description}
            placeholder="Enter course description"
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-500 transition"
            rows={6}
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Update Course
          </button>
        </div>

      </form>

    </div>
  );
};

export default UpdateCourseForm;
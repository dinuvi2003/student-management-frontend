import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../componenets/layout/DashboardLayout";
import AddStudentForm from "../componenets/forms/AddCourseForm";

const AddCourse = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-8">

        {/* Header with Back */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/courses")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Add Course
            </h1>
            <p className="text-gray-500 mt-1">
              Fill in the details to create a new course
            </p>
          </div>
        </div>

        <AddStudentForm />
      </div>
    </DashboardLayout>
  );
};

export default AddCourse;
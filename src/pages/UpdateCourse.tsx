import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../componenets/layout/DashboardLayout";
import UpdateCourseForm from "../componenets/forms/UpdateForm";

const UpdateCourse = () => {

  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/courses")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Update Course
            </h1>
            <p className="text-gray-500 mt-1">
              Modify the course details below
            </p>
          </div>
        </div>

        <UpdateCourseForm courseId={id!} />

      </div>
    </DashboardLayout>
  );
};

export default UpdateCourse;
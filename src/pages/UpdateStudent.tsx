import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../componenets/layout/DashboardLayout";
import UpdateStudentForm from "../componenets/student-forms/UpdateStudentForm";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="p-8">

        {/* Header with Back */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/students")}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={22} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Update Student
            </h1>
            <p className="text-gray-500 mt-1">
              Modify the student details below
            </p>
          </div>
        </div>

        <UpdateStudentForm studentId={id!} />
      </div>
    </DashboardLayout>
  );
};

export default UpdateStudent;
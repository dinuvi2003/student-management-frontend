import { useNavigate } from "react-router-dom";
import DashboardLayout from "../componenets/layout/DashboardLayout";
import StudentTable from "../componenets/students/StudentTable";

const Students = () => {

  const navigate = useNavigate();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Students</h2>
          <p className="text-gray-500">8 students found</p>
        </div>

        <button 
          onClick={() => navigate("/add-student")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + Add Student
        </button>
      </div>

      <StudentTable />
    </DashboardLayout>
  );
};

export default Students;
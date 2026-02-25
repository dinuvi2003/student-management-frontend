import DashboardLayout from "../componenets/layout/DashBoardLayout";
import StudentTable from "../componenets/students/StudentTable";

const Students = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Students</h2>
          <p className="text-gray-500">8 students found</p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          + Add Student
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, ID, or email..."
          className="w-96 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <StudentTable />
    </DashboardLayout>
  );
};

export default Students;
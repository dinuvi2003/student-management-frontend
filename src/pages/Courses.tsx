import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../componenets/layout/DashboardLayout";
import CourseTable from "../componenets/lists/CourseTable";
import API from "../services/api";

const Courses = () => {

  const navigate = useNavigate();
  const [totalCourses, setTotalCourses] = useState(0);

  useEffect(() => {
    API.get("/api/courses")
      .then((res) => {
        setTotalCourses(res.data.length);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
      });
  }, []);

  return (
    <DashboardLayout>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
          <p className="text-gray-500">{totalCourses} courses found</p>
        </div>

        <button
          onClick={() => navigate("/add-course")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          + Add Course
        </button>

      </div>

      <CourseTable />

    </DashboardLayout>
  );
};

export default Courses;
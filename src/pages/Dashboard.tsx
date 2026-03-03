import DashboardLayout from "../componenets/layout/DashboardLayout";
import StatCard from "../componenets/dashboard/StatCard";
import { Users, UserPlus, CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../services/api";
import type { Student } from "../types/Student";

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    API.get("/api/students")
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, []);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const enrolledThisYear = students.filter((student) => {
    const date = new Date(student.enrollmentDate);
    return date.getFullYear() === currentYear;
  }).length;

  const enrolledThisMonth = students.filter((student) => {
    const date = new Date(student.enrollmentDate);
    return (
      date.getFullYear() === currentYear &&
      date.getMonth() === currentMonth
    );
  }).length;

  const uniqueYears = new Set(
    students.map((student) =>
      new Date(student.enrollmentDate).getFullYear()
    )
  ).size;

  const totalStudents = students.length;

  return (
    <DashboardLayout>
      <div className="p-8">

      {/* Welcome Panel */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Welcome to Student Management System 👋
          </h1>
          <p className="text-blue-100">
            Manage student records, track enrollments, and monitor academic trends all in one place.
          </p>
        </div>

      {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <StatCard
            title="Total Students"
            value={totalStudents.toString()}
            icon={<Users className="text-blue-500" size={28} />}
          />

          <StatCard
            title="Enrollment Years"
            value={uniqueYears.toString()}
            icon={<CalendarDays className="text-orange-500" size={28} />}
          />

          <StatCard
            title="Enrolled This Year"
            value={enrolledThisYear.toString()}
            icon={<UserPlus className="text-green-500" size={28} />}
          />

          <StatCard
            title="Enrolled This Month"
            value={enrolledThisMonth.toString()}
            icon={<UserPlus className="text-purple-500" size={28} />}
          />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
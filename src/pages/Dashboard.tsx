import DashboardLayout from "../componenets/layout/DashboardLayout";
import StatCard from "../componenets/dashboard/StatCard";
import { Users, UserPlus, CalendarDays, BookOpen, BarChart2 } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../services/api";

interface DashboardStats {
  totalStudents: number;
  enrollmentYears: number;
  enrolledThisYear: number;
  enrolledThisMonth: number;
  totalCourses: number;
  mostEnrolledCourse: string;
}

const Dashboard = () => {

  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    enrollmentYears: 0,
    enrolledThisYear: 0,
    enrolledThisMonth: 0,
    totalCourses: 0,
    mostEnrolledCourse: ""
  });

  useEffect(() => {
    API.get("/api/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
      });
  }, []);

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
            value={stats.totalStudents.toString()}
            icon={<Users className="text-blue-500" size={28} />}
          />

          <StatCard
            title="Enrollment Years"
            value={stats.enrollmentYears.toString()}
            icon={<CalendarDays className="text-orange-500" size={28} />}
          />

          <StatCard
            title="Enrolled This Year"
            value={stats.enrolledThisYear.toString()}
            icon={<UserPlus className="text-green-500" size={28} />}
          />

          <StatCard
            title="Enrolled This Month"
            value={stats.enrolledThisMonth.toString()}
            icon={<UserPlus className="text-purple-500" size={28} />}
          />

          <StatCard
            title="Total Courses"
            value={stats.totalCourses.toString()}
            icon={<BookOpen className="text-indigo-500" size={28} />}
          />

          <StatCard
            title="Most Enrolled Course"
            value={<span className="text-sm">{stats.mostEnrolledCourse || "-"}</span>}
            icon={<BarChart2 className="text-red-500" size={28} />}
          />

        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
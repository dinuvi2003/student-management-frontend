import DashboardLayout from "../componenets/layout/DashboardLayout";
import StatCard from "../componenets/dashboard/StatCard";
import RecentEnrollments from "../componenets/dashboard/RecentEnrollments";
import StudentsByYear from "../componenets/dashboard/StudentsByYear";
import { Users, UserPlus, CalendarDays } from "lucide-react";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">
              University student overview
            </p>
          </div>

          
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Students"
            value="8"
            icon={<Users className="text-blue-500" size={28} />}
          />
          <StatCard
            title="Enrolled This Year"
            value="0"
            icon={<UserPlus className="text-green-500" size={28} />}
          />
          <StatCard
            title="Enrollment Years"
            value="4"
            icon={<CalendarDays className="text-orange-500" size={28} />}
          />
        </div>

        {/* Simple Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentEnrollments />
          <StudentsByYear />
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
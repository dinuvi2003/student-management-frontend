const students = [
  { name: "Aarav Sharma", date: "2023-01-15" },
  { name: "Priya Patel", date: "2022-06-10" },
  { name: "Rohan Kumar", date: "2022-01-15" },
];

const RecentEnrollments = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Recent Enrollments
      </h3>

      <div className="space-y-4">
        {students.map((student, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3 last:border-none"
          >
            <div>
              <p className="font-medium text-gray-800">
                {student.name}
              </p>
              <p className="text-sm text-gray-500">
                Enrolled on {student.date}
              </p>
            </div>

            <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              New
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEnrollments;
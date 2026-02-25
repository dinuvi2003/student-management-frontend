import StudentRow from "./StudentRow";

const dummyStudents = [
  {
    id: "STU001",
    name: "Aarav Sharma",
    email: "aarav.sharma@school.edu",
    dob: "2008-03-12",
    enrollmentDate: "2022-01-15",
  },
  {
    id: "STU002",
    name: "Priya Patel",
    email: "priya.patel@school.edu",
    dob: "2007-07-22",
    enrollmentDate: "2021-06-10",
  },
  {
    id: "STU003",
    name: "Rohan Kumar",
    email: "rohan.kumar@school.edu",
    dob: "2008-11-05",
    enrollmentDate: "2022-01-15",
  },
];

const StudentTable = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 font-semibold">ID</th>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Email</th>
            <th className="px-6 py-4 font-semibold">Date of Birth</th>
            <th className="px-6 py-4 font-semibold">Enrollment Date</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 text-sm">
          {dummyStudents.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default StudentTable;
interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  enrollmentDate: string;
}

interface Props {
  students: Student[];
  onRemoveStudent: (studentId: number) => void;
}

const CourseStudentsTable = ({ students, onRemoveStudent }: Props) => {
  return (
    <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-100">
        Students Enrolled
      </h3>
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Full Name</th>
            <th className="px-6 py-3">Enrollment Date</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((student) => (
            <tr key={student.studentId}>
              <td className="px-6 py-4 text-gray-600">{student.studentId}</td>
              <td className="px-6 py-4 text-gray-800">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-6 py-4 text-gray-800">{student.enrollmentDate}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onRemoveStudent(student.studentId)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseStudentsTable;
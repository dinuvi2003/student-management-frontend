interface Course {
  courseId: number;
  courseName: string;
  enrollmentDate: string;
}

interface Props {
  courses: Course[];
}

const StudentCoursesTable = ({ courses }: Props) => {
  return (
    <div className="bg-white shadow rounded-xl p-6">

      <h2 className="text-lg font-semibold mb-4">
        Enrolled Courses
      </h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">No courses enrolled</p>
      ) : (

        <table className="w-full text-left">

          <thead className="text-sm text-gray-500">
            <tr>
              <th className="py-2">Course ID</th>
              <th className="py-2">Course Name</th>
              <th className="px-6 py-3">Enrollment Date</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.courseId} className="border-t">

                <td className="py-2">{course.courseId}</td>

                <td className="py-2">{course.courseName}</td>

                <td className="py-2">{course.enrollmentDate}</td>

              </tr>
            ))}
          </tbody>

        </table>

      )}

    </div>
  );
};

export default StudentCoursesTable;
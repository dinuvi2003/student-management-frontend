import { useEffect, useState } from "react";
import API from "../services/api";
import CourseHeader from "./CourseHeader";
import CourseStudentsTable from "./CourseStudentsTable";

interface Student {
  studentId: number;
  firstName: string;
  lastName: string;
  enrollmentDate: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
}

interface Props {
  courseId: string;
}

const CourseDetailsContent = ({ courseId }: Props) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    API.get(`/api/courses/${courseId}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error("Error fetching course:", err));

    API.get(`/api/courses/${courseId}/students`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, [courseId]);

  const handleRemoveStudent = (studentId: number) => {
    API.delete(`/api/enrollments?studentId=${studentId}&courseId=${courseId}`, { data: { studentId, courseId } })
      .then(() => {
        setStudents(students.filter((s) => s.studentId !== studentId));
      })
      .catch((err) => console.error("Error removing student:", err));
  };

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <CourseHeader courseName={course.name} />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{course.description}</p>
      </div>

      <CourseStudentsTable students={students} onRemoveStudent={handleRemoveStudent} />
    </div>
  );
};

export default CourseDetailsContent;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import StudentHeader from "./StudentHeader";
import StudentInfoCard from "./StudentInfoCard";
import StudentCoursesTable from "./StudentCoursesTable";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  enrollmentDate: string;
}

interface Course {
  courseId: number;
  courseName: string;
  enrollmentDate: string;
}

const StudentDetailsContent = () => {

  const { id } = useParams();
  
  const [student, setStudent] = useState<Student | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {

    API.get(`/api/students/${id}`)
      .then((res) => setStudent(res.data))
      .catch((err) => console.error(err));

    API.get(`/api/students/${id}/courses`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));

  }, [id]);

  if (!student) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      
      <StudentHeader
        firstName={student.firstName}
        lastName={student.lastName}
      />

      <StudentInfoCard
        email={student.email}
        dateOfBirth={student.dateOfBirth}
        enrollmentDate={student.enrollmentDate}
      />

      <StudentCoursesTable courses={courses} />

    </div>
  );
};

export default StudentDetailsContent;
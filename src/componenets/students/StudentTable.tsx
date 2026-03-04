import { useState, useEffect } from "react";
import StudentRow from "./StudentRow";
import API from "../../services/api";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  enrollmentDate: string;
}

const StudentTable = () => {

  const[students, setStudents] = useState<Student[]>([]);
  const[id, setId] = useState<string | null>(null);
  const[isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    API.get("/api/students")
    .then((response) => {
      setStudents(response.data);
    })
    .catch((error) => {
      console.log("Error fetching students: ", error);
    });
  }, []);

  const confirmDelete = (selectedId: string) => {
    setId(selectedId);
    setIsModalOpen(true);
  }

  const handleDelete = async () => {

    if(!id) return;

    try {
      await API.delete(`/api/students/${id}`);

      // Remove from UI without refreshing
      setStudents((prev) =>
        prev.filter((student) => student.id.toString() !== id)
      );

      toast.success("Student deleted successfully")
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student");
    } finally {
      setIsModalOpen(false);
      setId(null);
    }
  };

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
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={{
                id: student.id.toString(),
                name: `${student.firstName} ${student.lastName}`,
                email: student.email,
                dob: student.dateOfBirth,
                enrollmentDate: student.enrollmentDate
              }}
              onDelete={confirmDelete}
            />
          ))}
        </tbody>

      </table>

      <ConfirmModal 
        isOpen={isModalOpen}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone"
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />

    </div>
  );
};

export default StudentTable;
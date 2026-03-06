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
  const[page, setPage] = useState(0);
  const[size] = useState(10);
  const[hasNext, setHasNext] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const url = keyword
      ? `/api/students/search?keyword=${keyword}&page=${page}&size=${size}`
      : `/api/students?page=${page}&size=${size}`;

    API.get(url)
      .then((response) => {
        setStudents(response.data);
        setHasNext(response.data.length === size);
      })
      .catch((error) => {
        console.log("Error fetching students: ", error);
    });

  }, [page, keyword]);

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

  const nextPage = () => {
    if (hasNext) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      <div className="p-4 border-b border-gray-100">
        <input
          type="text"
          placeholder="Search students by name or email..."
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setPage(0); // reset to first page
          }}
          className="w-full md:w-80 px-4 py-2 border rounded-lg outline-none focus:outline-none"
        />
      </div>

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

      <div className="flex justify-between items-center px-6 py-4">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page + 1}
        </span>

        <button
          onClick={nextPage}
          disabled={!hasNext}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

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
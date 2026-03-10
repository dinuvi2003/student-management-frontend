import { useState, useEffect } from "react";
import CourseRow from "./CourseRow";
import API from "../../services/api";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

interface Course {
  id: number;
  name: string;
  description: string;
}

const CourseTable = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [hasNext, setHasNext] = useState(false);

  // Fetch courses with pagination
  useEffect(() => {
    API.get(`/api/courses?page=${page}&size=${size}`)
      .then((response) => {
        setCourses(response.data);
        setHasNext(response.data.length === size); // check if next page exists
      })
      .catch((error) => {
        console.log("Error fetching courses:", error);
      });
  }, [page]);

  const confirmDelete = (selectedId: string) => {
    setId(selectedId);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      await API.delete(`/api/courses/${id}`);
      setCourses((prev) => prev.filter((course) => course.id.toString() !== id));
      toast.success("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
      toast.error("Failed to delete course");
    } finally {
      setIsModalOpen(false);
      setId(null);
    }
  };

  const nextPage = () => {
    if (hasNext) setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      {/* Table */}
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
          <tr>
            <th className="px-6 py-4 font-semibold">ID</th>
            <th className="px-6 py-4 font-semibold">Course Name</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {courses.map((course) => (
            <CourseRow
              key={course.id}
              course={{
                id: course.id.toString(),
                name: course.name,
                description: course.description,
              }}
              onDelete={confirmDelete}
            />
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center px-6 py-4">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">Page {page + 1}</span>

        <button
          onClick={nextPage}
          disabled={!hasNext}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Delete Course"
        message="Are you sure you want to delete this course?"
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CourseTable;
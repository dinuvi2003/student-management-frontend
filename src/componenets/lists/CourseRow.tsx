import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  course: {
    id: string;
    name: string;
    description: string;
  };
  onDelete: (id: string) => void;
}

const CourseRow = ({ course, onDelete }: Props) => {

  const navigate = useNavigate();

  return (
    <tr className="hover:bg-gray-50 transition">

      <td className="px-6 py-4 text-sm text-gray-500">
        {course.id}
      </td>

      <td className="px-6 py-4 font-medium text-gray-800">
        {course.name}
      </td>

      <td className="px-6 py-4 text-gray-600">
        {course.description}
      </td>

      <td className="px-6 py-4 text-right">

        <div className="flex justify-end space-x-3">

          {/* View Icon */}
          <button
            onClick={() => navigate(`/courses/${course.id}/view`)}
            className="p-2 rounded-lg text-blue-500 hover:text-blue-600 hover:bg-blue-50 transition"
          >
            <Eye size={18} />
          </button>

          {/* Edit */}
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="p-2 rounded-lg text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 transition"
          >
            <Pencil size={18} />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(course.id)}
            className="p-2 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-50 transition"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default CourseRow;
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  courseName: string;
}

const CourseHeader = ({ courseName }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => navigate("/courses")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h2 className="text-2xl font-bold text-gray-800">{courseName}</h2>
      <div /> 
    </div>
  );
};

export default CourseHeader;
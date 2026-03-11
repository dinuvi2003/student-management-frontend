import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  firstName: string;
  lastName: string;
}

const StudentHeader = ({ firstName, lastName }: Props) => {

  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4 mb-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/students")}
        className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Student Name */}
      <h1 className="text-2xl font-bold text-gray-800">
        {firstName} {lastName}
      </h1>

    </div>
  );
};

export default StudentHeader;
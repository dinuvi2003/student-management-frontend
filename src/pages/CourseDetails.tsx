import { useParams } from "react-router-dom";
import DashboardLayout from "../componenets/layout/DashboardLayout";
import CourseDetailsContent from "../singleDetailsPages/CourseDetails";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Invalid course ID</p>;

  return (
    <DashboardLayout>
      <CourseDetailsContent courseId={id} />
    </DashboardLayout>
  );
};

export default CourseDetails;
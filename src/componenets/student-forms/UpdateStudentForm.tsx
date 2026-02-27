import FormInput from "./FormInput";
import FormDateInput from "./FormDateInput";

interface Props {
  studentId?: string;
}

const dummyStudents = [
  {
    id: "STU001",
    firstName: "Aarav",
    lastName: "Sharma",
    email: "aarav.sharma@school.edu",
    dob: "2008-03-12",
    enrollmentDate: "2022-01-15",
  },
  {
    id: "STU002",
    firstName: "Priya",
    lastName: "Patel",
    email: "priya.patel@school.edu",
    dob: "2007-07-22",
    enrollmentDate: "2021-06-10",
  },
];

const UpdateStudentForm = ({ studentId }: Props) => {

  const student = dummyStudents.find(
    (s) => s.id === studentId
  );

  if (!student) {
    return <p>Student not found</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 max-w-4xl">
      <form className="space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label="First Name" required value={student.firstName} />
          <FormInput label="Last Name" required value={student.lastName} />
        </div>

        <FormInput
          label="Email"
          type="email"
          required
          value={student.email}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormDateInput label="Date of Birth" required value={student.dob} />
          <FormDateInput
            label="Enrollment Date"
            required
            value={student.enrollmentDate}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg 
                       font-medium hover:bg-blue-700 transition"
          >
            Update Student
          </button>
        </div>

      </form>
    </div>
  );
};

export default UpdateStudentForm;
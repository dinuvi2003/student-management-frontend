interface Props {
  email: string;
  dateOfBirth: string;
  enrollmentDate: string;
}

const StudentInfoCard = ({ email, dateOfBirth, enrollmentDate }: Props) => {
  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">

      <h2 className="text-lg font-semibold mb-4">
        Student Information
      </h2>

      <div className="space-y-3 text-gray-700">

        <p>
          <span className="font-medium">Email:</span> {email}
        </p>

        <p>
          <span className="font-medium">Date of Birth:</span> {dateOfBirth}
        </p>

        <p>
          <span className="font-medium">Enrollment Date:</span> {enrollmentDate}
        </p>

      </div>

    </div>
  );
};

export default StudentInfoCard;
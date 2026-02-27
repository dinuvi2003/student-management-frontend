const data = [
  { year: "2020", count: 1 },
  { year: "2021", count: 3 },
  { year: "2022", count: 3 },
  { year: "2023", count: 1 },
];

const StudentsByYear = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Students by Enrollment Year
      </h3>

      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <div
            key={item.year}
            className="bg-gray-50 rounded-lg p-4 flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">
              {item.year}
            </span>

            <span className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsByYear;
interface Props {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: Props) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 
                    p-6 flex justify-between items-center shadow-sm">
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <h2 className="text-3xl font-semibold text-gray-800">
          {value}
        </h2>
      </div>

      <div>{icon}</div>
    </div>
  );
};

export default StatCard;
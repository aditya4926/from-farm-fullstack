function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-green-700 mt-2">
        {value}
      </p>
    </div>
  );
}

export default StatCard;
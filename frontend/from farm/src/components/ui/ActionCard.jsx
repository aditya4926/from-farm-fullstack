import { Link } from "react-router-dom";

function ActionCard({ to, title, icon }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition block"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800">
        {title}
      </h3>
    </Link>
  );
}

export default ActionCard;
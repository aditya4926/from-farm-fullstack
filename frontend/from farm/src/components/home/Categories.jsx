import { Link } from "react-router-dom";

function Categories() {
  const categories = [
    {
      name: "Fruits",
      icon: "🍎",
      color: "bg-red-100",
    },
    {
      name: "Vegetables",
      icon: "🥬",
      color: "bg-green-100",
    },
    {
      name: "Grains",
      icon: "🌾",
      color: "bg-yellow-100",
    },
    {
      name: "Dairy",
      icon: "🥛",
      color: "bg-blue-100",
    },
    {
      name: "Spices",
      icon: "🌶️",
      color: "bg-orange-100",
    },
    {
      name: "Organic",
      icon: "🌱",
      color: "bg-emerald-100",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        🛒 Shop By Category
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/products?category=${cat.name}`}
            className={`${cat.color} rounded-2xl p-6 text-center hover:scale-105 transition duration-300 shadow`}
          >
            <div className="text-5xl">{cat.icon}</div>

            <h3 className="mt-4 font-bold text-lg">
              {cat.name}
            </h3>
          </Link>
        ))}

      </div>

    </section>
  );
}

export default Categories;
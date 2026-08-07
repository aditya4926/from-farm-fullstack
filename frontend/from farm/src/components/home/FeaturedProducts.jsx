import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");

      setProducts(data.slice(0, 6));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">

      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">
          Featured Products 🌾
        </h2>

        <Link
          to="/products"
          className="text-green-600 font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {products.map((product) => (

          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition"
          >

            <img
              src={
                product.image ||
                "https://via.placeholder.com/400x250"
              }
              alt={product.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-5">

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>

              <h3 className="text-2xl font-bold mt-4">
                {product.title}
              </h3>

              <p className="text-green-600 font-bold text-xl mt-2">
                ₹{product.price}/{product.unit}
              </p>

              <p className="text-gray-500 mt-3 line-clamp-2">
                {product.description}
              </p>

              <Link
                to={`/product/${product._id}`}
                className="block bg-green-600 text-center text-white py-3 rounded-xl mt-5 hover:bg-green-700"
              >
                View Details
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;
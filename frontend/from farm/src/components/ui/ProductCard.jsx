import { Link } from "react-router-dom";

function ProductCard({ product, onWishlist, children }) {
  return (
    <div className="w-full bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition">
      <div className="relative">
        <img
          src={
            product.image ||
            "https://dummyimage.com/400x300/eeeeee/000000&text=No+Image"
          }
          alt={product.title}
          className="w-full h-44 object-cover"
        />

        <span className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
          {product.category}
        </span>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800">
          {product.title}
        </h2>

        <p className="text-green-700 font-bold text-xl mt-2">
          ₹{product.price}/{product.unit}
        </p>

        <p className="text-gray-500 mt-1">
          Stock: {product.quantity} {product.unit}
        </p>

        <p className="text-yellow-500 mt-2">
          ⭐ {product.averageRating?.toFixed(1) || "0.0"}
        </p>

        <div className="border-t mt-4 pt-4 text-sm text-gray-600">
          <p>👨‍🌾 {product.farmerId?.name}</p>
          <p>📍 {product.farmerId?.village}, {product.farmerId?.taluka}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <Link
            to={`/product/${product._id}`}
            className="bg-green-600 text-white py-2 rounded-xl text-center hover:bg-green-700"
          >
            View
          </Link>

          {onWishlist && (
            <button
              onClick={() => onWishlist(product._id)}
              className="bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600"
            >
              ❤️ Save
            </button>
          )}
        </div>

        {children}
      </div>
    </div>
  );
}

export default ProductCard;
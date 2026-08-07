import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function NearbyProducts() {
  const [products, setProducts] = useState([]);
  const [distance, setDistance] = useState(25);

  const findNearbyProducts = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const { data } = await api.get(
          `/products/nearby?latitude=${lat}&longitude=${lng}&distance=${distance}`
        );

        setProducts(data);
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Nearby Farmers Products 📍
      </h1>

      <div className="flex gap-3 mb-6">
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="border p-3 rounded"
        >
          <option value="5">Within 5 km</option>
          <option value="10">Within 10 km</option>
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
        </select>

        <button
          onClick={findNearbyProducts}
          className="bg-green-600 text-white px-5 py-3 rounded"
        >
          📍 Find Nearby Products
        </button>
      </div>

      {products.length === 0 ? (
        <p>No nearby products found</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow"
            >
              <img
                src={
                  product.image ||
                  "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"
                }
                alt={product.title}
                className="w-full h-48 object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-3">
                {product.title}
              </h2>

              <p className="text-green-600 font-bold">
                ₹{product.price}/{product.unit}
              </p>

              <p>
                Farmer: {product.farmerId?.name}
              </p>

              <p>
                📍 {product.farmerId?.village},{" "}
                {product.farmerId?.taluka}
              </p>

              <p className="font-bold text-blue-600">
                Distance: {product.distance} km
              </p>

              <Link
                to={`/product/${product._id}`}
                className="block text-center bg-green-600 text-white py-2 rounded mt-4"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NearbyProducts;
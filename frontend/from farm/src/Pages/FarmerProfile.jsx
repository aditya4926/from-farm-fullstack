import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";
import ProductCard from "../components/ui/ProductCard";

function FarmerProfile() {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchFarmer();
  }, []);

  const fetchFarmer = async () => {
    const { data } = await api.get(`/auth/farmer/${id}`);
    setFarmer(data.farmer);
    setProducts(data.products);
  };

  if (!farmer) return <h2 className="p-8">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8 mb-8">
        <div className="flex flex-wrap items-center gap-6">
          <img
            src={farmer.photo || "https://dummyimage.com/150x150/eeeeee/000000&text=Farmer"}
            alt={farmer.name}
            className="w-32 h-32 rounded-full object-cover"
          />

          <div>
            <h1 className="text-4xl font-bold text-green-700">
              {farmer.name} 👨‍🌾
            </h1>
            <p>📞 {farmer.mobile}</p>
            <p>📍 {farmer.village}, {farmer.taluka}, {farmer.district}</p>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/chat/${farmer._id}`}
                className="bg-purple-600 text-white px-5 py-3 rounded-xl"
              >
                💬 Chat
              </Link>

              <a
                href={`tel:${farmer.mobile}`}
                className="bg-green-600 text-white px-5 py-3 rounded-xl"
              >
                📞 Call
              </a>

              {farmer.location?.latitude && farmer.location?.longitude && (
                <a
                  href={`https://www.google.com/maps?q=${farmer.location.latitude},${farmer.location.longitude}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-blue-600 text-white px-5 py-3 rounded-xl"
                >
                  📍 Location
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <h2 className="max-w-6xl mx-auto text-3xl font-bold mb-6">
        Products by {farmer.name}
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default FarmerProfile;
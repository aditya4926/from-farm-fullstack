import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  const submitReview = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await api.post(
        `/products/${id}/review`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Added");

      fetchProduct();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  if (!product) {
    return <h2 className="p-8">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <img
            src={
              product.image ||
              "https://dummyimage.com/700x500/eeeeee/000000&text=No+Image"
            }
            alt={product.title}
            className="w-full h-[460px] object-cover"
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
            {product.category}
          </span>

          <h1 className="text-5xl font-bold text-gray-800 mt-5">
            {product.title}
          </h1>

          <p className="text-green-700 text-3xl font-bold mt-4">
            ₹{product.price}/{product.unit}
          </p>

          <p className="mt-3 text-gray-600">
            Stock: {product.quantity} {product.unit}
          </p>

          <p className="mt-4 text-gray-700 leading-7">
            {product.description}
          </p>

          <div className="mt-8 border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">
              Farmer Details 👨‍🌾
            </h2>

            <div className="bg-green-50 rounded-2xl p-5">
              <p className="font-semibold text-lg">
                <Link
                  to={`/farmer/${product.farmerId?._id}`}
                  className="text-green-700 font-bold hover:underline"
                >
                  {product.farmerId?.name}
                </Link>
              </p>
              <p className="text-gray-600">
                📞 {product.farmerId?.mobile}
              </p>
              <p className="text-gray-600">
                📍 {product.farmerId?.village}, {product.farmerId?.taluka}, {product.farmerId?.district}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                to={`/chat/${product.farmerId?._id}`}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl"
              >
                💬 Chat
              </Link>

              <a
                href={`tel:${product.farmerId?.mobile}`}
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
              >
                📞 Call
              </a>

              <a
                href={`https://wa.me/91${product.farmerId?.mobile}`}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl"
              >
                WhatsApp
              </a>

              {product.farmerId?.location?.latitude &&
                product.farmerId?.location?.longitude && (
                  <a
                    href={`https://www.google.com/maps?q=${product.farmerId.location.latitude},${product.farmerId.location.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
                  >
                    📍 Location
                  </a>
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6">
            Reviews ⭐
          </h2>

          {product?.reviews?.length === 0 ? (
            <p className="text-gray-500">
              No reviews yet
            </p>
          ) : (
            product?.reviews?.map((review) => (
              <div
                key={review._id}
                className="border-b py-4"
              >
                <h3 className="font-bold">
                  {review.name}
                </h3>

                <p className="text-yellow-500">
                  ⭐ {review.rating}/5
                </p>

                <p className="text-gray-600">
                  {review.comment}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6">
            Add Review ✍️
          </h2>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border border-gray-300 p-3 rounded-xl w-full mb-4"
          >
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="5">5 ⭐</option>
          </select>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="border border-gray-300 p-4 rounded-xl w-full h-32"
          />

          <button
            onClick={submitReview}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl mt-4 w-full"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
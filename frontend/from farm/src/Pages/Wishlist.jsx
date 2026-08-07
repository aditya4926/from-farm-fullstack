import { useEffect, useState } from "react";
import api from "../api/axios";

function Wishlist() {
const [wishlist, setWishlist] = useState([]);

useEffect(() => {
fetchWishlist();
}, []);

const fetchWishlist = async () => {
try {
const token = localStorage.getItem("token");


  const { data } = await api.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("WISHLIST =", data);

  setWishlist(data);
} catch (error) {
  console.log(error);
}


};

const removeWishlist = async (id) => {
try {
const token = localStorage.getItem("token");


  await api.delete(`/wishlist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  fetchWishlist();
} catch (error) {
  console.log(error);
}


};

return ( <div className="p-8"> <h1 className="text-3xl font-bold mb-6">
My Wishlist ❤️ </h1>


  {wishlist.length === 0 ? (
    <p>No products in wishlist</p>
  ) : (
    <div className="grid md:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg p-4 shadow"
        >
          <img
            src={
              item.productId?.image ||
              "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"
            }
            alt={item.productId?.title}
            className="w-full h-48 object-cover rounded"
          />

          <h2 className="text-xl font-bold mt-3">
            {item.productId?.title}
          </h2>

          <p>
            ₹{item.productId?.price}
          </p>

          <button
            onClick={() =>
              removeWishlist(item._id)
            }
            className="bg-red-500 text-white px-4 py-2 rounded mt-3"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )}
</div>


);
}

export default Wishlist;

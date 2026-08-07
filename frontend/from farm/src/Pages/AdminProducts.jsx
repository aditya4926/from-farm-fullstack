import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");

    const { data } = await api.get(
      "/admin/products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProducts(data);
  };

  const deleteProduct = async (id) => {
    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    const token = localStorage.getItem("token");

    await api.delete(
      `/admin/products/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchProducts();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        All Products 🌾
      </h1>

      {products.map((product) => (
        <div
          key={product._id}
          className="border p-4 rounded mb-4"
        >
          <h2 className="font-bold text-xl">
            {product.title}
          </h2>

          <p>
            Farmer:
            {" "}
            {product.farmerId?.name}
          </p>

          <p>
            Mobile:
            {" "}
            {product.farmerId?.mobile}
          </p>

          <p>
            Price: ₹{product.price}
          </p>

          <p>
            Quantity:
            {" "}
            {product.quantity}
          </p>

          <button
            onClick={() =>
              deleteProduct(
                product._id
              )
            }
            className="bg-red-600 text-white px-4 py-2 rounded mt-3"
          >
            🗑 Delete Product
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;
import { useState } from "react";
import api from "../api/axios";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    quantity: "",
    unit: "Kg",
    description: "",
  });
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      let imageUrl = "";

      if (image) {
        const imageData = new FormData();

        imageData.append("image", image);

        const uploadRes = await api.post(
          "/products/upload",
          imageData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      await api.post(
        "/products",
        {
          ...formData,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Added Successfully");

      setFormData({
        title: "",
        category: "",
        price: "",
        quantity: "",
        unit: "Kg",
        description: "",
      });

      setImage(null);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Add Product 🌾
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option>Kg</option>
          <option>Quintal</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
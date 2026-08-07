import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
function MyProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/products/my-products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteHandler = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert("Product Deleted");

            fetchProducts();
        } catch (error) {
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-green-600 mb-6">
                My Products 🌾
            </h1>

            <table className="w-full border">
                <thead>
                    <tr className="bg-green-100">
                        <th className="p-3 border">Image</th>
                        <th className="p-3 border">Name</th>
                        <th className="p-3 border">Category</th>
                        <th className="p-3 border">Price</th>
                        <th className="p-3 border">Quantity</th>
                        <th className="p-3 border">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>

                            <td className="border p-3">
                                <img
                                    src={product.image || "https://via.placeholder.com/80"}
                                    alt={product.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            </td>

                            <td className="border p-3">
                                {product.title}
                            </td>

                            <td className="border p-3">
                                {product.category}
                            </td>

                            <td className="border p-3">
                                ₹{product.price}
                            </td>

                            <td className="border p-3">
                                {product.quantity} {product.unit}
                            </td>

                            <td className="border p-3">
                                <Link
                                    to={`/edit-product/${product._id}`}
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteHandler(product._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyProducts;

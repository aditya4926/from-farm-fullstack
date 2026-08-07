import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [orderQty, setOrderQty] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("COD");
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products");
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };
    const placeOrder = async (product) => {
        try {
            const token = localStorage.getItem("token");

            const quantity = Number(
                orderQty[product._id]
            );

            const amount =
                quantity * product.price;

            const { data } = await api.post(
                "/orders/create-payment-order",
                {
                    amount,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const options = {
                key:
                    "rzp_test_Sz4oYF1zVO8L2J",

                amount: data.amount,

                currency: "INR",

                name: "From Farm",

                description:
                    "Product Purchase",

                order_id: data.id,

                handler: async function (
                    response
                ) {
                    await api.post(
                        "/orders",
                        {
                            productId: product._id,
                            quantity,
                            paymentMethod: "ONLINE",
                            paymentStatus: "Paid",
                            razorpayOrderId:
                                response.razorpay_order_id,

                            razorpayPaymentId:
                                response.razorpay_payment_id,

                            paymentStatus: "Paid",
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    alert(
                        "Payment Successful & Order Placed"
                    );
                },
            };

            const razor =
                new window.Razorpay(options);

            razor.open();
        } catch (error) {
            console.log(error);
        }


    };
    const placeCODOrder = async (product) => {
        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/orders",
                {
                    productId: product._id,
                    quantity: Number(orderQty[product._id]),
                    paymentMethod: "COD",
                    paymentStatus: "Pending",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("COD Order Placed Successfully");

        } catch (error) {
            console.log(error);
        }
    };


    const filteredProducts = products.filter((product) => {
        const matchSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory =
            category === "All" ||
            product.category === category;

        return matchSearch && matchCategory;
        if (Number(qty) > product.quantity) {
            return alert(
                `Only ${product.quantity} ${product.unit} available`
            );
        }
    });
    const addToWishlist = async (
        productId
    ) => {

        try {

            const token =
                localStorage.getItem("token");

            await api.post(
                "/wishlist",
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(
                "Added to Wishlist ❤️"
            );

        } catch (error) {

            alert(
                error.response?.data?.message
            );

        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-green-600 mb-6">
                All Products 🌾
            </h1>

            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search Product..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-3 rounded w-full"
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-3 rounded"
                >
                    <option value="All">All</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Grains">Grains</option>
                </select>

            </div>
            
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onWishlist={addToWishlist}
                        >
                            <div className="mt-4">
                                <label className="block">
                                    <input
                                        type="radio"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    />
                                    {" "}Cash On Delivery
                                </label>

                                <label className="block mt-2">
                                    <input
                                        type="radio"
                                        value="ONLINE"
                                        checked={paymentMethod === "ONLINE"}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    />
                                    {" "}Online Payment
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter Quantity"
                                    value={orderQty[product._id] || ""}
                                    onChange={(e) =>
                                        setOrderQty({
                                            ...orderQty,
                                            [product._id]: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded-xl w-full mt-3"
                                />

                                <button
                                    onClick={() => {
                                        if (paymentMethod === "ONLINE") {
                                            placeOrder(product);
                                        } else {
                                            placeCODOrder(product);
                                        }
                                    }}
                                    className="bg-green-600 text-white w-full py-3 rounded-xl mt-3"
                                >
                                    Place Order
                                </button>
                            </div>
                        </ProductCard>
                    ))}
                </div>
            </div>
        
    );
}

export default AllProducts;
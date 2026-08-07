import { useEffect, useState } from "react";
import api from "../api/axios";

function MyOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/orders/my-orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };
    const steps = ["Pending", "Accepted", "Packed", "Shipped", "Delivered"];

    const getStepActive = (status, step) => {
        return steps.indexOf(status) >= steps.indexOf(step);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-green-700 mb-8">
                    My Orders 📦
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
                        <p className="text-gray-500 text-xl">No orders yet</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white rounded-3xl shadow-xl p-6 mb-6 hover:shadow-2xl transition"
                        >
                            <div className="flex justify-between flex-wrap gap-4 border-b pb-4 mb-5">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {order.productId?.title}
                                    </h2>
                                    <p className="text-gray-500">
                                        Ordered on {new Date(order.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-700">
                                        ₹{order.totalAmount}
                                    </p>
                                    <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
                                        {order.paymentStatus || "Pending"}
                                    </span>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2 text-gray-700">
                                    <p>👨‍🌾 Farmer: {order.farmerId?.name}</p>
                                    <p>📞 Mobile: {order.farmerId?.mobile}</p>
                                    <p>📦 Quantity: {order.quantity}</p>
                                    <p>💰 Price: ₹{order.productId?.price}</p>
                                    <p>
                                        Status:{" "}
                                        <span className="font-bold text-green-700">
                                            {order.status}
                                        </span>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-800 mb-4">
                                        Order Tracking
                                    </h3>

                                    <div className="space-y-3">
                                        {steps.map((step) => (
                                            <div key={step} className="flex items-center gap-3">
                                                <div
                                                    className={
                                                        getStepActive(order.status, step)
                                                            ? "w-5 h-5 bg-green-600 rounded-full"
                                                            : "w-5 h-5 bg-gray-300 rounded-full"
                                                    }
                                                ></div>

                                                <span
                                                    className={
                                                        getStepActive(order.status, step)
                                                            ? "font-semibold text-green-700"
                                                            : "text-gray-400"
                                                    }
                                                >
                                                    {step}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <a
                                href={`https://from-farm.onrender.com/api/orders/invoice/${order._id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-block bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl mt-6"
                            >
                                📄 Download Invoice PDF
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyOrders;
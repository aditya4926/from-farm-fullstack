import { useEffect, useState } from "react";
import api from "../api/axios";

function FarmerOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const token = localStorage.getItem("token");

        const { data } = await api.get(
            "/orders/farmer",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );


        setOrders(data);
    };
    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem("token");

            await api.put(
                `/orders/${id}`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchOrders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">
                Farmer Orders 📦
            </h1>

            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border p-4 rounded mb-4"
                >
                    <h2>
                        Product:
                        {" "}
                        {order.productId?.title}
                    </h2>

                    <p>
                        Customer:
                        {" "}
                        {order.customerId?.name}
                    </p>

                    <p>
                        Mobile:
                        {" "}
                        {order.customerId?.mobile}
                    </p>

                    <p>
                        Quantity:
                        {" "}
                        {order.quantity}
                    </p>
                    <p className="text-green-600 font-bold">
                        Total Amount: ₹{order.totalAmount}
                    </p>
                    <p>
                        Status:
                        {" "}
                        {order.status}
                    </p>
                    <p>
                        Ordered On:
                        {" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                    <p>
                        Status:
                        <span
                            className={
                                order.status === "Accepted"
                                    ? "text-green-600 font-bold"
                                    : order.status === "Rejected"
                                        ? "text-red-600 font-bold"
                                        : "text-yellow-600 font-bold"
                            }
                        >
                            {" "}
                            {order.status}
                        </span>
                    </p>
                    <p>
                        <strong>Payment:</strong>
                        <span
                            className={
                                order.paymentStatus === "Paid"
                                    ? "text-green-600 font-bold"
                                    : "text-red-600 font-bold"
                            }
                        >
                            {" "}
                            {order.paymentStatus || "Pending"}
                        </span>
                    </p>

                    <div className="mt-3">
                        {order.status === "Pending" && (
                            <>
                                <button
                                    onClick={() => updateStatus(order._id, "Accepted")}
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Accept
                                </button>

                                <button
                                    onClick={() => updateStatus(order._id, "Rejected")}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </>
                        )}

                        {order.status === "Accepted" && (
                            <button
                                onClick={() => updateStatus(order._id, "Packed")}
                                className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                                Mark as Packed
                            </button>
                        )}

                        {order.status === "Packed" && (
                            <button
                                onClick={() => updateStatus(order._id, "Shipped")}
                                className="bg-purple-500 text-white px-3 py-1 rounded"
                            >
                                Mark as Shipped
                            </button>
                        )}

                        {order.status === "Shipped" && (
                            <button
                                onClick={() => updateStatus(order._id, "Delivered")}
                                className="bg-green-700 text-white px-3 py-1 rounded"
                            >
                                Mark as Delivered
                            </button>
                        )}

                        {order.status === "Delivered" && (
                            <p className="text-green-700 font-bold mt-2">
                                ✅ Order Delivered
                            </p>
                        )}

                        {order.status === "Rejected" && (
                            <p className="text-red-600 font-bold mt-2">
                                ❌ Order Rejected
                            </p>
                        )}
                    </div>
                   
                </div>
            ))}

        </div>
    );
}

export default FarmerOrders;
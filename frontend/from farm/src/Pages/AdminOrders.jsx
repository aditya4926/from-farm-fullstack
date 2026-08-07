import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");

    const { data } = await api.get("/admin/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Admin Orders 📦
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-3xl shadow-xl p-6 mb-5"
        >
          <div className="flex justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold">
                {order.productId?.title}
              </h2>

              <p>Customer: {order.customerId?.name}</p>
              <p>Customer Mobile: {order.customerId?.mobile}</p>
              <p>Farmer: {order.farmerId?.name}</p>
              <p>Farmer Mobile: {order.farmerId?.mobile}</p>
              <p>Quantity: {order.quantity}</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-green-700">
                ₹{order.totalAmount}
              </p>

              <p>Status: {order.status}</p>
              <p>Payment: {order.paymentStatus}</p>
              <p>
                Ordered On:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

function AdminDashboard() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/admin/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStats(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-8">
                Admin Dashboard 👨‍💼
            </h1>

            <div className="flex flex-wrap gap-4 mb-8">

                <Link
                    to="/admin-users"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    👥 Manage Users
                </Link>

                <Link
                    to="/admin-products"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    🌾 Manage Products
                </Link>

                <Link
                    to="/admin-orders"
                    className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                    📦 Manage Orders
                </Link>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-blue-100 p-6 rounded">
                    <h2>Total Users</h2>
                    <p className="text-3xl font-bold">
                        {stats.totalUsers}
                    </p>
                </div>

                <div className="bg-green-100 p-6 rounded">
                    <h2>Total Farmers</h2>
                    <p className="text-3xl font-bold">
                        {stats.totalFarmers}
                    </p>
                </div>

                <div className="bg-yellow-100 p-6 rounded">
                    <h2>Total Customers</h2>
                    <p className="text-3xl font-bold">
                        {stats.totalCustomers}
                    </p>
                </div>

                <div className="bg-purple-100 p-6 rounded">
                    <h2>Total Products</h2>
                    <p className="text-3xl font-bold">
                        {stats.totalProducts}
                    </p>
                </div>

                <div className="bg-red-100 p-6 rounded">
                    <h2>Total Orders</h2>
                    <p className="text-3xl font-bold">
                        {stats.totalOrders}
                    </p>
                </div>

                <div className="bg-orange-100 p-6 rounded">
                    <h2>Total Revenue</h2>
                    <p className="text-3xl font-bold">
                        ₹{stats.totalRevenue}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;
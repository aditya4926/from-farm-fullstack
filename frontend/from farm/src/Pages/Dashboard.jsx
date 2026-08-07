import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Page from "../components/ui/Page";
import StatCard from "../components/ui/StatCard";
import ActionCard from "../components/ui/ActionCard";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";

function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const [revenue, setRevenue] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const fetchRevenue = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/orders/revenue",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRevenue(data.totalRevenue);
        } catch (error) {
            console.log(error);
        }
    };
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeProducts: 0,
        outOfStock: 0,
    });
    const [orderStats, setOrderStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        acceptedOrders: 0,
        rejectedOrders: 0,
    });
    useEffect(() => {
        fetchStats();
        fetchOrderStats();
        fetchRevenue();
        fetchNotificationCount();
        fetchMonthlyRevenue();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/products/dashboard/stats",
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
    const fetchOrderStats = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/orders/stats",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setOrderStats(data);
        } catch (error) {
            console.log(error);
        }
    };
    const logoutHandler = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/");
    };
    const fetchNotificationCount = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get(
                "/notifications/count",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setNotificationCount(data.count);
        } catch (error) {
            console.log(error);
        }
    };
    const fetchMonthlyRevenue = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await api.get("/orders/monthly-revenue", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMonthlyRevenue(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Page>
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                <h1 className="text-4xl font-bold text-green-700">
                    Welcome {user?.name} 🌾
                </h1>
                <p className="text-gray-500 mt-2">
                    Mobile: {user?.mobile} | Role: {user?.role}
                </p>
            </div>

            {user?.role === "farmer" && (
                <>
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <ActionCard to="/add-product" icon="➕" title="Add Product" />
                        <ActionCard to="/my-products" icon="📦" title="My Products" />
                        <ActionCard to="/farmer-orders" icon="🚚" title="Farmer Orders" />
                        <ActionCard to="/my-chats" icon="💬" title="My Chats" />
                    </div>
                
                    <div className="grid md:grid-cols-4 gap-6">
                        <StatCard title="Total Products" value={stats.totalProducts} icon="📦" />
                        <StatCard title="Active Products" value={stats.activeProducts} icon="🌾" />
                        <StatCard title="Out Of Stock" value={stats.outOfStock} icon="⚠️" />
                        <StatCard title="Total Orders" value={orderStats.totalOrders} icon="📋" />
                        <StatCard title="Pending" value={orderStats.pendingOrders} icon="⏳" />
                        <StatCard title="Accepted" value={orderStats.acceptedOrders} icon="✅" />
                        <StatCard title="Rejected" value={orderStats.rejectedOrders} icon="❌" />
                        <StatCard title="Revenue" value={`₹${revenue}`} icon="💰" />
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl p-6 mt-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Monthly Revenue 📊
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyRevenue}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}

            {user?.role === "customer" && (
                <div className="grid md:grid-cols-4 gap-6">
                    <ActionCard to="/products" icon="🛒" title="Marketplace" />
                    <ActionCard to="/my-orders" icon="📦" title="My Orders" />
                    <ActionCard to="/wishlist" icon="❤️" title="Wishlist" />
                    <ActionCard to="/my-chats" icon="💬" title="My Chats" />
                    <ActionCard to="/nearby-products" icon="📍" title="Nearby Farmers" />
                    <ActionCard to="/nearby-map" icon="🗺️" title="Farmers Map" />
                </div>
            )}

            {user?.role === "admin" && (
                <div className="grid md:grid-cols-3 gap-6">
                    <ActionCard to="/admin-dashboard" icon="👨‍💼" title="Admin Dashboard" />
                    <ActionCard to="/admin-users" icon="👥" title="Manage Users" />
                    <ActionCard to="/admin-products" icon="🌾" title="Manage Products" />
                </div>
            )}
        </Page>
    );
}

export default Dashboard;
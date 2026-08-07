import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobile: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
            alert("Login Successful");

            navigate("/dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6">

            <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}
                <div className="bg-green-700 text-white p-12 flex flex-col justify-center">

                    <h1 className="text-5xl font-bold mb-6">
                        From Farm 🌾
                    </h1>

                    <p className="text-xl mb-6">
                        Farmer ↔ Customer Direct Marketplace
                    </p>

                    <p className="text-green-100 leading-8">
                        Buy fresh products directly from farmers.
                        No middlemen, better prices, and quality produce.
                    </p>

                    <div className="mt-10 text-7xl">
                        🚜🌾🥭🍅
                    </div>

                </div>

                {/* Right Side */}
                <div className="p-12 flex items-center">

                    <div className="w-full">

                        <h2 className="text-4xl font-bold text-gray-800 mb-2">
                            Welcome Back 👋
                        </h2>

                        <p className="text-gray-500 mb-8">
                            Login to continue
                        </p>

                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="mobile"
                                placeholder="Mobile Number"
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />

                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-semibold transition"
                            >
                                Login
                            </button>

                        </form>

                        <p className="text-center mt-6 text-gray-600">
                            New User?{" "}
                            <Link
                                to="/register"
                                className="text-green-600 font-semibold"
                            >
                                Register
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
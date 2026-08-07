import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    role: "",
    village: "",
    taluka: "",
    district: "",
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
      const { data } = await api.post(
        "/auth/register",
        formData
      );

      console.log(data);

      alert("Registration Successful");

      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        <div className="bg-green-700 text-white p-12 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">
            Join From Farm 🌾
          </h1>

          <p className="text-xl mb-6">
            Create your farmer or customer account
          </p>

          <p className="text-green-100 leading-8">
            Farmers can sell products directly, and customers can buy fresh produce without middlemen.
          </p>

          <div className="mt-10 text-7xl">
            🚜🌾🥭🍅
          </div>
        </div>

        <div className="p-10 flex items-center">
          <div className="w-full">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Create Account ✨
            </h2>

            <p className="text-gray-500 mb-6">
              Register to start using From Farm
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="mobile"
                placeholder="Mobile Number"
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="village"
                placeholder="Village"
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="taluka"
                placeholder="Taluka"
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="text"
                name="district"
                placeholder="District"
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Role</option>
                <option value="farmer">Farmer</option>
                <option value="customer">Customer</option>
              </select>

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="md:col-span-2 border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                type="submit"
                className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-semibold transition"
              >
                Register
              </button>
            </form>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-green-600 font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
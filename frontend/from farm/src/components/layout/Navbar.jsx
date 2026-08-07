import { Link, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaShoppingCart,
  FaUserCircle,
  FaHeart,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

function Navbar() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-md">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <FaLeaf className="text-green-600 text-3xl" />

          <span className="text-2xl font-bold text-green-700">
            From Farm
          </span>
        </Link>


        {/* Desktop Menu */}

        <div className="hidden md:flex gap-8 font-medium text-gray-700">

          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          {token && user?.role === "customer" && (
            <>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/my-orders">Orders</Link>
            </>
          )}

          {token && user?.role === "farmer" && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/farmer-orders">Orders</Link>
            </>
          )}

          {token && user?.role === "admin" && (
            <>
              <Link to="/admin-dashboard">Admin</Link>
            </>
          )}

        </div>
         {/* Right Side */}

      <div className="hidden md:flex items-center gap-5">

        {!token ? (
          <>
            <Link
              to="/login"
              className="text-green-700 font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.role === "customer" && (
              <>
                <Link to="/wishlist">
                  <FaHeart className="text-xl hover:text-red-500" />
                </Link>

                <Link to="/my-orders">
                  <FaShoppingCart className="text-xl hover:text-green-600" />
                </Link>
              </>
            )}

            <Link to="/profile">
              <FaUserCircle className="text-3xl text-green-600" />
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </>
        )}

      </div>

        {/* Mobile */}

        <button
          className="md:hidden"
          onClick={() => setMenu(!menu)}
        >
          <FaBars size={24} />
        </button>

      </div>

      {menu && (
        <div className="md:hidden bg-white border-t">

          <Link className="block px-6 py-4" to="/">
            Home
          </Link>

          <Link className="block px-6 py-4" to="/products">
            Products
          </Link>

          {!token ? (
            <>
              <Link className="block px-6 py-4" to="/login">
                Login
              </Link>

              <Link className="block px-6 py-4" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link className="block px-6 py-4" to="/profile">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-6 py-4 text-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
     

    </nav>
  );
}

export default Navbar;
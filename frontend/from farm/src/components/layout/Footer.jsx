import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaLeaf,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-3">

            <FaLeaf className="text-3xl text-green-400" />

            <h2 className="text-2xl font-bold">
              From Farm
            </h2>

          </div>

          <p className="mt-5 text-gray-300 leading-7">
            Buy fresh vegetables, fruits and grains directly from trusted farmers.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="font-bold text-xl mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li>Home</li>

            <li>Products</li>

            <li>Farmers</li>

            <li>Orders</li>

          </ul>

        </div>

        {/* Support */}

        <div>

          <h3 className="font-bold text-xl mb-5">
            Support
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li>Privacy Policy</li>

            <li>Terms & Conditions</li>

            <li>Help Center</li>

          </ul>

        </div>

        {/* Social */}

        <div>

          <h3 className="font-bold text-xl mb-5">
            Connect
          </h3>

          <div className="flex gap-5 text-3xl">

            <FaFacebook className="hover:text-blue-400 cursor-pointer transition" />

            <FaInstagram className="hover:text-pink-400 cursor-pointer transition" />

            <FaWhatsapp className="hover:text-green-400 cursor-pointer transition" />

          </div>

        </div>

      </div>

      <div className="border-t border-green-800 text-center py-5 text-gray-300">

        © 2026 From Farm. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;
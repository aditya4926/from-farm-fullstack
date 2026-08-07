import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaArrowRight } from "react-icons/fa";

function Hero() {
    return (
        <section className="bg-gradient-to-r from-green-50 via-white to-green-100 py-20">

            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

                {/* Left */}

                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >

                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full font-semibold">

                        <FaLeaf />

                        Farm Fresh Marketplace

                    </span>

                    <h1 className="text-6xl font-extrabold text-gray-800 mt-8 leading-tight">

                        Fresh Products

                        <span className="block text-green-600">

                            Direct From Farmers

                        </span>

                    </h1>

                    <p className="text-gray-600 text-lg mt-6 leading-8 max-w-xl">

                        Buy fresh vegetables, fruits, grains and dairy products directly
                        from trusted farmers without middlemen.

                    </p>

                    <div className="flex gap-5 mt-10">

                        <Link
                            to="/products"
                            className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-4 rounded-xl shadow-xl flex items-center gap-3"
                        >
                            Shop Now
                            <FaArrowRight />
                        </Link>

                        <Link
                            to="/register"
                            className="border-2 border-green-600 text-green-700 hover:bg-green-50 transition px-8 py-4 rounded-xl"
                        >
                            Become Farmer
                        </Link>

                    </div>

                </motion.div>

                {/* Right */}

                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative"
                >

                    <img
                        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&auto=format&fit=crop&q=80"
                        alt="Farmer"
                        className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
                    />

                    <div className="absolute -bottom-8 left-10 bg-white shadow-xl rounded-2xl px-6 py-4">

                        <h2 className="text-3xl font-bold text-green-600">
                            100%
                        </h2>

                        <p className="text-gray-500">
                            Organic
                        </p>

                    </div>

                    <div className="absolute top-10 -right-5 bg-white shadow-xl rounded-2xl px-6 py-4">

                        <h2 className="text-3xl font-bold text-green-600">
                            500+
                        </h2>

                        <p className="text-gray-500">
                            Farmers
                        </p>

                    </div>

                </motion.div>

            </div>

        </section>
    );
}

export default Hero;
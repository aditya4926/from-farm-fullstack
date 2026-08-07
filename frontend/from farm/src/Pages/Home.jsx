import CountUp from "react-countup";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Footer from "../components/layout/Footer";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Categories from "../components/home/Categories";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Statistics from "../components/home/Statistics";
import TopFarmers from "../components/home/TopFarmers";

import { useEffect, useState } from "react";
import api from "../api/axios";


function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get("/products");
      setProducts(data.slice(0, 6)); // फक्त पहिले 6 products
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">


      <Hero />
      

      <Categories />

      <WhyChooseUs />

      <Statistics />

      <FeaturedProducts />

      <TopFarmers />

      <Footer />

    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-1 transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">
        {title}
      </h3>
    </div>
  );
}

export default Home;
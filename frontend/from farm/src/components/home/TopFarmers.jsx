import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

function TopFarmers() {
    const [farmers, setFarmers] = useState([]);

    useEffect(() => {
        fetchFarmers();
    }, []);

    const fetchFarmers = async () => {
        try {
            const { data } = await api.get("/top-farmers");

            setFarmers(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="max-w-7xl mx-auto py-20 px-6">

            <h2 className="text-4xl font-bold text-center mb-12">
                👨‍🌾 Top Farmers
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                {farmers.map((farmer) => (
                    <div
                        key={farmer._id}
                        className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition"
                    >
                        <img
                            src={
                                farmer.photo && farmer.photo.trim() !== ""
                                    ? farmer.photo
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        farmer.name
                                    )}&background=16a34a&color=fff&size=256`
                            }
                            alt={farmer.name}
                            className="w-28 h-28 rounded-full object-cover mx-auto"
                        />

                        <h3 className="text-2xl font-bold mt-5">
                            {farmer.name}
                        </h3>

                        <p className="text-gray-500 mt-2">
                            📍 {farmer.village}
                        </p>

                        <Link
                            to={`/farmer/${farmer._id}`}
                            className="inline-block mt-5 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                        >
                            Visit Profile
                        </Link>

                    </div>
                ))}

            </div>

        </section>
    );
}

export default TopFarmers;
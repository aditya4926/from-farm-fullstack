import {
  FaLeaf,
  FaRupeeSign,
  FaTruck,
  FaShieldAlt,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaLeaf className="text-5xl text-green-600" />,
      title: "Fresh Products",
      description:
        "Fresh vegetables and fruits directly from farms.",
    },
    {
      icon: <FaRupeeSign className="text-5xl text-yellow-500" />,
      title: "Better Prices",
      description:
        "No middlemen means fair prices for farmers and customers.",
    },
    {
      icon: <FaTruck className="text-5xl text-blue-500" />,
      title: "Fast Delivery",
      description:
        "Quick order processing and fast delivery from nearby farms.",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-purple-500" />,
      title: "Secure Payments",
      description:
        "Safe online payment and Cash on Delivery options.",
    },
  ];

  return (
    <section className="bg-green-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose From Farm?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-center">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mt-5">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {item.description}
              </p>
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyChooseUs;
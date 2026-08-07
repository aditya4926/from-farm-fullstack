import CountUp from "react-countup";

function Statistics() {
    const stats = [
        {
            number: 500,
            suffix: "+",
            title: "Farmers",
        },
        {
            number: 1500,
            suffix: "+",
            title: "Products",
        },
        {
            number: 3000,
            suffix: "+",
            title: "Happy Customers",
        },
        {
            number: 10000,
            suffix: "+",
            title: "Orders Delivered",
        },
    ];

    return (
        <section className="bg-green-600 py-20 text-white">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="text-center"
                        >
                            <h2 className="text-5xl font-bold">
                                {item.number}
                                {item.suffix}
                            </h2>

                            <p className="mt-4 text-lg opacity-90">
                                {item.title}
                            </p>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}

export default Statistics;
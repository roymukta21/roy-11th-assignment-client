import React from "react";
import Reveal from "../../../components/Reveal";

const Collaborators = () => {
  const partners = [
    {
      name: "Chef Anna",
      img: "https://www.santaanasweets.com/wp-content/uploads/scallops-7404270_1280.jpg",
    },
    {
      name: "Home Delights",
      img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&auto=format&fit=crop",
    },
    {
      name: "Tasty Treats",
      img: "https://freerangestock.com/sample/156403/a-table-with-various-ingredients-on-it.jpg",
    },
    {
      name: "Gourmet Hub",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop",
    },
  ];

  return (
    <Reveal>
      <div className="bg-orange-50 p-8 rounded-3xl border hover:shadow-xl transition">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-orange-600 text-center">
          Our Partners
        </h1>

        {/* About / Description */}
        <p className="text-center text-gray-600 mt-4 max-w-3xl mx-auto">
          We collaborate with skilled home chefs who want to turn their passion
          into a sustainable income. As a Local Chef Bazaar partner, you get
          visibility, support, and a platform to showcase your authentic cooking.
          <br />
          <br />
          Partner with us and bring your homemade recipes to a broader audience.
        </p>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 mt-8 mb-16 max-w-5xl mx-auto">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center border rounded-lg shadow hover:shadow-xl transition-all border-slate-200 p-4 bg-white"
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="h-24 w-full object-cover rounded-md mb-2"
              />
              <span className="text-gray-800 font-medium text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default Collaborators;

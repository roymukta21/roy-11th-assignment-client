import React from "react";
import Reveal from "../../../components/Reveal";

const Newsletter = () => {
  return (
    <Reveal>
      <div className="w-full bg-gray-900 px-4 text-center text-white py-20 flex flex-col items-center justify-center rounded-2xl mb-4">

        {/* Tagline */}
        <p className="text-orange-500 font-medium tracking-wide">
          Stay in the Flavor Loop
        </p>

        {/* Main Heading */}
        <h1 className="max-w-2xl font-extrabold text-4xl md:text-5xl mt-2 leading-tight">
          Join the Local Chef Bazaar Newsletter
        </h1>

        {/* Subtext */}
        <p className="text-gray-300 text-sm md:text-base max-w-xl mt-3">
          Be the first to hear about new home-chef specialties, discounts, and exclusive offers.
        </p>

        {/* Input Box */}
        <div className="flex items-center justify-center mt-10 border border-gray-600 focus-within:border-orange-500 text-sm rounded-full h-14 max-w-lg w-full overflow-hidden bg-gray-800/40 backdrop-blur">
          <input
            type="email"
            className="bg-transparent outline-none px-5 h-full flex-1 text-gray-200 placeholder-gray-400"
            placeholder="Enter your email"
          />
          <button className="bg-orange-600 hover:bg-orange-700 transition-all text-white rounded-full h-11 mr-2 px-5 md:px-10 font-medium cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </Reveal>
  );
};

export default Newsletter;

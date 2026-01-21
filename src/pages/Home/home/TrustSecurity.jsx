import React from "react";
import Reveal from "../../../components/Reveal";

const TrustSecurity = () => {
  return (
    <Reveal>
     <section className="bg-orange-50 p-8 rounded-3xl border hover:shadow-xl transition">
         {/* Heading */}
      <div className="text-center mb-14 ">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-3">
          Trust & 
          <span className="text-orange-600"> Security</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          We ensure every home-cooked meal on Local Chef Bazaar is safe, verified, 
          and handled with the highest protection standards.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-10">

        {/* Premium Image Side */}
        <div className="w-full flex justify-center">
          <img
            className="max-w-2xl w-full drop-shadow-2xl rounded-2xl"
            src="/src/assets/image.png"
            alt="Security Illustration"
          />
        </div>

        {/* Features */}
        <div className="space-y-12 w-full px-4">

          {/* Item */}
          <div className="flex items-center gap-6 max-w-md hover:scale-[1.02] transition-all duration-300">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-inner">
              <svg
                width="30"
                height="30"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.5 14L12.25 4.667c.35-.383.9-.383 1.25 0L24.5 14M7 24.5v-8.167m5.833 8.167V14m5.834 10.5v-6.417"
                  stroke="#1E40AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Verified Home Chefs
              </h3>
              <p className="text-slate-600 text-sm">
                Every chef passes identity checks and kitchen quality review 
                before joining our platform.
              </p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-center gap-6 max-w-md hover:scale-[1.02] transition-all duration-300">
            <div className="p-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl shadow-inner">
              <svg
                width="30"
                height="30"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 3.5l9.333 4.667v5.833c0 6.417-4.375 10.5-9.333 12.5-4.958-2-9.333-6.083-9.333-12.5V8.167L14 3.5Z"
                  stroke="#15803D"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.5 14l2.333 2.333L17.5 12.5"
                  stroke="#15803D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Encrypted Transactions
              </h3>
              <p className="text-slate-600 text-sm">
                All payments are protected with industry-grade encryption 
                ensuring your data stays private.
              </p>
            </div>
          </div>

          {/* Item */}
          <div className="flex items-center gap-6 max-w-md hover:scale-[1.02] transition-all duration-300">
            <div className="p-6 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl shadow-inner">
              <svg
                width="30"
                height="30"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.667 7h18.666M7 4.667h14M10.5 7v16.333a2.333 2.333 0 0 0 2.333 2.333h2.334A2.333 2.333 0 0 0 17.5 23.333V7"
                  stroke="#EA580C"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                Transparent Order Tracking
              </h3>
              <p className="text-slate-600 text-sm">
                From cooking to delivery, track every movement of your order 
                with real-time updates.
              </p>
            </div>
          </div>

        </div>
      </div>
     </section>
    </Reveal>
  );
};

export default TrustSecurity;

import React from "react";
import Reveal from "../../../components/Reveal";

const AppsDownload = () => {
  return (
    <Reveal>
      <div className="bg-orange-50 p-8 rounded-3xl border hover:shadow-xl transition">
        
        {/* Text Section */}
        <div className="flex flex-col text-center md:text-left items-center md:items-start pt-12 md:p-10">
           {/* Image Section */}
        <img
          className="w-[200px]  pt-10 md:p-3"
          src="/src/assets/Chef.jpg"
          alt="Chef"
        />
          <h2 className="md:text-4xl text-2xl font-semibold text-gray-900">
            Get the Local Chef Bazzar App
          </h2>

          <p className="text-gray-700 mt-3 md:w-3/4 w-full">
            Order fresh groceries, cooked meals & every kitchen essential — right from your phone.
          </p>

          <div className="flex items-center gap-4 mt-6">
            {/* Google Play */}
            <a
              href="#"
              target="_blank"
              aria-label="Download on Google Play"
              className="active:scale-95 transition-all cursor-pointer"
            >
              <img
                className="md:w-44 w-28"
                src="/src/assets/ChatGPT Image Jan 20, 2026, 01_56_58 PM.png"
                alt="Google Play Button"
              />
            </a>

            {/* App Store */}
            <a
              href="#"
              target="_blank"
              aria-label="Download on App Store"
              className="active:scale-95 transition-all cursor-pointer"
            >
              <img
                className="md:w-44 w-28"
                src="/src/assets/ChatGPT Image Jan 20, 2026, 02_00_32 PM.png"
                alt="App Store Button"
              />
            </a>
          </div>
        </div>

       
      </div>
    </Reveal>
  );
};

export default AppsDownload;

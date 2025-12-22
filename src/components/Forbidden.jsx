import React from "react";

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
       <title>Forbidden</title>
      <div className="text-center p-8 rounded-xl shadow-2xl bg-black backdrop-blur-md border border-black">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-red-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold tracking-wide mb-4 text-red-400">
          403 Forbidden
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-300 mb-6">
          Oops! You don’t have permission to access this page.
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-block px-6 py-3 text-lg font-semibold rounded-lg bg-red-500 hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-red-500/50"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default Forbidden;

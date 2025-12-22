import React from "react";

const SearchNotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-sm h-[400px]">
        <p className="font-medium text-2xl text-red-500 mb-5">Oops! Sorry </p>
        <h2 className="md:text-6xl text-4xl font-semibold text-gray-800">
          Meals Not Found
        </h2>

        <div className="flex items-center gap-4 mt-6">
          <h3 className="text-gray-500 text-2xl">Search again please!</h3>
        </div>
      </div>
    </div>
  );
};

export default SearchNotFound;

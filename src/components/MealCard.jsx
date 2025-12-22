import { ChefHat, Clock, Star } from "lucide-react";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const MealCard = ({ meal }) => {
  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-lg font-bold text-gray-800">${meal.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Chef Info */}
        <div className="mb-3 flex items-center gap-2 text-sm">
          <ChefHat size={16} className="text-gray-600" />
          <div>
            <p className="font-semibold text-gray-700">{meal.chefName}</p>
            <p className="text-xs text-gray-500">Chef ID: {meal.chefId}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < meal.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({meal.rating}/5)
            </span>
          </div>
        </div>

        {/* Location */}
        <p className="my-1 text-sm font-semibold flex items-center gap-1">
          <FaLocationDot className="text-primary"/> Delivery:{" "}
          <span className="text-gray-600">{meal.deliveryArea}</span>{" "}
        </p>

        {/* See Details Button */}
        <div className="pb-4 mt-5">
          <Link to={`/meals/${meal._id}`} className="primary-btn w-full">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

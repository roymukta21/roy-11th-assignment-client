import React from "react";
import MealCard from "../../../components/MealCard";
import Reveal from "../../../components/Reveal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
//import Skeleton from "../../../components/Shared/Loading/Skeleton";

const LatestMeals = () => {
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["latest-chef-meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("latest-meals");
      return res.data;
    },
  });

  if (isLoading) {
    //return <Skeleton />;
  }

  return (
    <div className="bg-orange-50 p-8 rounded-3xl border hover:shadow-xl transition">
      {/* Heading & Subheading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Fresh From Your
          <span className="text-orange-600"> Local Chefs</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the newest dishes prepared by talented home chefs from your area.
          Order fresh, homemade meals — made with love just for you.
        </p>
      </div>

      <Reveal>
        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      </Reveal>

      <div className="text-center">
        <Link to="/meals" className="primary-btn">
          Browse All Meals
        </Link>
      </div>
    </div>
  );
};

export default LatestMeals;

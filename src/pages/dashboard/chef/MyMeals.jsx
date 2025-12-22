import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MealsPopUp from "./MealsPopUp";
import { Star, Clock, Trash2, Edit, ChefHat } from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myMeals", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals?email=${user?.email}`);
      return res.data;
    },
  });

  const meals = data?.meals || [];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This meal will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/meals/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "Meal has been deleted.", "success");
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <title>My Meals</title>
      <div className="mb-6 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800">My Meals</h1>
      </div>

      {data.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No Meals found</p>
        </div>
       ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full">
                <span className="font-bold">${meal.price}</span>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold mb-2">{meal.foodName}</h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
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
                <span className="text-sm ml-2">({meal.rating}/5)</span>
              </div>

              <div className="flex items-center gap-2 mb-2 text-sm">
                <ChefHat size={16} />
                <div>
                  <p className="font-semibold">{meal.chefName}</p>
                  <p className="text-xs text-gray-500">
                    Chef ID: {meal.chefId}
                  </p>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-2 text-sm mb-3">
                <Clock size={16} />
                <span>{meal.estimatedDeliveryTime}</span>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-sm mb-1">Ingredients</p>
                <div className="flex flex-wrap gap-1">
                  {meal.ingredients?.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedMeal(meal);
                    setShowUpdateModal(true);
                  }}
                  className="primary-btn flex items-center gap-2 flex-1 text-center"
                >
                  <Edit size={16} /> Update
                </button>

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="delete-btn flex items-center gap-2 flex-1 text-center"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

      {showUpdateModal && (
        <MealsPopUp
          meal={selectedMeal}
          refetch={refetch}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
    </div>
  );
};

export default MyMeals;

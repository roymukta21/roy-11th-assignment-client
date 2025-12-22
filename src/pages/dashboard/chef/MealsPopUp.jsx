import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MealsPopUp = ({ setShowUpdateModal, meal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (meal) {
      reset({
        foodName: meal.foodName,
        foodImage: meal.foodImage,
        price: meal.price,
        ingredients: meal.ingredients.join(", "),
        estimatedDeliveryTime: meal.estimatedDeliveryTime,
      });
    }
  }, [meal, reset]);

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      ingredients: data.ingredients.split(",").map((i) => i.trim()),
    };

    try {
      await axiosSecure.patch(`/meals/${meal._id}`, updatedData);
      refetch();
      setShowUpdateModal(false);
      toast.success("✅ Meal updated successfully!");
    } catch (error) {
      toast.error("❌ Update failed");
    }
  };
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-blend-color bg-opacity-50 flex items-center justify-center p-4 z-40 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Update Meal</h3>
          <button
            onClick={() => setShowUpdateModal(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* food name  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Name
            </label>
            <input
              {...register("foodName", {
                required: "Food name is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.foodName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.foodName.message}
              </p>
            )}
          </div>
          {/* food image  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image URL
            </label>
            <input
              {...register("foodImage", {
                required: "Image URL is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.foodImage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.foodImage.message}
              </p>
            )}
          </div>
          {/* food price  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          {/* food Ingredients  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients (comma-separated)
            </label>
            <textarea
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-xs mt-1">
                {errors.ingredients.message}
              </p>
            )}
          </div>
          {/* food Estimated Delivery Time  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Delivery Time
            </label>
            <input
              {...register("estimatedDeliveryTime", {
                required: "Delivery time is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.estimatedDeliveryTime && (
              <p className="text-red-500 text-xs mt-1">
                {errors.estimatedDeliveryTime.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 success-btn">
              Update Meal
            </button>
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="flex-1 delete-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MealsPopUp;

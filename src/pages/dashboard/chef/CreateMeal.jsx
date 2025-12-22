import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const CreateMeal = () => {
  const axiosSecure = useAxiosSecure();
  const { users } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading("Uploading image & saving meal...");

    try {
      // image upload
      const profileImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImg);

      const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host
      }`;

      const imgRes = await axiosSecure.post(imageApiUrl, formData);
      const photoURL = imgRes.data.data.url;

      //  meal data post
      const mealData = {
        chefEmail: users?.email,
        chefName: users?.displayName,
        chefId: users?.chefId,
        foodName: data.foodName,
        foodImage: photoURL,
        price: parseFloat(data.price),
        rating: Number(data.rating) || 0,
        ingredients: data.ingredients.split(",").map((i) => i.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
      };

      //  save meal
      await axiosSecure.post("/meals", mealData);

      toast.update(toastId, {
        render: "Meal created successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      reset();
      navigate("/dashboard/my-meals");
    } catch (error) {
      toast.update(toastId, {
        render:
          error.response?.data?.message ||
          "You are a fraud user. You cannot add meals.",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-10">
      <title> Create your Meals</title>
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="lg:text-3xl text-2xl font-extrabold text-center text-primary mb-6">
          🍴 Create a New Meal
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Food Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Food Name
            </label>
            <input
              type="text"
              {...register("foodName", { required: true })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="e.g. Grilled Chicken Salad"
            />
            {errors.foodName && (
              <p className="text-red-500 text-sm">Food name is required</p>
            )}
          </div>

          {/* Food Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Food Image
            </label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input rounded-lg w-full mt-1"
            />
            {errors.photo && <p className="text-red-500">Photo required</p>}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: true })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="12.99"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Rating
            </label>
            <input
              type="number"
              {...register("rating")}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="0"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Ingredients (comma separated)
            </label>
            <textarea
              {...register("ingredients", { required: true })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="Chicken, Lettuce, Tomatoes..."
            />
          </div>

          {/* Estimated Delivery Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Estimated Delivery Time
            </label>
            <input
              type="text"
              {...register("estimatedDeliveryTime", { required: true })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="30 minutes"
            />
          </div>

          {/* deliveryArea */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Delivery Area
            </label>
            <input
              type="text"
              {...register("deliveryArea", { required: true })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="Dhanmondi"
            />
          </div>

          {/* Chef Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Chef’s Experience
            </label>
            <input
              {...register("chefExperience", { required: true })}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
              placeholder="5 years of Mediterranean cuisine experience"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`btn ${
                loading
                  ? "bg-gray-600 mt-3 text-white py-2.5 px-3.5 rounded-sm transition-colors duration-200 "
                  : "primary-btn"
              }`}
            >
              {loading ? "Uploading..." : "Add Meal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeal;

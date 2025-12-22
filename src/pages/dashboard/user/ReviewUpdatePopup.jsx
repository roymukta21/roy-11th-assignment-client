import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import Rating from "react-rating";
import { MdOutlineStarOutline, MdOutlineStarPurple500 } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ReviewUpdatePopup = ({ review, setShowUpdateModal, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (review) {
      reset({
        rating: review.rating,
        text: review.text,
      });
    }
  }, [review, reset]);

  const handleCustomerReviews = async (data) => {
    const updatedData = { ...data };

    try {
      await axiosSecure.patch(`/meals-reviews/${review._id}`, updatedData);
      refetch();
      setShowUpdateModal(false);
      toast.success("Updated successfully!");
    } catch (error) {
      toast.error("Update failed");
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

        <form
          onSubmit={handleSubmit(handleCustomerReviews)}
          className="mt-5 space-y-4"
        >
          {/* Star Rating */}
          <div className="flex items-center gap-3 mt-5">
            <span className="font-semibold">Your Rating:</span>
            <Controller
              name="rating"
              control={control}
              rules={{ required: "Rating is required" }}
              render={({ field }) => (
                <Rating
                  initialRating={field.value}
                  onChange={field.onChange}
                  emptySymbol={
                    <MdOutlineStarOutline className="text-primary text-2xl mt-1.5" />
                  }
                  fullSymbol={
                    <MdOutlineStarPurple500 className="text-primary text-2xl mt-1.5" />
                  }
                />
              )}
            />
            {errors.rating && (
              <p className="text-red-500 text-sm">{errors.rating.message}</p>
            )}
          </div>

          {/* Input textarea */}
          <textarea
            className="w-full border p-3 rounded"
            rows="4"
            placeholder="Write your review..."
            {...register("text", { required: "Review text is required" })}
          />
          {errors.text && (
            <p className="text-red-500 text-sm">{errors.text.message}</p>
          )}z

          <button type="submit" className="primary-btn">
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewUpdatePopup;

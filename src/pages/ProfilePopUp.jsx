import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ProfilePopUp = ({ setShowUpdateModal, getUser, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (getUser) {
      reset({
        displayName: getUser.displayName,
        email: getUser.email,
        photoURL: getUser.photoURL,
        address: getUser.address,
      });
    }
  }, [getUser, reset]);

  const onSubmit = async (data) => {
    const updatedData = { ...data };
    try {
      await axiosSecure.patch(`/api/users/${getUser._id}`, updatedData);
      refetch();
      setShowUpdateModal(false);
      toast.success("Profile updated successfully!");
      console.log("submit data ", data);
    } catch (error) {
      toast.error("❌ Update failed");
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-blend-color bg-opacity-50 flex items-center justify-center p-4 z-40 overflow-y-auto">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            Update your profile!
          </h3>
          <button
            onClick={() => setShowUpdateModal(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* user name  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              {...register("displayName", {
                required: "Name is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.displayName.message}
              </p>
            )}
          </div>
          {/* user email  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              readOnly
              {...register("email", { required: "email is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* image  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              {...register("photoURL", {
                required: "photoURL URL is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-xs mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>
          {/* address  */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              {...register("address", {
                required: "address are required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
          {/* button  */}
          <div className="flex gap-3 pt-4">
            <button type="submit" className="flex-1 success-btn text-center">
              Update profile
            </button>
            <button
              type="button"
              onClick={() => setShowUpdateModal(false)}
              className="flex-1 delete-btn text-center"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePopUp;

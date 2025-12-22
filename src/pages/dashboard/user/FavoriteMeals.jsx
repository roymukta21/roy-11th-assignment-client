import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const FavoriteMeals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: favorites = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user?.email}`);
      return res.data;
    },
  });

  const handleFavoriteDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This Favorite meals will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/favorites/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Favorite meal has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <title>Most Favorite Meals</title>
      <div className="mb-6 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 ">Favorite Meals</h1>
      </div>
      {favorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No Favorite Meals found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      {favorite.mealName}
                    </h3>

                    <p className="text-gray-600">
                      {favorite.chefName} ({favorite.chefId})
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Date:{" "}
                      {format(
                        new Date(favorite.createdAt),
                        "dd MMM yyyy, hh:mm a"
                      )}
                    </p>
                    <p className="font-semibold mt-2">
                      Price: ${favorite.price}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleFavoriteDelete(favorite._id)}
                    className="delete-btn"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteMeals;

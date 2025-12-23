import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
  });
  const handleMakeFraud = (id) => {
    const updateStatus = { userStatus: "fraud" };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to mark this user as fraud?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${id}`, updateStatus)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: "User marked as fraud successfully.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while updating.",
              icon: "error",
            });
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <title>LocalChefBazaar Users Manage</title>
      <div className="mb-6 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 ">Manage Users</h1>
      </div>
      {users.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No Users found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="my-th">User</th>
                  <th className="my-th">Email</th>
                  <th className="my-th">Role</th>
                  <th className="my-th">Status</th>
                  <th className="my-th">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {" "}
                      {user.displayName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p>
                        {user.role === "fraud" ? (
                          <span className="status-error">{user.role}</span>
                        ) : (
                          <span className="user-tag">{user.role}</span>
                        )}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span>
                        {user.userStatus === "active" ? (
                          <span className="status-success">
                            {" "}
                            {user.userStatus}
                          </span>
                        ) : (
                          <span className="status-error">
                            {" "}
                            {user.userStatus}
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === "admin" ? (
                        <span className="status-success">Admin</span>
                      ) : user.userStatus === "fraud" ? (
                        <span className="status-error">fraud user</span>
                      ) : (
                        <button
                          onClick={() => handleMakeFraud(user._id)}
                          className="delete-btn"
                        >
                          Make Fraud
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;

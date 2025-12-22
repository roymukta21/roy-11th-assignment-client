import React, { useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaEdit,
  FaRegCalendarAlt,
} from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useUser from "../hooks/useUser";
import Loading from "../components/Loading";
import ProfilePopUp from "./ProfilePopUp";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const { users: user, isLoading, refetch } = useUser();
  const handleRequest = async (type) => {
    const request = {
      userName: user?.name,
      userEmail: user?.email,
      requestType: type,
      requestStatus: "pending",
      requestTime: new Date(),
    };

    try {
      const res = await axiosSecure.post("/requests", request);

      if (res.status === 201) {
        toast.success(`(${type}) Request has been sent!`);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Already requested!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <title>LocalChefBazzar::My Profile</title>
      <div className="mb-6 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-orange-400 text-center">My Profile</h1>
      </div>

      <div className="flex justify-center items-center pt-0 lg:pt-[12%] px-4">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden w-full max-w-4xl flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="bg-linear-to-b from-primary to-orange-600 text-white flex flex-col items-center p-6 lg:w-1/3 relative">
            <img
             src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=f97316&color=fff"}
              alt="User"
              className="w-28 h-28 rounded-full border-4 border-white object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{user?.displayName}</h2>
            <p className="text-sm opacity-80 wrap-break-word">{user?.email}</p>
            <span className="mt-3 px-3 py-1 bg-white text-primary rounded-full text-xs font-semibold">
              {user?.role?.toUpperCase()}
            </span>
            <button
              onClick={() => {
                setSelectedUpdate(user);
                setShowUpdateModal(true);
              }}
              className="btn-primary hover:text-black cursor-pointer absolute right-3"
            >
              <FaEdit className="text-2xl" />
            </button>
          </div>

          {/* Details Section */}
          <div className="flex-1 p-6 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
              Profile Information
            </h3>

            <div className=" space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <FaUser className="text-primary" /> Status:{" "}
                <span
                  className={`font-semibold ${
                    user?.userStatus === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {user?.userStatus}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <FaMapMarkerAlt className="text-primary" />{" "}
                {user?.address || "No Address"}
              </div>
              {user?.role === "chef" && (
                <div className="flex items-center gap-2 text-gray-700">
                  <FaUser className="text-primary" /> Chef ID:{" "}
                  <span className="font-semibold">{user?.chefId}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-700">
                <FaRegCalendarAlt className="text-primary" /> Open:{" "}
                <span>
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className=" flex flex-wrap gap-3">
              {user?.role !== "chef" && user?.role !== "admin" && (
                <button
                  onClick={() => handleRequest("chef")}
                  className="primary-btn"
                >
                  Be a Chef
                </button>
              )}

              {user?.role !== "admin" && (
                <button
                  onClick={() => handleRequest("admin")}
                  className="primary-btn"
                >
                  Be an Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showUpdateModal && (
        <ProfilePopUp
          getUser={selectedUpdate}
          setShowUpdateModal={setShowUpdateModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Profile;

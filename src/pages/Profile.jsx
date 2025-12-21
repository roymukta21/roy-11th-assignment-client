import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "firebase/auth";

export default function Profile() {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!user) return null;

  // IMAGE CHANGE 
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const imageUrl = data.data.display_url;

      await updateProfile(user, {
        photoURL: imageUrl,
      });

      toast.success("Profile picture updated!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile picture");
    } finally {
      setUploading(false);
    }
  };

  // ROLE REQUEST
  const handleRequest = async (type) => {
    try {
      setLoading(true);

      const requestData = {
        userName: user.displayName || "Unknown",
        userEmail: user.email,
        requestType: type,
        requestStatus: "pending",
        requestTime: new Date().toISOString(),
      };

      await axios.post("http://localhost:5000/role-requests", requestData, {
        withCredentials: true,
      });

      toast.success(`Request sent to admin for ${type}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3">

        {/* LEFT SIDE */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 flex flex-col items-center justify-center relative">

          {/* Edit icon */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
            title="Edit Profile Picture"
          >
            ✏️
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <img
            src={user.photoURL || "https://i.ibb.co/2kR5zq0/avatar.png"}
            alt="User"
            className="w-28 h-28 rounded-full border-4 border-white object-cover mb-3"
          />

          {uploading && (
            <p className="text-white text-sm animate-pulse">
              Updating photo...
            </p>
          )}

          <h2 className="text-xl font-bold text-white mt-2">
            {user.displayName || "No Name"}
          </h2>

          <p className="text-sm text-orange-100">{user.email}</p>

          <span className="mt-3 px-4 py-1 text-xs bg-white text-orange-600 rounded-full font-semibold">
            {role?.toUpperCase()}
          </span>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 p-6">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            Profile Information
          </h3>

          <div className="space-y-3 text-sm text-gray-700">
            <p>👤 <strong>Status:</strong> <span className="text-green-600">Active</span></p>
            <p>📍 <strong>Address:</strong> Not Added</p>

            {role === "chef" && (
              <p>🧑‍🍳 <strong>Chef ID:</strong> CHEF-{user.uid.slice(0, 6)}</p>
            )}

            <p>📅 <strong>Open:</strong> {new Date().toDateString()}</p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 pt-6">
            {role !== "chef" && role !== "admin" && (
              <button
                disabled={loading}
                onClick={() => handleRequest("chef")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Be a Chef
              </button>
            )}

            {role !== "admin" && (
              <button
                disabled={loading}
                onClick={() => handleRequest("admin")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
              >
                Be an Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

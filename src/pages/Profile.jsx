import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user, role } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleRequest = async (type) => {
    try {
      setLoading(true);
      const requestData = {
        userName: user.displayName || "Unknown",
        userEmail: user.email,
        requestType: type, // chef | admin
        requestStatus: "pending",
        requestTime: new Date().toISOString(),
      };

      await axios.post("http://localhost:5000/role-requests", requestData, {
        withCredentials: true,
      });

      toast.success(`Request sent to admin for ${type}`);
    } catch (error) {
      toast.error("Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || "https://i.ibb.co/2kR5zq0/avatar.png"}
            alt="User"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.displayName || "No Name"}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><strong>Role:</strong> {role}</p>
          <p><strong>Status:</strong> Active</p>
          <p><strong>Address:</strong> Not Added</p>
          {role === "chef" && <p><strong>Chef ID:</strong> CHEF-{user.uid.slice(0,6)}</p>}
        </div>

        <div className="flex gap-3 pt-4">
          {role !== "chef" && role !== "admin" && (
            <button
              disabled={loading}
              onClick={() => handleRequest("chef")}
              className="btn btn-primary"
            >
              Be a Chef
            </button>
          )}

          {role !== "admin" && (
            <button
              disabled={loading}
              onClick={() => handleRequest("admin")}
              className="btn btn-secondary"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


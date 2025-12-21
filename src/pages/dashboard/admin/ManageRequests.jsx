import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all requests
  useEffect(() => {
    axios.get("/requests") // 🔁 backend endpoint
      .then(res => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Generate chefId
  const generateChefId = () => {
    return `chef-${Math.floor(1000 + Math.random() * 9000)}`;
  };

  // Accept request
  const handleAccept = async (req) => {
    try {
      let roleUpdate = {};

      if (req.requestType === "chef") {
        roleUpdate = {
          role: "chef",
          chefId: generateChefId(),
        };
      }

      if (req.requestType === "admin") {
        roleUpdate = {
          role: "admin",
        };
      }

      // 1️⃣ Update user role
      await axios.patch(`/users/${req.userEmail}`, roleUpdate);

      // 2️⃣ Update request status
      await axios.patch(`/requests/${req._id}`, {
        requestStatus: "approved",
      });

      // UI update
      setRequests(prev =>
        prev.map(r =>
          r._id === req._id
            ? { ...r, requestStatus: "approved" }
            : r
        )
      );

      Swal.fire("Approved!", "Request has been approved", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Reject request
  const handleReject = async (req) => {
    try {
      await axios.patch(`/requests/${req._id}`, {
        requestStatus: "rejected",
      });

      setRequests(prev =>
        prev.map(r =>
          r._id === req._id
            ? { ...r, requestStatus: "rejected" }
            : r
        )
      );

      Swal.fire("Rejected", "Request has been rejected", "info");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Requests</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td className="capitalize">{req.requestType}</td>
                <td className={`font-semibold ${
                  req.requestStatus === "approved"
                    ? "text-green-600"
                    : req.requestStatus === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}>
                  {req.requestStatus}
                </td>
                <td>{new Date(req.requestTime).toLocaleString()}</td>
                <td className="space-x-2">
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleAccept(req)}
                    className="btn btn-success btn-sm disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button
                    disabled={req.requestStatus !== "pending"}
                    onClick={() => handleReject(req)}
                    className="btn btn-error btn-sm disabled:opacity-50"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

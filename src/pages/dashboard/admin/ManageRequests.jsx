import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const handleAccept = (id) => {
    Swal.fire({
      title: "Accept Request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Accept",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/requests/${id}`, { action: "accept" }).then(() => {
          refetch();
          Swal.fire("Approved!", "Request approved successfully.", "success");
        });
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Reject Request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Reject",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/requests/${id}`, { action: "reject" }).then(() => {
          refetch();
          Swal.fire("Rejected!", "Request rejected.", "success");
        });
      }
    });
  };

  if (isLoading) {
    return <Loading/>;
  }

  return (
    <div>
      <title>Manage Requests</title>
      <div className="mb-6 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 ">Manage Requests</h1>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No requests found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="my-th">User Name</th>
                  <th className="my-th">Email</th>
                  <th className="my-th">Request Type</th>
                  <th className="my-th">Status</th>
                  <th className="my-th">Request Time</th>
                  <th className="my-th">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {request.userName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {request.userEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="user-tag">
                        {request.requestType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="status-pending">
                        {request.requestStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(
                        new Date(request.requestTime),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {request.requestStatus === "pending" ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAccept(request._id)}
                            className="success-btn"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(request._id)}
                            className="delete-btn"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          {request.requestStatus === "approved" ? (
                            <span className="status-success">
                              This request has been accepted
                            </span>
                          ) : (
                            <span className="status-error">
                              This request has been rejected
                            </span>
                          )}
                        </div>
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

export default ManageRequests;

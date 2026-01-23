import React from "react";
import { useQuery } from "@tanstack/react-query";
//import useUser from "../../hooks/useUser";
import { format } from "date-fns";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import useUser from "../../../hooks/useUser";

const OrderRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { chefId } = useUser();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?chefId=${chefId}`);
      return res.data;
    },
  });

  const updateOrderStatus = (id, newStatus) => {
    Swal.fire({
      title: "Confirm Status Change",
      text: `Do you want to set this order as "${newStatus}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/orders/${id}`, { status: newStatus }).then((res) => {
          if (res.data.success) {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "Order status changed successfully",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mt-10">
      <title>Local Chef Bazzar | Orders</title>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Chef Order Requests
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">
            No new orders available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => {
            const { _id, mealName, quantity, price, orderStatus, userEmail, deliveryAddress, orderTime, paymentStatus } = order;

            return (
              <div key={_id} className="bg-white rounded-lg shadow p-6 border border-orange-100">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  
                  {/* Order Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-2xl text-orange-700">{mealName}</h3>
                    <p className="text-sm mt-1 font-medium">{quantity} portions • ৳{price}</p>

                    <p className="text-sm mt-1">
                      Status:
                      <span
                        className={`ml-2 font-semibold ${
                          orderStatus === "delivered"
                            ? "status-success"
                            : orderStatus === "cancelled"
                            ? "status-error"
                            : "status-pending"
                        }`}
                      >
                        {orderStatus}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500 mt-2">Customer: {userEmail}</p>

                    <p className="text-sm mt-1">
                      Delivery: <span className="font-semibold ml-1">{deliveryAddress}</span>
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on: {format(new Date(orderTime), "dd MMM yyyy, hh:mm a")}
                    </p>

                    <p className="text-sm mt-2">
                      Payment Status:
                      <span
                        className={`ml-2 font-semibold ${
                          paymentStatus === "paid" ? "status-success" : "status-pending"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 self-center mt-4 sm:mt-0 flex-wrap">
                    {orderStatus === "delivered" && <span className="status-success">Delivered</span>}
                    {orderStatus === "cancelled" && <span className="status-error">Cancelled</span>}

                    {orderStatus !== "delivered" && orderStatus !== "cancelled" && (
                      <>
                        {orderStatus === "accepted" ? (
                          <button disabled className="success-btn">Accepted</button>
                        ) : (
                          <button onClick={() => updateOrderStatus(_id, "accepted")} className="primary-btn">
                            Accept
                          </button>
                        )}

                        <button onClick={() => updateOrderStatus(_id, "delivered")} className="success-btn">
                          Mark as Delivered
                        </button>

                        {orderStatus !== "accepted" && (
                          <button onClick={() => updateOrderStatus(_id, "cancelled")} className="danger-btn">
                            Cancel
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderRequests;

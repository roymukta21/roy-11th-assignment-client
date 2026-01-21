//import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";

export default function OrderRequests() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  const chefId = `CHEF-${user?.uid?.slice(0, 6)}`;

  const fetchOrders = async () => {
    const res = await axios.get(
      `http://localhost:5000/chef/orders?chefId=${chefId}`,
      { withCredentials: true }
    );
    setOrders(res.data);
  };

  useEffect(() => {
    if (chefId) fetchOrders();
  }, [chefId]);
  const updateStatus = async (id, status) => {
    await axios.patch(
      `http://localhost:5000/orders/${id}`,
      { status },
      { withCredentials: true }
    );
    toast.success(`Order ${status}`);
    fetchOrders(); // live update
  };

  const isDisabled = (order) => order.orderStatus === "cancelled" || order.orderStatus === "delivered";

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Order Requests</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow">
            <div className="card-body space-y-2">
              <h3 className="text-xl font-semibold">{order.foodName}</h3>
              <p><strong>Price:</strong> ৳{order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment:</strong> {order.paymentStatus}</p>
              <p><strong>User Email:</strong> {order.userEmail}</p>
              <p><strong>Address:</strong> {order.userAddress || "N/A"}</p>
              <p><strong>Order Time:</strong> {new Date(order.orderTime).toLocaleString()}</p>

              <div className="flex gap-2 pt-3">
                <button
                  disabled={isDisabled(order) || order.orderStatus !== "pending"}
                  onClick={() => updateStatus(order._id, "cancelled")}
                  className="btn btn-error btn-sm"
                >
                  Cancel
                </button>

                <button
                  disabled={isDisabled(order) || order.orderStatus !== "pending"}
                  onClick={() => updateStatus(order._id, "accepted")}
                  className="btn btn-primary btn-sm"
                >
                  Accept
                </button>

                <button
                  disabled={order.orderStatus !== "accepted"}
                  onClick={() => updateStatus(order._id, "delivered")}
                  className="btn btn-success btn-sm"
                >
                  Deliver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// src/pages/MyOrders.jsx
// Private My Orders Page according to requirement

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/orders?email=${user.email}`, {
          withCredentials: true,
        })
        .then((res) => setOrders(res.data));
    }
  }, [user]);

  const handlePay = async (order) => {
    const res = await axios.post(
      "http://localhost:5000/create-payment-intent",
      { orderId: order._id, price: order.price },
      { withCredentials: true }
    );

    navigate(`/payment/${res.data.clientSecret}`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <div key={order._id} className="card bg-base-100 shadow">
            <div className="card-body space-y-2">
              <h3 className="text-xl font-semibold">{order.foodName}</h3>

              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment:</strong> {order.paymentStatus}</p>
              <p><strong>Price:</strong> ৳{order.price}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Delivery Time:</strong> {order.deliveryTime}</p>
              <p><strong>Chef Name:</strong> {order.chefName}</p>
              <p><strong>Chef ID:</strong> {order.chefId}</p>

              {order.orderStatus === "accepted" &&
                order.paymentStatus === "pending" && (
                  <button
                    onClick={() => handlePay(order)}
                    className="btn btn-primary mt-3"
                  >
                    Pay
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- BACKEND REQUIREMENTS ----------------
1. GET /orders?email=user@email.com
2. POST /create-payment-intent (Stripe)
3. After payment success:
   - Save payment history
   - Update order.paymentStatus = "paid"
   - Redirect to /payment-success
----------------------------------------------------- */
import { useContext, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

export default function Order() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Food data from previous page
  const { food } = location.state || {};

  const [quantity, setQuantity] = useState(1);
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(false);

  if (!food) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-red-500 mb-2">No meal selected</h3>
          <p className="text-gray-500 mb-4">Please go back and choose a meal to place an order.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-xl bg-gray-800 text-white hover:bg-gray-900"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { _id, mealName, price, chefId } = food;

  const totalPrice = useMemo(() => price * quantity, [price, quantity]);

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!userAddress.trim()) {
      Swal.fire("Error", "Please enter your delivery address", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Confirm Order",
      text: `Your total price is ৳${totalPrice}. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#16a34a",
    });

    if (!result.isConfirmed) return;

    const orderData = {
      foodId: _id,
      mealName,
      price,
      quantity,
      chefId,
      paymentStatus: "Pending",
      userEmail: user?.email,
      userAddress,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    try {
      setLoading(true);
      await axios.post("http://localhost:5000/order_collection", orderData, {
        withCredentials: true,
      });

      await Swal.fire({
        icon: "success",
        title: "Order placed successfully!",
        text: "Your homemade meal is on the way 🍽️",
        confirmButtonColor: "#16a34a",
      });

      navigate("/dashboard/my-orders");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to place order. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-3xl font-bold text-gray-800">Confirm Your Order</h2>
            <p className="text-gray-500 mt-1">Review details before placing your order</p>
          </div>

          <form onSubmit={handleConfirmOrder} className="p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-600">Meal Name</label>
                <input
                  value={mealName}
                  disabled
                  className="mt-1 w-full rounded-xl border bg-gray-100 px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Price (per item)</label>
                <input
                  value={`৳${price}`}
                  disabled
                  className="mt-1 w-full rounded-xl border bg-gray-100 px-4 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="mt-1 w-full rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">Chef ID</label>
                <input
                  value={chefId}
                  disabled
                  className="mt-1 w-full rounded-xl border bg-gray-100 px-4 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">User Email</label>
                <input
                  value={user?.email || ""}
                  disabled
                  className="mt-1 w-full rounded-xl border bg-gray-100 px-4 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Delivery Address</label>
                <textarea
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.target.value)}
                  placeholder="House, Road, Area, City"
                  className="mt-1 w-full rounded-xl border px-4 py-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
              <p className="text-lg font-semibold text-gray-700">Total Price</p>
              <p className="text-2xl font-bold text-green-600">৳{totalPrice}</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

export default function OrderConfirm() {
  const meal = useLoaderData(); // meal details from route loader
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const totalPrice = meal.price * quantity;

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    const confirm = await Swal.fire({
      title: "Confirm Order",
      text: `Your total price is ৳${totalPrice}. Do you want to confirm the order?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    const orderData = {
      foodId: meal._id,
      mealName: meal.mealName,
      price: meal.price,
      quantity,
      chefId: meal.chefId,
      paymentStatus: "pending",
      userEmail: user.email,
      userAddress: address,
      orderStatus: "pending",
      orderTime: new Date().toISOString(),
    };

    await axios.post("http://localhost:5000/orders", orderData, {
      withCredentials: true,
    });

    Swal.fire({
      icon: "success",
      title: "Order placed successfully!",
    });

    navigate("/dashboard/my-orders");
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Confirm Your Order</h2>

      <form onSubmit={handleConfirmOrder} className="card bg-base-100 shadow p-6 space-y-4">
        <div>
          <label className="label">Meal Name</label>
          <input value={meal.mealName} disabled className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Price</label>
          <input value={`৳${meal.price}`} disabled className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">Chef ID</label>
          <input value={meal.chefId} disabled className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">User Email</label>
          <input value={user.email} disabled className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Delivery Address</label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <p className="font-semibold">Total Price: ৳{totalPrice}</p>

        <button type="submit" className="btn btn-primary w-full">
          Confirm Order
        </button>
      </form>
    </div>
  );
}

/* ================= BACKEND =================
POST /orders
Collection: order_collection
=========================================== */

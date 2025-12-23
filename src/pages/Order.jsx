//import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUser from "../../hooks/useUser";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useState } from "react";

const Order = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { users } = useUser();
  const nevigate = useNavigate();

  const { register, handleSubmit, setValue, watch } = useForm();
  const { data: order = {}, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (users) {
      setValue("userEmail", users.email);
    }
  }, [users]);

  const [totalPrice, setTotalPrice] = useState(0);
  const quantity = watch("quantity");

  // set default price when order loads
  useEffect(() => {
    if (order?.price) {
      setTotalPrice(order.price);
      setValue("price", order.price);
    }
  }, [order]);

  // update price when quantity changes
  useEffect(() => {
    if (order?.price && quantity) {
      const updated = quantity * order.price;
      setTotalPrice(updated);
      setValue("price", updated);
    }
  }, [quantity, order]);

  const handlePlaceOrder = (data) => {
    const finalPrice = data.quantity * order.price;
    setTotalPrice(finalPrice);
    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${finalPrice}$ only`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/orders", {
            mealId: order._id,
            userName: users?.displayName,
            email: users?.email,
            ...data,
            price: finalPrice,
          })
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your order has been placed",
                showConfirmButton: false,
                timer: 1500,
              });
              nevigate("/dashboard/orders");
            }
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Order Failed",
              text:
                err.response?.data?.message ||
                "You are a fraud user. You cannot place orders.",
            });
          });
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-11/12 md:w-8/12 mx-auto py-10 px-4">
      <title>LocalChefBazaar::Place Your Order</title>
      <div className="my-5">
        <Link
          to="/meals"
          className="flex items-center gap-2 text-primary hover:text-black text-xl font-semibold"
        >
          <FaArrowLeftLong /> Back to meals
        </Link>
      </div>
      <form onSubmit={handleSubmit(handlePlaceOrder)}>
        <fieldset className="fieldset">
          {/* user Email */}
          <label className="label"> Email</label>
          <input
            type="email"
            {...register("userEmail")}
            defaultValue={users?.email}
            readOnly
            className="input w-full"
          />
          {/* Meals name */}
          <label className="label">Meals Name</label>
          <input
            type="text"
            {...register("mealName")}
            defaultValue={order.foodName}
            readOnly
            className="input w-full"
          />
          {/* chefId */}
          <label className="label">chefId</label>
          <input
            type="text"
            {...register("chefId")}
            defaultValue={order.chefId}
            readOnly
            className="input w-full"
          />

          {/* Meals price */}
          <label className="label">Price</label>
          <input
            type="number"
            {...register("price")}
            value={totalPrice}
            readOnly
            className="input w-full"
          />

          {/* quantity */}
          <label className="label">quantity</label>
          <input
            type="number"
            {...register("quantity")}
            className="input w-full"
            placeholder="Enter quantity "
          />

          {/*  Delivery Address */}
          <label className="label"> Delivery Address</label>
          <input
            type="text"
            {...register("deliveryAddress")}
            className="input w-full"
          />
        </fieldset>

        <button type="submit" className="primary-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Order;

import { format } from "date-fns";
import { SiCodechef } from "react-icons/si";
import { RiWechatPayLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      return res.data;
    },
  });
  const handlePayment = async (order) => {
    const paymentInfo = {
      mealId: order.mealId,
      orderId: order._id,
      mealName: order.mealName,
      userEmail: order.userEmail,
      price: order.price,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
    console.log(res.data.url);
  };

  return (
    <div>
      <title>LocalChefBazaar::My Orders</title>
      <div className="mb-6 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 ">My Orders</h1>
      </div>
      {
        orders.length === 0? <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500 text-lg">No My Orders found</p>
        </div> : 
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-semibold text-lg">{order.mealName}</h3>
                {/* chef details  */}
                <div>
                  <span className="text-sm font-semibold text-gray-500 mt-1 mb-2 flex">
                    <SiCodechef className="text-xl text-primary mr-1" />{" "}
                    {order.userName}
                  </span>
                  <p className="text-sm text-gray-500 mt-1 mb-2">
                    {order.chefId}
                  </p>
                </div>
                <p className="text-sm mt-1 mb-2 text-primary">
                  {order.quantity} items • ${order.price}
                </p>
                <p className=" text-sm text-gray-600">
                  {format(new Date(order.orderTime), "dd MMM yyyy, hh:mm a")}
                </p>
                {/* --- order status change buttons --- */}
                <div className="mt-2">
                  <span className="font-semibold mr-2">Order Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.orderStatus === "delivered"
                        ? "status-success"
                        : order.orderStatus === "rejected"
                        ? "status-error"
                        : order.orderStatus === "cancelled"
                        ? "status-error"
                        : "status-pending"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>

              {/* --- payments status change buttons --- */}
              <div className="px-4 py-2  rounded-full text-sm font-medium mt-6 md:mt-0">
                {order.paymentStatus === "pending" ? (
                  <span className="status-pending"> Order pending </span>
                ) : order.paymentStatus === "cancelled" ? (
                  <span className="status-error">Stock Out</span>
                ) : order.paymentStatus === "paid" ? (
                  <span className="status-success">Paid</span>
                ) : order.paymentStatus === "payment" ? (
                  <>
                    <button
                      onClick={() => handlePayment(order)}
                      className="delete-btn"
                    >
                      {" "}
                      <RiWechatPayLine /> Make Payment{" "}
                    </button>
                  </>
                ) : (
                  <span>Make another order</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      }
    </div>
  );
};

export default MyOrders;

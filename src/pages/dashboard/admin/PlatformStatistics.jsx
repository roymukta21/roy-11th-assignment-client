import {
  BarChart3,
  PackageCheck,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";

const COLORS = ["#22c55e", "#facc15", "#38bdf8"];

const PlatformStatistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  console.log("data", data);
  const { totalPayment, totalUsers, deliveredOrders, pendingOrders } = data;

  const orderStatusData = [
    { name: "Delivered", value: deliveredOrders },
    { name: "Pending", value: pendingOrders },
  ];

  const paymentData = [
    {
      name: "Total Payment ($)",
      amount: totalPayment,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <title>LocalChefBazaar::Platform Statistics</title>
      <div className="mb-6 mt-12 lg:mt-0">
        <h1 className="text-3xl font-bold text-gray-800 ">
          Platform Statistics
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* total Payment */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="text-orange-600" size={30} />
          </div>
          <h3 className="text-2xl font-bold text-gray-700">{`$${totalPayment}`}</h3>
          <p className="text-gray-600">Total Payment</p>
        </div>
        {/* total Users */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="text-blue-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{totalUsers}</h3>
          <p className="text-gray-600">Total Users</p>
        </div>
        {/* pending Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="text-purple-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{pendingOrders} </h3>
          <p className="text-gray-600">Orders Pending</p>
        </div>
        {/* Orders Delivered */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <PackageCheck className="text-green-600" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">
            {deliveredOrders}
          </h3>
          <p className="text-gray-600">Orders Delivered</p>
        </div>
      </div>

      {/* Dashboard Charts  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Payment Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {orderStatusData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;

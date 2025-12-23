import React, { useState } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  Star,
  Heart,
  ChefHat,
  Plus,
  Package,
  Users,
  FileText,
  BarChart3,
  LogOut,
  House,
  UserRound,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { NavLink, Outlet, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLogo from "../../components/DashboardLogo";


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const navigate = useNavigate();

  const userMenuItems = [
    { path: "/", icon: House, label: "Home" },
    { path: "/dashboard", icon: UserRound, label: "My Profile" },
    { path: "/dashboard/orders", icon: ShoppingBag, label: "My Orders" },
    { path: "/dashboard/user/my-reviews", icon: Star, label: "My Reviews" },
    { path: "/dashboard/favorites", icon: Heart, label: "Favorite Meals" },
  ];

  const chefMenuItems = [
    { path: "/", icon: House, label: "Home" },
    { path: "/dashboard", icon: UserRound, label: "My Profile" },
    { path: "/dashboard/my-meals", icon: ChefHat, label: "My Meals" },
    {
      path: "/dashboard/order-requests",
      icon: Package,
      label: "Order Requests",
    },
    { path: "/dashboard/create-meal", icon: Plus, label: "Create Meal" },
  ];

  const adminMenuItems = [
    { path: "/", icon: House, label: "Home" },
    { path: "/dashboard", icon: UserRound, label: "My Profile" },
    { path: "/dashboard/manage-users", icon: Users, label: "Manage Users" },
    {
      path: "/dashboard/manage-requests",
      icon: FileText,
      label: "Manage Requests",
    },
    {
      path: "/dashboard/statistics",
      icon: BarChart3,
      label: "Platform Statistics",
    },
  ];

  const getMenuItems = () => {
    if (role === "chef") return chefMenuItems;
    if (role === "Admin") return adminMenuItems;
    return userMenuItems;
  };
  const menuItems = getMenuItems();
  const handleSingOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `${user.displayName}. If you're logging out, you can't access!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f54a00",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            navigate("/");
          })
          .catch((error) => console.log(error));
        Swal.fire({
          title: "Logout successful",
          text: "Thanks for staying with us!",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-20">
        <div className="flex items-center justify-between p-4">
          <div>
            <DashboardLogo />
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-800">
              {role === "chef"
                ? "👨‍🍳 Chef"
                : role === "Admin"
                ? "🛡️ Admin"
                : "🍽️ Food"}
            </h2>
            <p className="text-sm text-primary font-semibold mt-1">
              {user?.displayName || "Profile"}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/dashboard"}
                      onClick={() => {
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                          isActive
                            ? "bg-orange-50 text-primary"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

         
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 mt-8 lg:mt-0 p-8 min-h-screen">
        <Outlet />
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-blend-color bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default DashboardLayout;

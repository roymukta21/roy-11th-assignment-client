// import { NavLink } from "react-router";
// import {
//   FaUser,
//   FaChartBar,
//   FaHome,
//   FaUtensils,
//   FaPlusCircle,
//   FaUsers,
//   FaCogs,
// } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Sidebar() {
//   const { user: firebaseUser } = useAuth();
//   const [user, setUser] = useState({ role: "user", email: firebaseUser?.email });

//   // Fetch user data from MongoDB by email
//   useEffect(() => {
//     if (!firebaseUser?.email) return;

//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/users/:email`);
//         setUser(response.data); 
//       } catch (error) {
//         console.error("Error fetching user from MongoDB:", error);
//       }
//     };

//     fetchUser();
//   }, [firebaseUser?.email]);

//   const role = user?.role || "user";

//   return (
//     <div className="w-64 bg-white shadow-md min-h-screen ">
//       {/* User Info */}
//       <div className="flex items-center gap-3 px-6 py-4 border-b text-gray-700">
//         <span className="text-2xl">
//           {role === "admin" && "🛡️"}
//           {role === "chef" && "👨‍🍳"}
//           {role === "user" && "👤"}
//         </span>

//         <div>
//           <p className="font-semibold capitalize ">{role}</p>
//           <p className="text-sm text-orange-700">{user?.email}</p>
//         </div>
//       </div>

//       {/* Menu */}
//       <nav className="px-4 py-4 space-y-1 text-gray-700 ">
//         {/* Common */}
//         <MenuItem to="/" icon={<FaHome />} label="Home" />
//         <MenuItem
//           to="/dashboard/profile"
//           icon={<FaUser />}
//           label="My Profile"
//         />

//         {/* Chef only */}
//         {role === "chef" && (
//           <>
//             <MenuItem
//               to="/dashboard/my-meals"
//               icon={<FaUtensils />}
//               label="My Meals"
//             />
//             <MenuItem
//               to="/dashboard/add-meal"
//               icon={<FaPlusCircle />}
//               label="Add Meal"
//             />
//           </>
//         )}

//         {/* Admin only */}
//         {role === "admin" && (
//           <>
//             <MenuItem
//               to="/dashboard/manage-users"
//               icon={<FaUsers />}
//               label="Manage Users"
//             />
//             <MenuItem
//               to="/dashboard/manage-meals"
//               icon={<FaCogs />}
//               label="Manage Meals"
//             />
//           </>
//         )}

//         {/* Common */}
//         <MenuItem
//           to="/dashboard/analytics"
//           icon={<FaChartBar />}
//           label="Analytics Charts"
//         />
//       </nav>
//     </div>
//   );
// }

// function MenuItem({ to, icon, label, highlight }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-4 py-2 rounded-lg transition
//         ${
//           isActive || highlight
//             ? "bg-indigo-600 text-white"
//             : "hover:bg-gray-100"
//         }`
//       }
//     >
//       <span className="text-lg">{icon}</span>
//       <span>{label}</span>
//     </NavLink>
//   );
// }

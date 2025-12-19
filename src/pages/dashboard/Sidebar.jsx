import { NavLink } from "react-router";
import useAuth from "../../context/useAuth";


export default function Sidebar() {
const { user, role } = useAuth();


return (
<aside className="w-64 bg-white shadow">
<h2 className="text-xl font-bold p-4">Dashboard</h2>


{/* User Menu */}
{role === "user" && (
<nav className="space-y-2 p-4">
<NavLink to="user/profile">My Profile</NavLink>
<NavLink to="user/orders">My Orders</NavLink>
<NavLink to="user/reviews">My Reviews</NavLink>
<NavLink to="user/favorites">Favorite Meals</NavLink>
</nav>
)}


{/* Chef Menu */}
{role === "chef" && (
<nav className="space-y-2 p-4">
<NavLink to="chef/profile">My Profile</NavLink>
<NavLink to="chef/create-meal">Create Meal</NavLink>
<NavLink to="chef/meals">My Meals</NavLink>
<NavLink to="chef/orders">Order Requests</NavLink>
</nav>
)}


{/* Admin Menu */}
{role === "admin" && (
<nav className="space-y-2 p-4">
<NavLink to="admin/profile">My Profile</NavLink>
<NavLink to="admin/users">Manage Users</NavLink>
<NavLink to="admin/requests">Manage Requests</NavLink>
<NavLink to="admin/stats">Platform Statistics</NavLink>
</nav>
)}
</aside>
);
}
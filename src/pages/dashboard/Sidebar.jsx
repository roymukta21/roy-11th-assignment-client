import { NavLink } from "react-router";
import { FaUserCircle, FaUser, FaChartBar, FaHome } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <div className="w-64 bg-white shadow-md min-h-screen">
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <span className="text-2xl">👨‍🍳</span>

        <div>
          <p className="font-semibold capitalize">{user?.role || "user"}</p>

          <p className="text-sm text-orange-700">{user?.email}</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="px-4 py-4 space-y-1 text-gray-700">
        <MenuItem to="/" icon={<FaHome />} label="Home" />
        <MenuItem
          to="/dashboard/profile"
          icon={<FaUser />}
          label="My Profile"
        />
        {/* <MenuItem to="/dashboard/manage-decorators" icon={<FaUsers />} label="Manage Decorators" />
        <MenuItem to="/dashboard/add-services" icon={<FaPlus />} label="Add Services" />
        <MenuItem to="/dashboard/manage-services" icon={<FaCogs />} label="Manage Services" />
        <MenuItem to="/dashboard/manage-bookings" icon={<FaClipboardList />} label="Manage Bookings" />
        <MenuItem to="/dashboard/assign-decorator" icon={<FaUserCheck />} label="Assign Decorator" /> */}

        {/* Highlighted Revenue */}
        {/* <MenuItem
          to="/dashboard/admin-revenue"
          icon={<FaMoneyBillWave />}
          label="Revenue Monitoring"
          highlight
        /> */}

        <MenuItem
          to="/dashboard/analytics"
          icon={<FaChartBar />}
          label="Analytics Charts"
        />
      </nav>
    </div>
  );
}

function MenuItem({ to, icon, label, highlight }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition
        ${
          isActive || highlight
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-100"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}

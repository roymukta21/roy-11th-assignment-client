import { NavLink } from "react-router";
import {
  FaUserCircle,
  FaUser,
  FaTachometerAlt,
  FaUsers,
  FaPlus,
  FaCogs,
  FaClipboardList,
  FaUserCheck,
  FaMoneyBillWave,
  FaChartBar,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-md min-h-screen">
  
      {/* Admin Info */}
      <div className="flex items-center gap-3 px-6 py-4 border-b">
        <FaUserCircle className="text-4xl text-gray-400" />
        <div>
          <p className="font-semibold">Admin User</p>
          <p className="text-sm text-gray-500">admin@example.com</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="px-4 py-4 space-y-1 text-gray-700">
        <MenuItem to="/dashboard/profile" icon={<FaUser />} label="My Profile" />
        <MenuItem to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" />
        <MenuItem to="/dashboard/manage-decorators" icon={<FaUsers />} label="Manage Decorators" />
        <MenuItem to="/dashboard/add-services" icon={<FaPlus />} label="Add Services" />
        <MenuItem to="/dashboard/manage-services" icon={<FaCogs />} label="Manage Services" />
        <MenuItem to="/dashboard/manage-bookings" icon={<FaClipboardList />} label="Manage Bookings" />
        <MenuItem to="/dashboard/assign-decorator" icon={<FaUserCheck />} label="Assign Decorator" />

        {/* Highlighted Revenue */}
        <MenuItem
          to="/dashboard/admin-revenue"
          icon={<FaMoneyBillWave />}
          label="Revenue Monitoring"
          highlight
        />

        <MenuItem to="/dashboard/analytics" icon={<FaChartBar />} label="Analytics Charts" />
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

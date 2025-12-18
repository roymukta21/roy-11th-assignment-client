// src/components/Navbar.jsx
// Modern, responsive, recruiter-friendly navbar (Tailwind + React Router)

import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? 'text-indigo-600 font-semibold'
      : 'text-gray-600 hover:text-indigo-600';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-indigo-600">🍳</span>
          <span className="text-xl font-bold text-gray-800">LocalChefBazaar</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/meals" className={navLinkClass}>Meals</NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Profile Image */}
              <img
                src={user.photoURL || 'https://i.ibb.co/2kR9ZQp/user.png'}
                alt="profile"
                className="w-9 h-9 rounded-full border"
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

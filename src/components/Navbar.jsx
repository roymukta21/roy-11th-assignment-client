import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold"
      : "text-gray-600 hover:text-indigo-600";

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/meals" className={navLinkClass}>
          Meals
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white rounded-box mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img className="w-8" src="/public/localChefBazaar.png" alt="logo" />
            <span className="text-xl font-bold text-gray-800">
              LocalChefBazaar
            </span>
          </Link>
        </div>

        {/* Center (Desktop Menu) */}
        <div className="hidden md:flex">
          <ul className="flex gap-8">{links}</ul>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* THEME TOGGLE BUTTON */}
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            defaultChecked={localStorage.getItem("theme") === "dark"}
            className="toggle"
          />

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
              {/* Avatar */}
              <div className="relative group">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kR9ZQp/user.png"}
                  alt="profile"
                  className="w-9 h-9 rounded-full border cursor-pointer"
                />
                <div className="absolute left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block bg-white text-sm px-2 py-1 rounded shadow">
                  {user.displayName || "User"}
                </div>
              </div>

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

import { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { Menu, X, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import { IoHome } from "react-icons/io5";
//import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const dropdownRef = useRef(null);

  /* ================= THEME ================= */
  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  /* ================= LOGOUT ================= */
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= ACTIVE ================= */
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  /* ================= MENU ================= */
  const menuItems = [
    { name: "Home", path: "/", icon: IoHome },
    { name: "Meals", path: "/meals" },
    { name: "AboutUs", path:"/aboutUs" },
    ...(user ? [{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
       { name: "Favorites", path: "/dashboard/favorites" }
    ] : []),
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img className="w-8" src="/localChefBazaar.png" alt="logo" />
            <span className="text-lg font-bold text-orange-500">
              LocalChefBazaar
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* THEME TOGGLE */}
            <input
              type="checkbox"
              className="toggle"
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={theme === "dark"}
            />

            {/* LOGOUT BUTTON (desktop) */}
            {user && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1 px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            )}

            {/* USER */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="cursor-pointer"
                >
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full"
                    alt="avatar"
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <UserCircle className="w-5 h-5 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-orange-500 hover:bg-orange-50"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className=" sm:flex gap-2">
                <Link
                  to="/login"
                  className="border border-orange-500 text-orange-500 px-4 py-2 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded"
                >
                  Register
                </Link>
              </div>
            )}

            {/* MOBILE BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded ${
                    isActive(item.path)
                      ? "bg-orange-50 text-orange-500"
                      : "hover:bg-orange-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* LOGOUT BUTTON (mobile) */}
              {user && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

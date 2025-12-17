import { Link } from "react-router";
import useAuth from "../context/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="navbar bg-base-100 shadow px-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold">
          LocalChefBazaar
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span className="text-sm">{user.email}</span>
            <button onClick={handleLogout} className="btn btn-sm btn-error">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

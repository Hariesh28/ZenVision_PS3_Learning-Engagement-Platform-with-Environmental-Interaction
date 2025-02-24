import { NavLink } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";

const Navbar = () => {
  const { userId, isSignedIn, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const signinlinkClass =
    "bg-gray-300 text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const buttonClass =
    "bg-gray-300 text-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-purple-800 border-b border-black">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                EduMateria
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2 items-center">
                <NavLink to="/" className={linkClass}>
                  Home
                </NavLink>
                <NavLink to="/dashboard" className={linkClass}>
                  AI Helper
                </NavLink>
                <NavLink to="/profile" className={linkClass}>
                  Profile
                </NavLink>
                {isSignedIn ? (
                  <button onClick={logout} className={buttonClass}>
                    Logout
                  </button>
                ) : (
                  <NavLink to="/signin" className={signinlinkClass}>
                    Sign In
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

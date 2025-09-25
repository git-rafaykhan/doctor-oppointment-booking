import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSettingsSharp, IoLogOut  } from "react-icons/io5"; 
import { FaCalendarPlus, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [token, setToken] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex items-center justify-between shadow-md">
      {/* Left side - Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold tracking-wide cursor-pointer"
      >
        Medi<span className="text-blue-200">Connect</span>
      </div>

      {/* Middle - Links */}
      <div className="flex space-x-8 font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `transition hover:text-blue-200 ${
              isActive ? "font-semibold border-b-2 border-white pb-1" : ""
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            `transition hover:text-blue-200 ${
              isActive ? "font-semibold border-b-2 border-white pb-1" : ""
            }`
          }
        >
          All Doctors
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `transition hover:text-blue-200 ${
              isActive ? "font-semibold border-b-2 border-white pb-1" : ""
            }`
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `transition hover:text-blue-200 ${
              isActive ? "font-semibold border-b-2 border-white pb-1" : ""
            }`
          }
        >
          Contact
        </NavLink>
      </div>

      {/* Right side - Auth/Profile */}
      <div>
        {token ? (
          <div className="relative">
            {/* Profile icon */}
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center"
            >
              <FaUserCircle
                size={32}
                className="hover:text-blue-200 transition duration-200"
              />
            </button>

            {/* Dropdown menu */}
            {openMenu && (
            <div className="absolute right-0 mt-3 w-44 bg-white text-gray-700 rounded-xl shadow-lg overflow-hidden z-50">
                <button
                onClick={() => {
                    navigate("/settings");
                    setOpenMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full text-left"
                >
                <IoSettingsSharp /> Settings
                </button>
                <button
                onClick={() => {
                    navigate("/my-oppointments");
                    setOpenMenu(false);
                }}
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full text-left"
                >
                <FaCalendarPlus /> Appointments
                </button>
                <button
                onClick={() =>{
                   setToken(false);
                   localStorage.removeItem("token")
                }}
                className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 w-full text-left text-red-600"
                >
                <IoLogOut /> Logout
                </button>
            </div>
            )}

          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-100 transition shadow-sm"
          >
            Create Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { FaCalendarPlus, FaUserCircle } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi"; // hamburger + close icon

const Navbar = () => {
  const [token, setToken] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/doctors", label: "All Doctors" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      {/* Left side - Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-2xl font-bold tracking-wide cursor-pointer"
      >
        Medi<span className="text-blue-200">Connect</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `transition hover:text-blue-200 ${
                isActive ? "font-semibold border-b-2 border-white pb-1" : ""
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Right side - Auth/Profile */}
      <div className="hidden md:block">
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
                  onClick={() => {
                    setToken(false);
                    localStorage.removeItem("token");
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

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? (
            <HiX size={28} className="text-white" />
          ) : (
            <HiMenu size={28} className="text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-blue-600 text-white flex flex-col items-start px-6 py-4 space-y-4 md:hidden z-40">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block w-full transition hover:text-blue-200 ${
                  isActive ? "font-semibold border-b-2 border-white pb-1" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Auth Buttons for Mobile */}
          {token ? (
            <>
              <button
                onClick={() => {
                  navigate("/settings");
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left"
              >
                <IoSettingsSharp /> Settings
              </button>
              <button
                onClick={() => {
                  navigate("/my-oppointments");
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left"
              >
                <FaCalendarPlus /> Appointments
              </button>
              <button
                onClick={() => {
                  setToken(false);
                  localStorage.removeItem("token");
                  setMobileOpen(false);
                }}
                className="flex items-center gap-2 w-full text-left text-red-300"
              >
                <IoLogOut /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMobileOpen(false);
              }}
              className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-blue-100 transition shadow-sm w-full text-center"
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

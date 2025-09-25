import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const context = useContext(AdminContext);
  const doctorContext = useContext(DoctorContext);

  if (!context || !doctorContext) return null;

  const { adminToken, setAdminToken } = context;
  const { setDoctorToken } = doctorContext;

  const handleLogout = () => {
    if (adminToken) {
      localStorage.removeItem("atoken");
      setAdminToken(null);
    } else {
      localStorage.removeItem("dtoken");
      setDoctorToken(null);
    }
  };

  return (
    <nav className="bg-white border-b shadow-sm fixed w-full top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
          MediConnect
        </h1>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <span className="text-gray-600 font-medium">
            {adminToken ? "Admin Dashboard" : "Doctor Dashboard"}
          </span>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

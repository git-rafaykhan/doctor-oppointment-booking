import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";
import { FaHome, FaUserMd, FaUser, FaCalendarAlt, FaPlus } from "react-icons/fa";

const Sidebar = () => {
  const doctorCtx = useContext(DoctorContext);
  const adminCtx = useContext(AdminContext);

  const dToken = doctorCtx?.doctorToken;
  const adminToken = adminCtx?.adminToken;

  const adminMenu = [
    { label: "Dashboard", path: "/admin-dashboard", icon: <FaHome /> },
    { label: "Appointments", path: "/all-appointments", icon: <FaCalendarAlt /> },
    { label: "Add Doctor", path: "/add-doctor", icon: <FaPlus /> },
    { label: "Doctors List", path: "/all-doctors", icon: <FaUserMd /> },
  ];

  const doctorMenu = [
    { label: "Dashboard", path: "/doctor-dashboard", icon: <FaHome /> },
    { label: "Appointments", path: "/doctor-appointments", icon: <FaCalendarAlt /> },
    { label: "Profile", path: "/doctor-profile", icon: <FaUser /> },
  ];

  const menu = adminToken ? adminMenu : dToken ? doctorMenu : [];

  if (menu.length === 0) return null;

  return (
    <div className="h-screen w-64 bg-white border-r fixed left-0 top-0 shadow-sm">
      <div className="px-6 py-5 border-b">
        <h1 className="text-xl font-bold text-blue-600">MediConnect</h1>
      </div>
      <ul className="mt-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 px-6 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition 
              ${isActive ? "bg-blue-100 text-blue-600 font-semibold border-r-4 border-blue-600" : ""}`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <p>{item.label}</p>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

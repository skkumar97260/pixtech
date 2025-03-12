import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiPhone, FiBriefcase, FiMonitor, FiUsers, FiTool } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import {VscGitStashApply} from "react-icons/vsc"
import { isAuthenticated } from "../Utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  const logout = () => {
    try {
      if (isAuthenticated()) {
        localStorage.clear();
        navigate("/");
        toast.success("Logout Successfully");
      } else {
        toast.error("You are not logged in");
      }
    } catch (error) {
      toast.error("Internal Server Error");
      navigate("/");
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-[#13266A] text-white transition-transform ${
        isOpen ? "lg:w-64 w-40" : "w-16"
      } z-40`}
    >
      {/* Logo Section */}
      <div className="p-4 font-bold text-xl border-b border-gray-700">
        {isOpen ? "Admin Panel" : "Panel"}
      </div>

      {/* Navigation Items */}
      <nav className="p-4 space-y-4">
        <Link to="/dashboard" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiHome className="text-lg" />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <Link to="/ourclients" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiUsers className="text-lg" />
          {isOpen && <span>Our Clients</span>}
        </Link>

        <Link to="/jobopenings" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiBriefcase className="text-lg" />
          {isOpen && <span>Job Openings</span>}
        </Link>

        <Link to="/hiredevelopers" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiTool className="text-lg" />
          {isOpen && <span>Hire Developers</span>}
        </Link>

        <Link to="/laptoprental" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiMonitor className="text-lg" />
          {isOpen && <span>Laptop Rental</span>}
        </Link>

        <Link to="/contactus" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiPhone className="text-lg" />
          {isOpen && <span>Contact Us</span>}
        </Link>
        <Link to="/applies" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <VscGitStashApply className="text-lg" />
          {isOpen && <span>Applies</span>}
        </Link>

        <Link to="/coworkingspace" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiUsers className="text-lg" />
          {isOpen && <span>Coworking Space</span>}
        </Link>

        <Link to="/services" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiSettings className="text-lg" />
          {isOpen && <span>Services</span>}
        </Link>

        <Link to="/profile" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FiUser className="text-lg" />
          {isOpen && <span>Profile</span>}
        </Link>

        <button onClick={logout} className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded w-full text-left">
          <MdOutlineLogout className="text-lg" />
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;

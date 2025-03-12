import React from "react";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";
import logo from "../Assests/Images/pixalive_logo.jpeg";
const Header = ({ toggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
      <img src={logo} className="h-12 w-12 object-contain"></img>
        <button
          className="text-gray-800"
          onClick={toggleSidebar} 
        >
          <FiMenu className="text-2xl" />
        </button>
        </div>

        <h1 className="text-xl font-bold text-yellow-950 ">Pixalive Panel</h1>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <FiSearch className="text-xl" />
          </button>
          <button className="text-gray-600 hover:text-gray-800">
            <FiBell className="text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

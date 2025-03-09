import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import pixalive from "../Assests/Images/pixalive_logo.jpeg";
import { CiSearch } from "react-icons/ci";
import { IoMenu, IoClose } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import { getServices } from "../Api/services";
import {getDevelopers} from "../Api/hireDevelopers"
import { saveSearchQuery ,getSearchQuery} from "../Utils/storage";
const MainHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState("/");
    const [showSearch, setShowSearch] = useState(false); // State to show/hide the full-screen search
    const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
       saveSearchQuery(searchTerm);
      navigate(`/search?query=${getSearchQuery()}`); // Navigate to Search.jsx with search term

  };

    const handleSearchClick = () => {
        setActiveItem("Search");
        setShowSearch(true); // Show the full-screen search pop-up
    };



    const closeSearch = () => {
        setShowSearch(false); // Close the search pop-up when the close button or overlay is clicked
    };
      
        const [services, setServices] = useState([]);
        useEffect(() => {
            getservices();
        },[])
        const getservices = async() => {
        try {
            const res = await getServices();
            setServices(res?.data?.result || []);
            console.log("res",res)
        } catch (error) {
            console.log("error",error);
        }
        }
        useEffect(() => {
            fetchDevelopers();
          }, []);
          const [developers, setDevelopers] = useState([]);
          const fetchDevelopers = async () => {
        
            try {
              const res = await getDevelopers();
              setDevelopers(res?.data?.result || []);
            } catch (error) {
              console.log("Error fetching Developers", error);
            }
          };
          
    return (
        <div>

            <div className="w-full flex items-center gap-6 lg:justify-center lg:items-center justify-between px-5 lg:px-20 py-1 bg-white shadow-md">
                <div>
                    <img src={pixalive} alt="pixalive" className="w-20 h-20" />
                </div>

                {/* Navigation for Desktop */}
                <nav className="hidden lg:flex space-x-6 text-gray-700 font-semibold">
                    {[
                        { name: "Home", path: "/" },
                        { name: "About", path: "/About" },
                        { name: "Our Clients", path: "/Our-Clients" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`${activeItem === item.name
                                    ? "text-yellow-600 border-b-4 border-yellow-600"
                                    : ""
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2`}
                            onClick={() => setActiveItem(item.name)}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* Services Dropdown */}
                    <div className="relative group">
                        <button
                            className={`${activeItem === "Services"
                                    ? "text-yellow-600 border-b-4 border-yellow-600"
                                    : ""
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
                            onClick={() => setActiveItem("Services")}
                        >
                            Services <FiChevronDown className="text-sm" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-56">
                        {services.map((sub) => (
                        <Link
                            key={sub.title}
                            to={{
                                                      pathname: "/services",
                                                      search: `?id=${sub?._id}`,
                                                    }}
                            className="block px-4 py-2 hover:bg-pink-100"
                            onClick={() => setActiveItem(sub.name)}
                        >
                            {sub.title}
                        </Link>
                    ))}
                        </div>
                    </div>

                    {/* Hire Developers Dropdown */}
                    <div className="relative group">
                        <button
                            className={`${activeItem === "Hire Developers"
                                    ? "text-yellow-600 border-b-4 border-yellow-600"
                                    : ""
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
                            onClick={() => setActiveItem("Hire Developers")}
                        >
                            Hire Developers <FiChevronDown className="text-sm" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-60">
                            {developers.map((dev) => (
                                <Link
                                    key={dev}
                                    to={{
                                                      pathname: "/Hire-Developers",
                                                      search: `?id=${dev?._id}`,
                                                    }}
                                    className="block px-4 py-2 hover:bg-pink-100"
                                >
                                    {dev.role}
                                </Link>
                            ))}
                        </div>
                    </div>
                    {[
                        { name: "Coworking Space", path: "/Co-working-Space" },
                        { name: "Laptops Rental", path: "/Laptop-Rental" },
                        { name: "Contact Us", path: "/Contact-us" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`${activeItem === item.name
                                    ? "text-yellow-600 border-b-4 border-yellow-600"
                                    : ""
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2`}
                            onClick={() => setActiveItem(item.name)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    {/* Careers Dropdown */}
                    <div className="relative group">
                        <button
                            className={`${activeItem === "Careers"
                                    ? "text-yellow-600 border-b-4 border-yellow-600"
                                    : ""
                                } hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
                            onClick={() => setActiveItem("Careers")}
                        >
                            Careers <FiChevronDown className="text-sm" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-48">
                            {[
                                { name: "Career Policy", path: "/Careers/Career-Policy" },
                                { name: "Job Openings", path: "/Careers/Job-Openings" },
                            ].map((career) => (
                                <Link
                                    key={career.name}
                                    to={career.path}
                                    className="block px-4 py-2 hover:bg-pink-100"
                                    onClick={() => setActiveItem(career.name)}
                                >
                                    {career.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>

                <div className="hidden lg:flex">
                    <CiSearch
                        className={`${activeItem === "Search" ? "text-yellow-600" : ""} cursor-pointer`}
                        onClick={handleSearchClick}
                    />
                </div>
                {showSearch && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-10 w-full max-w-md">
                        <button
                            onClick={closeSearch}
                            className="relative  bottom-5 left-[98%] text-yellow-950 hover:text-gray-700 text-2xl font-bold"
                        >
                            ✕
                        </button>
                        <form onSubmit={handleSearch} className="flex flex-col items-center">
                            <input
                                type="text"
                                value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter your search..."
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            />
                            <button
                                type="submit"
                                className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-500"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            )}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-gray-700"
                >
                    {menuOpen ? <IoClose className="h-8 w-8" /> : <IoMenu className="h-8 w-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
    <div className="lg:hidden bg-white shadow-md py-4 px-6 relative z-50">
        <nav className="flex flex-col space-y-3 text-gray-700 font-semibold">
            {[
                { name: "Home", path: "/" },
                { name: "About", path: "/About" },
                { name: "Our Clients", path: "/Our-Clients" },
            ].map((item) => (
                <Link
                    key={item.name}
                    to={item.path}
                    className={`${activeItem === item.name ? "text-yellow-600 border-b-4 border-yellow-600" : ""} hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2`}
                    onClick={() => setActiveItem(item.name)}
                >
                    {item.name}
                </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group z-50">
                <button
                    className={`${activeItem === "Services" ? "text-yellow-600 border-b-4 border-yellow-600" : ""} hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
                    onClick={() => setActiveItem("Services")}
                >
                    Services <FiChevronDown className="text-sm" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-60 z-50">
                    {services.map((sub) => (
                        <Link
                            key={sub.title}
                            to={{
                                                      pathname: "/services",
                                                      search: `?id=${sub?._id}`,
                                                    }}
                            className="block px-4 py-2 hover:bg-pink-100"
                            onClick={() => setActiveItem(sub.name)}
                        >
                            {sub.title}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Hire Developers Dropdown */}
            <div className="relative group z-10">
                <button
                    className={`${activeItem === "Hire Developers" ? "text-yellow-600 border-b-4 border-yellow-600" : ""} hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
                    onClick={() => setActiveItem("Hire Developers")}
                >
                    Hire Developers <FiChevronDown className="text-sm" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-60 z-50">
                    {developers.map((dev) => (
                        <Link
                            key={dev}
                            to={{
                                                      pathname: "/Hire-Developers",
                                                      search: `?id=${dev?._id}`,
                                                    }}
                            className="block px-4 py-2 hover:bg-pink-100"
                        >
                            {dev.role}
                        </Link>
                    ))}
                </div>
            </div>
            {[
                { name: "Coworking Space", path: "/Co-working-Space" },
                { name: "Laptops Rental", path: "/Laptop-Rental" },
                { name: "Contact Us", path: "/Contact-us" },
            ].map((item) => (
                <Link
                    key={item.name}
                    to={item.path}
                    className={`${activeItem === item.name ? "text-yellow-600 border-b-4 border-yellow-600" : ""} hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2`}
                    onClick={() => setActiveItem(item.name)}
                >
                    {item.name}
                </Link>
            ))}
            {/* Careers Dropdown */}
            <div className="relative group z-10">
                <button
                    className={`${activeItem === "Careers" ? "text-yellow-600 border-b-4 border-yellow-600" : ""} hover:text-yellow-600 hover:border-b-4 border-yellow-600 pb-2 flex items-center gap-1`}
                    onClick={() => setActiveItem("Careers")}
                >
                    Careers <FiChevronDown className="text-sm" />
                </button>
                <div className="absolute hidden group-hover:block bg-white shadow-md rounded-lg p-2 w-48 z-50">
                    {[
                        { name: "Career Policy", path: "/Careers/Career-Policy" },
                        { name: "Job Openings", path: "/Careers/Job-Openings" },
                    ].map((career) => (
                        <Link
                            key={career.name}
                            to={career.path}
                            className="block px-4 py-2 hover:bg-pink-100"
                            onClick={() => setActiveItem(career.name)}
                        >
                            {career.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>

        {/* Search Icon */}
        <div className="flex p-5 z-50">
            <CiSearch
                className={`${activeItem === "Search" ? "text-yellow-600" : ""} cursor-pointer`}
                onClick={handleSearchClick}
            />
        </div>

        {/* Search Modal */}
        {showSearch && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-10 w-full max-w-md relative z-50">
                    <button
                        onClick={closeSearch}
                        className="absolute top-2 right-4 text-yellow-950 hover:text-gray-700 text-2xl font-bold"
                    >
                        ✕
                    </button>
                    <form onSubmit={handleSearch} className="flex flex-col items-center">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter your search..."
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <button
                            type="submit"
                            className="bg-yellow-600 text-white py-2 px-6 rounded-lg hover:bg-yellow-500"
                            
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        )}
    </div>
)}

        </div>
    );
};

export default MainHeader;

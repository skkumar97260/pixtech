import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleLaptop } from "../../Api/laptopRental";
import { FiArrowLeft } from "react-icons/fi";

const ViewLaptop = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [laptop, setLaptop] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchLaptopDetails();
  }, []);

  const fetchLaptopDetails = async () => {
    try {
      const data = await getSingleLaptop(id);
      setLaptop(data?.data?.result);
      console.log(id, data);
    } catch (error) {
      console.log("Error fetching laptop details", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-6 mt-16">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
            
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#13266A]">View Laptop</h2>
              <Link to="/laptoprental">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex items-center gap-2">
                  <FiArrowLeft className="text-xl" /> Laptops List
                </button>
              </Link>
            </div>

            {/* Laptop Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Laptop Name */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Title</p>
                <p className="text-lg font-semibold">{laptop?.title || "N/A"}</p>
              </div>

              {/* Laptop Image */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Image</p>
                {laptop?.img ? (
                  <img src={laptop.img} alt="Laptop Image" className="h-16 w-16 rounded-lg object-cover" />
                ) : (
                  <p className="text-lg font-semibold">No Image</p>
                )}
              </div>

              {/* Laptop Price */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Price</p>
                <p className="text-lg font-semibold">{laptop?.price ? `$${laptop.price}` : "N/A"}</p>
              </div>

              {/* Laptop Status */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Status</p>
                <p className={`text-lg font-semibold ${laptop?.status === 1 ? "text-green-600" : "text-red-600"}`}>
                  {laptop?.status === 1 ? "Available" : "Out of Stock"}
                </p>
              </div>

              {/* Date Added */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Date Added</p>
                <p className="text-lg font-semibold">
                  {laptop?.createdAt ? new Date(laptop.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLaptop;

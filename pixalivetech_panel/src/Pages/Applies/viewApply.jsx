import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleApply } from "../../Api/applies";

const ViewApply = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [Apply, setApply] = useState(null);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    getApplyDetails();
  }, []);

  const getApplyDetails = async() => {
  try {
    const data= await getSingleApply(id)
    setApply(data?.data?.result)
  } catch (error) {
    console.log(error);
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#13266A]">
                View Apply
              </h2>
              <Link to="/applies">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition">
                  Apply List
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Title</p>
                <p className="text-lg font-semibold">{Apply?.title || "N/A"}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Name</p>
                <p className="text-lg font-semibold">{Apply?.name || "N/A"}</p>
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Email</p>
                <p className="text-lg font-semibold">{Apply?.email || "N/A"}</p>
              </div>


              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Mobile Number</p>
                <p className="text-lg font-semibold">{Apply?.mobileNumber || "N/A"}</p>
              </div>
              
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Resume</p>
                <p className="text-lg font-semibold">{Apply?.resume || "N/A"}</p>    
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApply;

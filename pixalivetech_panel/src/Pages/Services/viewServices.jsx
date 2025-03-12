import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleService } from "../../Api/services";
import { FiArrowLeft } from "react-icons/fi";

const ViewServices = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [Services, setServices] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchServicesDetails();
  }, []);

  const fetchServicesDetails = async () => {
    try {
      const data = await getSingleService(id);
      setServices(data?.data?.result);
      console.log(id,data);
    } catch (error) {
      console.log("Error fetching Services details", error);
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
                View Services
              </h2>
              <Link to="/services">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex  justify-center items-center gap-2">
                                         <FiArrowLeft className="text-xl" /> Servicess List 
                                       </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Title</p>
                <p className="text-lg font-semibold">{Services?.title|| "N/A"}</p>
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Introduction</p>
                {Services?.introduction?.map((intro, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {intro}
                  </p>
                ))}
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Expertise (Platform & Technologies)</p>
              {Services?.expertiseList?.map((exp, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    <strong>{exp.platform}:</strong> {exp.technologies}
                  </p>
                ))}
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Call To Action</p>
                <p className="text-gray-700 text-sm">
                  <strong>Text:</strong> {Services?.callToAction?.text}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Link Text:</strong> {Services?.callToAction?.linkText}
                </p>
            
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default ViewServices;

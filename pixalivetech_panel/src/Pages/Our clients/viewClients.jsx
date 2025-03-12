import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleClient } from "../../Api/ourClient";
import { FiArrowLeft } from "react-icons/fi";

const ViewClient = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [client, setClient] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchClientDetails();
  }, []);

  const fetchClientDetails = async () => {
    try {
      const data = await getSingleClient(id);
      setClient(data?.data?.result);
      console.log(id,data);
    } catch (error) {
      console.log("Error fetching client details", error);
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
                View Client
              </h2>
              <Link to="/ourclients">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex  justify-center items-center gap-2">
                                         <FiArrowLeft className="text-xl" /> Clients List 
                                       </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Name</p>
                <p className="text-lg font-semibold">{client?.name || "N/A"}</p>
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Logo</p>
                {client?.logo ? (
                  <img src={client.logo} alt="Client Logo" className="h-16 w-16 rounded-full object-cover" />
                ) : (
                  <p className="text-lg font-semibold">No Logo</p>
                )}
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Status</p>
                <p className={`text-lg font-semibold ${client?.status === 1 ? "text-green-600" : "text-red-600"}`}>
                  {client?.status === 1 ? "Active" : "Inactive"}
                </p>
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Date Added</p>
                <p className="text-lg font-semibold">
                  {client?.createdAt ? new Date(client.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewClient;

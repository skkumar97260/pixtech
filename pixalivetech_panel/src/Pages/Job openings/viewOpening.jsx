import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleOpening } from "../../Api/openings";
import { FiArrowLeft } from "react-icons/fi";

const ViewOpenings = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [Openings, setOpenings] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchOpeningsDetails();
  }, []);

  const fetchOpeningsDetails = async () => {
    try {
      const data = await getSingleOpening(id);
      setOpenings(data?.data?.result);
      console.log(id,data);
    } catch (error) {
      console.log("Error fetching Openings details", error);
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
                View Openings
              </h2>
              <Link to="/jobopenings">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex  justify-center items-center gap-2">
                                         <FiArrowLeft className="text-xl" /> Openings List 
                                       </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Title</p>
                <p className="text-lg font-semibold">{Openings?.title|| "N/A"}</p>
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Description</p>
                {Openings?.description?.map((des, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i+1}{des}
                  </p>
                ))}
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Qualifications</p>
                {Openings?.qualifications?.map((qua, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i+1}{qua}
                  </p>
                ))}
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Extra Qualifications</p>
                {Openings?.extraQualifications?.map((qua, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i+1}{qua}
                  </p>
                ))}
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Email</p>
                <p className="text-lg font-semibold">{Openings?.email|| "N/A"}</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">vacancies</p>
                <p className="text-lg font-semibold">{Openings?.vacancies|| "N/A"}</p>  
              </div>

        </div>
      </div>
    </div>
  </div>
  </div>
  );
};

export default ViewOpenings;

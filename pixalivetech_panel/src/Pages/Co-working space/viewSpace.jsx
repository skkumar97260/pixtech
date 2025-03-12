import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleSpace } from "../../Api/workSpace";
import { FiArrowLeft } from "react-icons/fi";

const ViewSpace = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [Space, setSpace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchSpaceDetails();
  }, []);

  const fetchSpaceDetails = async () => {
    try {
      const data = await getSingleSpace(id);
      setSpace(data?.data?.result);
      console.log(id,data);
    } catch (error) {
      console.log("Error fetching Space details", error);
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
                View Space
              </h2>
              <Link to="/coworkingspace">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex  justify-center items-center gap-2">
                                         <FiArrowLeft className="text-xl" /> Spaces List 
                                       </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Title</p>
                <p className="text-lg font-semibold">{Space?.title|| "N/A"}</p>
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Introduction</p>
                {Space?.introduction?.map((intro, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {intro}
                  </p>
                ))}
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Facilities</p>
                
                {Space?.facilities?.map((fac, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                  {`${i + 1}.`} {fac}
                  </p>
                ))}
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Description</p>
                {Space?.description?.map((desc, i) => (
                    
                  <p key={i} className="text-gray-700 text-sm">
                    {desc}
                  </p>
                ))}
              </div>
            </div>

            <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Ways of Working</p>
                {Space?.waysOfWorking?.length > 0 ? (
              Space?.waysOfWorking?.map((wayOfWorking, index) => (
                <div key={index} className="flex flex-col">
                  <h3><strong>{`Way ${index + 1}:`}</strong></h3>
                  <h3><strong>Type:</strong> {wayOfWorking.type || "Null"}</h3>
                  <p><strong>Description:</strong> {wayOfWorking.description || "Null"}</p>
                  <strong>Features:</strong>
                  {wayOfWorking.features?.length > 0 ? (
                    <ul>
                      {wayOfWorking.features
                        .filter(feature => feature.trim() !== "")
                        .map((feature, i) => (
                          <li key={i}><strong>{`${i + 1}`}</strong>: {feature}</li>
                        ))}
                    </ul>
                  ) : (
                    <p>No features</p>
                  )}
                </div>
              ))
            ) : (
              <p>No ways of working</p>
            )}
              </div>
            
          </div>
        </div>
      </div>
    </div>
 
  );
};

export default ViewSpace;

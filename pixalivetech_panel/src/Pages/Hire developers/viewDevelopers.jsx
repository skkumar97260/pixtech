import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleDeveloper } from "../../Api/developers";
import { FiArrowLeft } from "react-icons/fi";

const ViewDeveloper = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [Developer, setDeveloper] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (id) fetchDeveloperDetails();
  }, [id]); // ✅ Include 'id' in the dependency array

  const fetchDeveloperDetails = async () => {
    try {
      const data = await getSingleDeveloper(id);
      setDeveloper(data?.data?.result);
      console.log(id, data);
    } catch (error) {
      console.log("Error fetching Developer details", error);
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
              <h2 className="text-xl font-semibold text-[#13266A]">View Developer</h2>
              <Link to="/hiredevelopers">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex justify-center items-center gap-2">
                  <FiArrowLeft className="text-xl" /> Developers List
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Title</p>
                <p className="text-lg font-semibold">{Developer?.title || "N/A"}</p>
              </div>

              {/* Introduction */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Introduction</p>
                {Developer?.introduction?.map((intro, i) => (
                  <p key={i} className="text-gray-700 text-sm">{intro}</p>
                )) || <p className="text-sm">No Introduction Available</p>}
              </div>

              {/* Highlights */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Highlights</p>
                {Developer?.highlights?.length ? (
                  Developer.highlights.map((high, i) => (
                    <p key={i} className="text-gray-700 text-xs">{`${i + 1}.`} {high}</p>
                  ))
                ) : (
                  <p className="text-sm">No Highlights Available</p>
                )}
              </div>

              {/* Services */}
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Services</p>
                {Developer?.services?.title ? (
                  <div>
                    <h3 className="font-semibold">{Developer.services.title}</h3>
                    <p className="text-sm">{Developer.services.description || "N/A"}</p>
                    <strong>Items:</strong>
                    {Developer.services.items?.length ? (
                      <ul className="list-disc pl-4 text-sm">
                        {Developer.services.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm">No Services Available</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm">No Services Available</p>
                )}
              </div>
            </div>

            {/* Why Us Section */}
            <div className="p-4 border rounded-md">
              <p className="text-gray-600 font-medium">Why Us</p>
              <h3 className="font-semibold">{Developer?.whyUs?.title || "N/A"}</h3>
              <p className="text-sm">{Developer?.whyUs?.description || "N/A"}</p>
            </div>

            {/* Hiring Models Section */}
            <div className="p-4 border rounded-md">
              <p className="text-gray-600 font-medium">Hiring Models</p>
              <h3 className="font-semibold">{Developer?.hiringModels?.title || "N/A"}</h3>
              {Developer?.hiringModels?.options?.length ? (
                <ul className="list-disc pl-4 text-sm">
                  {Developer.hiringModels.options.map((option, i) => (
                    <li key={i}>
                      <strong>{option.name}</strong>: {option.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">No Hiring Models Available</p>
              )}
              <h3 className="font-semibold mt-1">Conclusion:</h3>
              <p className="text-sm">{Developer?.hiringModels?.conclusion || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDeveloper;

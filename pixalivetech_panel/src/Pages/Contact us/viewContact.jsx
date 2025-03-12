import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { getSingleUsers } from "../../Api/contactUs";

const ViewContact = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [contact, setContact] = useState(null);
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    getContactDetails();
  }, []);

  const getContactDetails = async() => {
  try {
    const data= await getSingleUsers(id)
    setContact(data?.data?.result)
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
                View Contact
              </h2>
              <Link to="/contactus">
                <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition">
                  Contact List
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Name</p>
                <p className="text-lg font-semibold">{contact?.name || "N/A"}</p>
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Email</p>
                <p className="text-lg font-semibold">{contact?.email || "N/A"}</p>
              </div>


              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Mobile Number</p>
                <p className="text-lg font-semibold">{contact?.mobileNumber || "N/A"}</p>
              </div>
              
              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Subject</p>
                <p className="text-lg font-semibold">{contact?.subject || "N/A"}</p>    
              </div>

              <div className="p-4 border rounded-md">
                <p className="text-gray-600 font-medium">Message</p>
                <p className="text-lg font-semibold">{contact?.message || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;

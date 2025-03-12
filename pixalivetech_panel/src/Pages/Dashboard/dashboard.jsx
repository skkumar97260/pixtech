import React, { useState } from "react";
import { BarChart, Users, Briefcase, UserPlus } from "lucide-react";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sections, setSections] = useState({
    hiring: true,
    clients: true,
  });

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Function to toggle individual sections
  const toggleSection = (section) => {
    setSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"
        }`}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main Dashboard Content */}
        <main className="p-6 bg-gray-50 flex-1 mt-16">
          {/* Overview Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Hiring */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
              <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Open Positions</h2>
                <p className="text-2xl font-bold">25</p>
              </div>
            </div>

            {/* Careers */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-lg">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Applications</h2>
                <p className="text-2xl font-bold">1,560</p>
              </div>
            </div>

            {/* Clients */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
              <div className="bg-yellow-100 text-yellow-600 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Clients</h2>
                <p className="text-2xl font-bold">123</p>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
              <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                <BarChart className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Performance</h2>
                <p className="text-2xl font-bold">98%</p>
              </div>
            </div>
          </section>

          {/* Detailed Sections */}
          <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hiring Overview */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-indigo-600">
                  Hiring Overview
                </h2>
                <button
                  onClick={() => toggleSection("hiring")}
                  className="text-indigo-600 hover:underline"
                >
                  {sections.hiring ? "Minimize" : "Maximize"}
                </button>
              </div>
              {sections.hiring && (
                <div>
                  <p className="text-gray-600 mt-2">
                    Review the current hiring stats, open positions, and
                    applicant progress.
                  </p>
                  <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
                    View Details
                  </button>
                </div>
              )}
            </div>

            {/* Client Insights */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-green-600">
                  Client Insights
                </h2>
                <button
                  onClick={() => toggleSection("clients")}
                  className="text-green-600 hover:underline"
                >
                  {sections.clients ? "Minimize" : "Maximize"}
                </button>
              </div>
              {sections.clients && (
                <div>
                  <p className="text-gray-600 mt-2">
                    Analyze the performance and satisfaction of your client
                    base.
                  </p>
                  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                    View Insights
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

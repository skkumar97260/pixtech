import React, { useState, useEffect } from "react";
import { deleteApply, getApplies } from "../../Api/applies";
import { getToken } from "../../Utils/storage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { Eye, Trash2, MoreVertical } from "lucide-react";
const ApplyList = () => {
  const [Applys, setApplys] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Store dropdown open state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ApplysPerPage = 10; 

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch Applys from API
  useEffect(() => {
    fetchApplys();
  }, []);

  const fetchApplys = async () => {
    
    try {
      const res = await getApplies();
      setApplys(res?.data?.result || []);
    } catch (error) {
      toast.error("Error fetching Applys");
    }
  };

  // Delete Apply
  const handleDelete = async () => {
    try {
      await deleteApply(deleteId);
      toast.success("Apply deleted successfully");
      setShowDeleteModal(false);
      fetchApplys();
    } catch (error) {
      toast.error("Error deleting Apply");
    }
  };

  // **Pagination Logic**
  const filteredApplys = Applys.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastApply = currentPage * ApplysPerPage;
  const indexOfFirstApply = indexOfLastApply - ApplysPerPage;
  const currentApplys = filteredApplys.slice(indexOfFirstApply, indexOfLastApply);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-semibold text-purple-600 mb-4">Apply List</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="w-full p-2 border rounded-lg mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-[#13266A] text-white">
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Resume</th>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentApplys.map((Apply, index) => (
                <tr key={Apply._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{indexOfFirstApply + index + 1}</td>
                  <td className="p-3">{Apply.title}</td>
                  <td className="p-3">{Apply.name}</td>
                  <td className="p-3">{Apply.email}</td>
                  <td className="p-3">{Apply.mobileNumber}</td>
                  <td className="p-3">{Apply.resume}</td>
                  <td className="p-3">{new Date(Apply.createdAt).toLocaleString()}</td>
                  <td className="p-3 text-center ">
  {/* Three-dot button */}
  <button
    className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl"
    onClick={() => setDropdownOpen(dropdownOpen === Apply._id ? null : Apply._id)}
  >
    <MoreVertical size={24} />
  </button>

  {/* Dropdown menu */}
  {dropdownOpen === Apply._id && (
    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10 overflow-auto max-h-48">
      {/* View Button */}
      <Link  to={{
                                      pathname: "/applies/viewApply",
                                      search: `?id=${Apply?._id}`,
                                    }}>
        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <Eye size={16} /> View
        </button>
      </Link>

      {/* Delete Button */}
      <button
        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        onClick={() => {
          setDeleteId(Apply._id);
          setShowDeleteModal(true);
          setDropdownOpen(null);
        }}
      >
        <Trash2 size={16} /> Delete
      </button>
    </div>
  )}
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950 " : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Prev
          </button>

          <span className="text-gray-700 p-5">Page {currentPage} of {Math.ceil(filteredApplys.length / ApplysPerPage)}</span>

          <button
            disabled={indexOfLastApply >= filteredApplys.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${indexOfLastApply >= filteredApplys.length ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950" : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Next
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold text-purple-600 mb-4">Are you sure you want to delete this Apply?</h2>
              <div className="flex justify-center gap-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApplyList;

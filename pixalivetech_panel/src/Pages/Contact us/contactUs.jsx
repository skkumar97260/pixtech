import React, { useState, useEffect } from "react";
import { deleteContactMessage, getContactMessages } from "../../Api/contactUs";
import { getToken } from "../../Utils/storage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { Eye, Trash2, MoreVertical } from "lucide-react";
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Store dropdown open state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10; 

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch contacts from API
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = getToken();
    try {
      const res = await getContactMessages(token);
      setContacts(res?.data?.result || []);
    } catch (error) {
      toast.error("Error fetching contacts");
    }
  };

  // Delete contact
  const handleDelete = async () => {
    try {
      await deleteContactMessage(deleteId);
      toast.success("Contact deleted successfully");
      setShowDeleteModal(false);
      fetchContacts();
    } catch (error) {
      toast.error("Error deleting contact");
    }
  };

  // **Pagination Logic**
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-semibold text-purple-600 mb-4">Contact List</h1>

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
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Date & Time</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((contact, index) => (
                <tr key={contact._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{indexOfFirstContact + index + 1}</td>
                  <td className="p-3">{contact.name}</td>
                  <td className="p-3">{contact.email}</td>
                  <td className="p-3">{contact.mobileNumber}</td>
                  <td className="p-3">{contact.subject}</td>
                  <td className="p-3">{contact.message}</td>
                  <td className="p-3">{new Date(contact.createdAt).toLocaleString()}</td>
                  <td className="p-3 text-center ">
  {/* Three-dot button */}
  <button
    className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl"
    onClick={() => setDropdownOpen(dropdownOpen === contact._id ? null : contact._id)}
  >
    <MoreVertical size={24} />
  </button>

  {/* Dropdown menu */}
  {dropdownOpen === contact._id && (
    <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10 overflow-auto max-h-48">
      {/* View Button */}
      <Link  to={{
                                      pathname: "/contactus/viewcontact",
                                      search: `?id=${contact?._id}`,
                                    }}>
        <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <Eye size={16} /> View
        </button>
      </Link>

      {/* Delete Button */}
      <button
        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        onClick={() => {
          setDeleteId(contact._id);
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

          <span className="text-gray-700 p-5">Page {currentPage} of {Math.ceil(filteredContacts.length / contactsPerPage)}</span>

          <button
            disabled={indexOfLastContact >= filteredContacts.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${indexOfLastContact >= filteredContacts.length ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950" : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Next
          </button>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h2 className="text-lg font-semibold text-purple-600 mb-4">Are you sure you want to delete this contact?</h2>
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

export default ContactList;

import React, { useState, useEffect ,useRef} from "react";
import { getClients, deleteClient, addClient } from "../../Api/ourClient"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { Eye, Trash2, MoreVertical, Upload,Edit  } from "lucide-react";
import { FiCamera } from "react-icons/fi";

const OurClient = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); 
  const [showAddModal, setShowAddModal] = useState(false);
  const profileRef = useRef(null);
  const initialStateInputs = {
    adminId: getAdminId(),
    name: "",
    logo: "", 

};

const initialStateErrors = {
    name: { required: false },
    logo: { required: false }, 
    
};

const [inputs, setInputs] = useState(initialStateInputs);
const [errors, setErrors] = useState(initialStateErrors);
const [submitted, setSubmitted] = useState(false);

const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.name === "") {
        error.name.required = true;
    }
    if (data.logo === "") { 
        error.email.required = true;
    } 

    
    return error;
};

const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (submitted) {
        setErrors(handleValidation({ ...inputs, [event.target.name]: event.target.value }));
    }
};

const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleAddClient = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);

    if (handleErrors(newError)) {
        try {
            await addClient(inputs);
            toast.success("Client added successfully!");
            setInputs({ name: "", logo: "" });
            setErrors(initialStateErrors);
            setSubmitted(false);

            if (profileRef.current) {
                profileRef.current.value = "";
            }
            fetchClients();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};



  




 

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const token = getToken();
    try {
      const res = await getClients(token);
      setClients(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching clients", error);
    }
  };

  // Delete client
  const handleDelete = async () => {
    try {
      await deleteClient(deleteId);
      toast.success("Client deleted successfully");
      setShowDeleteModal(false);
      fetchClients();
    } catch (error) {
      console.log("Error deleting client", error);
    }
  };

  // Handle file upload
  const handleFileInputs = (event) => {
    const file = event?.target?.files[0];
    const folder = "Clients/"; // Folder path for uploaded files
  
    if (file && file.type.startsWith("image/")) {
      const fileName = file.name; // Get the file name
  
      uploadFile(file, folder)
        .then((res) => {
          const fileUrl = res?.Location;
          setInputs({ ...inputs, logo: fileUrl, fileName }); // Save image details
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error uploading image.");
        });
    } else {
      toast.error("Please upload a valid image file.");
    }
  };
  
  const closeSearch = () => {
    setShowAddModal(false); 
};
  const filteredClients = clients.filter((c) =>
    c?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-semibold text-purple-600 mb-4">Our Clients</h1>

        {/* Add New Client Button */}
        <div className="flex items-center justify-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="mb-4   p-3 w-40 bg-[#13266A] text-white rounded-lg hover:bg-yellow-950 "
        >
          + Add New Client
        </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          className="w-full p-2 border rounded-lg mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Clients Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-[#13266A] text-white">
                <th className="p-3 text-left">S.No</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Logo</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date Added</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client, index) => (
                <tr key={client._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{indexOfFirstClient + index + 1}</td>
                  <td className="p-3">{client.name}</td>
                  <td className="p-3">
                    <img src={client.logo} alt={client.name} className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="p-3">{client.status === 1 ? "Active" : "Inactive"}</td>
                  <td className="p-3">{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-center">
                    {/* Three-dot button */}
                    <button
                      className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl"
                      onClick={() => setDropdownOpen(dropdownOpen === client._id ? null : client._id)}
                    >
                      <MoreVertical size={24} />
                    </button>

                    {/* Dropdown menu */}
                    {dropdownOpen === client._id && (
                      <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                        <Link to={{
                                      pathname: "/ourclients/viewclient",
                                      search: `?id=${client?._id}`,
                                    }}>
                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Eye size={16} /> View
                          </button>
                        </Link>

                        <Link to={{
                                      pathname: "/ourclients/editclient",
                                      search: `?id=${client?._id}`,
                                    }}>
                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} /> Edit
                          </button>
                        </Link>
                        
                        <button
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          onClick={() => {
                            setDeleteId(client._id);
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

          <span className="text-gray-700 p-5">Page {currentPage} of {Math.ceil(filteredClients.length / clientsPerPage)}</span>

          <button
            disabled={indexOfLastClient >= filteredClients.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${indexOfLastClient >= filteredClients.length ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950" : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Next
          </button>
        </div>
        {/* Add Client Modal */}
        {showAddModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-10 p-4">
    <div className="bg-white p-6 w-11/12 max-w-md md:w-96 rounded-lg shadow-md text-center relative">
      {/* Close Button */}
      <button
        onClick={closeSearch}
        className="absolute top-3 right-4 text-yellow-950 hover:text-gray-700 text-2xl font-bold"
      >
        ✕
      </button>

      {/* Modal Title */}
      <h2 className="text-lg font-semibold text-[#13266A] mb-4">Add New Client</h2>

      {/* Name Input */}
      <label className="block text-md font-medium mb-2 text-start">Name:</label>
      <input
        type="text"
        name="name"
        placeholder="Client Name"
        className="w-full p-2 border rounded-lg mb-4"
        value={inputs.name}
        onChange={handleInputs}
      />
      {errors.name.required && <span className="text-red-500 text-sm">Name is required</span>}

      {/* Logo Upload */}
      <label className="block text-md font-medium mb-2 text-start">Logo:</label>
      <div className="flex flex-col items-center">
        <label htmlFor="fileInputImage" className="cursor-pointer">
          {inputs.logo ? (
            <img
              src={inputs.logo}
              width="100"
              height="100"
              alt="Preview"
              className="rounded-full border shadow-md"
              name="logo"
            />
          ) : (
            <FiCamera size={60} className="text-gray-600" />
          )}
        </label>
        <input
          ref={profileRef}
          className="hidden"
          onChange={handleFileInputs}
          name="logo"
          id="fileInputImage"
          type="file"
          accept="image/*"
        />
        {errors.logo.required && <span className="text-red-500 text-sm">Logo is required</span>}
        {inputs.logo && <p className="text-sm text-gray-700 mt-2">Uploaded: {inputs.fileName}</p>}
      </div>

      {/* Submit Button */}
      <button
        className="bg-[#13266A] text-white px-6 py-2 rounded-lg mt-4 w-full md:w-auto"
        onClick={handleAddClient}
      >
        Add Client
      </button>
    </div>
  </div>
)}


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

export default OurClient;

import React, { useState, useEffect ,useRef} from "react";
import { getOpenings, deleteOpening, addOpening } from "../../Api/openings"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { Eye, Trash2, MoreVertical, Upload,Edit  } from "lucide-react";
import { FiCamera } from "react-icons/fi";
import { isValidEmail } from "../../Utils/validation";

const Openings = () => {
  const [Openings, setOpenings] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); 
  const [showAddModal, setShowAddModal] = useState(false);
  const initialStateInputs = {
   adminId: getAdminId(),
    title: "",
    description: [""],
    qualifications: [""],
    extraQualifications:[""],
    email: "",
    vacancies: "",

};

const initialStateErrors = {
    title: { required: false },
    description: { required: false },
    qualifications: { required: false },
    extraQualifications: { required: false },
    email:{ required: false },
    vacancies: { required: false },

    
};

const [inputs, setInputs] = useState(initialStateInputs);
const [errors, setErrors] = useState(initialStateErrors);
const [submitted, setSubmitted] = useState(false);

const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.title === "") {
        error.title.required = true;
    }
    if (data.description === "") {
        error.description.required = true;
    }
    if (data.qualifications === "") {
        error.qualifications.required = true;
    }
    if (data.extraQualifications === "") {
        error.extraQualifications.required = true;
    }
    if (data.email === "") {
        error.email.required = true;
    }
    if(!isValidEmail(data.email)) { 
        error.email.valid = true;
    }
    if (data.vacancies === "") {
      error.vacancies.required = true;
  }
    
    return error;
};

const handleInputs = (event) => {
  const { name, value } = event.target;

  setInputs((prevInputs) => {
      if (name.startsWith("callToAction.")) {
          const key = name.split(".")[1]; // Extract "text" or "linkText"

          const updatedInputs = {
              ...prevInputs,
              callToAction: {
                  ...prevInputs.callToAction, // Preserve other fields
                  [key]: value,
              },
          };

          if (submitted) {
              setErrors(handleValidation(updatedInputs)); // Use updated state
          }

          return updatedInputs;
      } else {
          const updatedInputs = { ...prevInputs, [name]: value };

          if (submitted) {
              setErrors(handleValidation(updatedInputs));
          }

          return updatedInputs;
      }
  });
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

  const handleAddOpening = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await addOpening(inputs);
            toast.success("Opening added successfully!");
            setInputs({  title: "",
                description: [""],
                qualifications: [""],
                extraQualifications:[""],
                email: "",
                vacancies: "",
              });
            setErrors(initialStateErrors);
            setSubmitted(false);
            fetchOpenings();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const OpeningsPerPage = 10;

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch Openings
  useEffect(() => {
    fetchOpenings();
  }, []);

  const fetchOpenings = async () => {

    try {
      const res = await getOpenings();
      setOpenings(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Openings", error);
    }
  };

  // Delete Opening
  const handleDelete = async () => {
    try {
      await deleteOpening(deleteId);
      toast.success("Opening deleted successfully");
      setShowDeleteModal(false);
      fetchOpenings();
    } catch (error) {
      console.log("Error deleting Opening", error);
    }
  };

  // Handle file upload
  const addDescriptionField = () => {
    setInputs((prev) => ({
      ...prev,
      description: [...prev.description, ""]
    }));
  };
  const addQualificationsField = () => {
    setInputs((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ""]
    }));
  };
  const addExtraQualificationsField = () => {
    setInputs((prev) => ({
      ...prev,
      extraQualifications: [...prev.extraQualifications, ""]
    }));
  };
  const removeDescriptionField = (index) => {
    const updatedDescription = inputs.description.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, description: updatedDescription }));
  };
  const removeQualificationsField = (index) => {
    const updatedQualifications = inputs.qualifications.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, qualifications: updatedQualifications }));
  };
  const removeExtraQualificationsField = (index) => {
    const updatedExtraQualifications = inputs.extraQualifications.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, extraQualifications: updatedExtraQualifications }));
  };

  
  const closeSearch = () => {
    setShowAddModal(false); 
};
  const filteredOpenings = Openings.filter((c) =>
    c?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastOpening = currentPage * OpeningsPerPage;
  const indexOfFirstOpening = indexOfLastOpening - OpeningsPerPage;
  const currentOpenings = filteredOpenings.slice(indexOfFirstOpening, indexOfLastOpening);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-semibold text-[#13266A] mb-4 mt-10  flex items-center justify-center">Our Openings</h1>

        {/* Add New Opening Button */}
        <div className="flex items-center justify-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="mb-4   p-3 w-40 bg-[#13266A] text-white rounded-lg hover:bg-yellow-950 "
        >
          + Add Opening
        </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          className="w-full p-2 border rounded-lg mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Openings Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#13266A] text-white">
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Qualifications</th>
            <th className="p-3 text-left">Extra Qualifications</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Vacancies</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOpenings.map((Opening, index) => (
            <tr key={Opening._id} className="border-b hover:bg-gray-100 relative">
              <td className="p-3 text-center">{index + 1}</td>
              <td className="p-3">{Opening.title}</td>

              <td className="p-3">
                {Opening.description.map((des, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i + 1}. {des}
                  </p>
                ))}
              </td>

              <td className="p-3">
                {Opening.qualifications.map((qua, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i + 1}. {qua}
                  </p>
                ))}
              </td>

              {/* Call To Action */}
              <td className="p-3">
                {Opening.extraQualifications.map((exqua, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {i + 1}. {exqua}
                  </p>
                ))}
              </td>
              <td className="p-3">{Opening.email}</td>
              <td className="p-3">{Opening.vacancies}</td>
              {/* Actions (Dropdown Menu) */}
              <td className="p-3 text-center ">
                {/* Three-dot button */}
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl"
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === Opening._id ? null : Opening._id)
                  }
                >
                  <MoreVertical size={24} />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen === Opening._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                                        <Link to={{
                                                      pathname: "/jobopenings/viewOpening",
                                                      search: `?id=${Opening?._id}`,
                                                    }}>
                                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Eye size={16} /> View
                                          </button>
                                        </Link>
                
                                        <Link to={{
                                                      pathname: "/jobopenings/editOpening",
                                                      search: `?id=${Opening?._id}`,
                                                    }}>
                                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Edit size={16} /> Edit
                                          </button>
                                        </Link>
                                        
                                        <button
                                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                          onClick={() => {
                                            setDeleteId(Opening._id);
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

          <span className="text-gray-700 p-5">Page {currentPage} of {Math.ceil(filteredOpenings.length / OpeningsPerPage)}</span>

          <button
            disabled={indexOfLastOpening >= filteredOpenings.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${indexOfLastOpening >= filteredOpenings.length ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950" : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Next
          </button>
        </div>
        {/* Add Opening Modal */}
        {showAddModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 auto-scroll">
    <div className="bg-white p-6 ml-[15%] lg:ml-[0%] w-[90%] mt-10 max-w-md md:w-[50%] rounded-lg shadow-md text-center relative 
      max-h-[80vh] overflow-y-auto">
      {/* Close Button */}
      <button
        onClick={closeSearch}
        className="absolute top-3 right-4 text-yellow-950 hover:text-gray-700 text-2xl font-bold"
      >
        ✕
      </button>

      {/* Modal Title */}
      <h2 className="text-lg font-semibold text-[#13266A] mb-4">Add New Opening</h2>

      {/* Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter Opening Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.title}
        onChange={handleInputs}
      />
      {errors.title?.required && <span className="text-red-500 text-sm">Title is required</span>}

      {/* Introduction Input */}
      <label className="block text-md font-medium mb-2 text-start">Description:</label>
      {(inputs.description || []).map((paragraph, index) => (
  <div key={index} className="flex items-center mb-2">
    <textarea
      name={`description-${index}`}
      placeholder={`description Line ${index + 1}`}
      className="w-full p-2 border rounded-lg"
      value={paragraph}
      onChange={(e) => {
        const newDesc = [...inputs.description];
        newDesc[index] = e.target.value;
        setInputs((prev) => ({ ...prev, description: newDesc }));
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeDescriptionField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  className="text-blue-600 text-sm mb-2"
  onClick={addDescriptionField}
>
  + Add More Description
</button>
      {errors.description?.required && <span className="text-red-500 text-sm">Description is required</span>}

      <label className="block text-md font-medium mb-2 text-start">Qualifications:</label>
      {(inputs.qualifications || []).map((paragraph, index) => (
  <div key={index} className="flex items-center mb-2">
    <textarea
      name={`qualifications-${index}`}
      placeholder={`qualifications Line ${index + 1}`}
      className="w-full p-2 border rounded-lg"
      value={paragraph}
      onChange={(e) => {
        const newQua = [...inputs.qualifications];
        newQua[index] = e.target.value;
        setInputs((prev) => ({ ...prev, qualifications: newQua }));
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeQualificationsField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  className="text-blue-600 text-sm mb-2"
  onClick={addQualificationsField}
>
  + Add More Qualification
</button>
      {errors.qualifications?.required && <span className="text-red-500 text-sm">Qualifications is required</span>}
      <label className="block text-md font-medium mb-2 text-start">ExtraQualifications:</label>
      {(inputs.extraQualifications || []).map((paragraph, index) => (
  <div key={index} className="flex items-center mb-2">
    <textarea
      name={`extraQualifications-${index}`}
      placeholder={`extraQualifications Line ${index + 1}`}
      className="w-full p-2 border rounded-lg"
      value={paragraph}
      onChange={(e) => {
        const newQua = [...inputs.extraQualifications];
        newQua[index] = e.target.value;
        setInputs((prev) => ({ ...prev, extraQualifications: newQua }));
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeExtraQualificationsField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  className="text-blue-600 text-sm mb-2"
  onClick={addExtraQualificationsField}
>
  + Add More ExtraQualification
</button>
      {errors.extraQualifications?.required && <span className="text-red-500 text-sm">ExtraQualifications is required</span>}

      {/* Expertise Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Email:</label>
      <input
        type="text"
        name="email"
        placeholder="Enter Expertise Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.email}
        onChange={handleInputs}
      />
 
 {errors.email?.required && <p className="text-red-500 text-sm">Email is required</p>}
 {errors.email?.validEmail && <p className="text-red-500 text-sm">Email is invalid</p>}

 <label className="block text-md font-medium mb-2 text-start">vacancies:</label>
      <input
        type="number"
        name="vacancies"
        placeholder="Enter vacancies"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.vacancies}
        onChange={handleInputs}
      />
      {errors.vacancies?.required && <span className="text-red-500 text-sm">vacancies is required</span>}
      {/* Submit Button */}
      <button
        className="bg-[#13266A] text-white px-6 py-2 rounded-lg mt-4 w-full md:w-auto"
        onClick={handleAddOpening}
      >
        Add Opening
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

export default Openings;

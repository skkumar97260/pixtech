import React, { useState, useEffect ,useRef} from "react";
import { getServices, deleteService, addService } from "../../Api/services"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { Eye, Trash2, MoreVertical, Upload,Edit  } from "lucide-react";
import { FiCamera } from "react-icons/fi";

const Services = () => {
  const [Services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); 
  const [showAddModal, setShowAddModal] = useState(false);
  const profileRef = useRef(null);
  const initialStateInputs = {
   adminId: getAdminId(),
    title: "",
    introduction: [""],
    expertiseTitle: "",
    expertiseList: [{ platform: "", technologies: "" }],
    callToAction: { text: "", linkText: ""},

};

const initialStateErrors = {
    title: { required: false },
    introduction: { required: false },
    expertiseTitle: { required: false },
    expertiseList: { required: false },
    callToAction: { required: false },
    
};

const [inputs, setInputs] = useState(initialStateInputs);
const [errors, setErrors] = useState(initialStateErrors);
const [submitted, setSubmitted] = useState(false);

const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.title === "") {
        error.title.required = true;
    }
    if (data.introduction === "") {
        error.introduction.required = true;
    }
    if (data.expertiseTitle === "") {
        error.expertiseTitle.required = true;
    }
    if (data.expertiseList === "") {
        error.expertiseList.required = true;
    }
    if (data.callToAction === "") {
        error.callToAction.required = true;
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

  const handleAddService = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await addService(inputs);
            toast.success("Service added successfully!");
            setInputs({  title: "",
                introduction: [""],
                expertiseTitle: "",
                expertiseList: [
                    {
                        platform: "",
                        technologies: ""
                    }
                ],
                callToAction: {
                    text: "",
                    linkText: "",
                 
                },});
            setErrors(initialStateErrors);
            setSubmitted(false);

            if (profileRef.current) {
                profileRef.current.value = "";
            }
            fetchServices();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ServicesPerPage = 10;

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch Services
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {

    try {
      const res = await getServices();
      setServices(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Services", error);
    }
  };

  // Delete Service
  const handleDelete = async () => {
    try {
      await deleteService(deleteId);
      toast.success("Service deleted successfully");
      setShowDeleteModal(false);
      fetchServices();
    } catch (error) {
      console.log("Error deleting Service", error);
    }
  };

  // Handle file upload
  const addIntroductionField = () => {
    setInputs((prev) => ({
      ...prev,
      introduction: [...prev.introduction, ""]
    }));
  };
  const removeIntroductionField = (index) => {
    const updatedIntroduction = inputs.introduction.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, introduction: updatedIntroduction }));
  };
  const addExpertiseField = () => {
    setInputs((prev) => ({
      ...prev,
      expertiseList: [...prev.expertiseList, { platform: "", technologies: "" }]
    }));
  };
  const removeExpertiseField = (index) => {
    const updatedExpertiseList = inputs.expertiseList.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, expertiseList: updatedExpertiseList }));
  };
  
  const closeSearch = () => {
    setShowAddModal(false); 
};
  const filteredServices = Services.filter((c) =>
    c?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastService = currentPage * ServicesPerPage;
  const indexOfFirstService = indexOfLastService - ServicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-semibold text-[#13266A] mb-4 mt-10  flex items-center justify-center">Our Services</h1>

        {/* Add New Service Button */}
        <div className="flex items-center justify-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="mb-4   p-3 w-40 bg-[#13266A] text-white rounded-lg hover:bg-yellow-950 "
        >
          + Add New Service
        </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          className="w-full p-2 border rounded-lg mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Services Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#13266A] text-white">
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Introduction</th>
            <th className="p-3 text-left">Expertise</th>
            <th className="p-3 text-left">Call To Action</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentServices.map((service, index) => (
            <tr key={service._id} className="border-b hover:bg-gray-100 relative">
              <td className="p-3 text-center">{index + 1}</td>
              <td className="p-3">{service.title}</td>

              <td className="p-3">
                {service.introduction.map((intro, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {intro}
                  </p>
                ))}
              </td>

              {/* Expertise (Platform & Technologies) */}
              <td className="p-3">
                {service.expertiseList.map((exp, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    <strong>{exp.platform}:</strong> {exp.technologies}
                  </p>
                ))}
              </td>

              {/* Call To Action */}
              <td className="p-3">
                <p className="text-gray-700 text-sm">
                  <strong>Text:</strong> {service.callToAction.text}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Link Text:</strong> {service.callToAction.linkText}
                </p>
               
              </td>

              {/* Actions (Dropdown Menu) */}
              <td className="p-3 text-center ">
                {/* Three-dot button */}
                <button
                  className="text-gray-600 hover:text-gray-900 focus:outline-none text-2xl"
                  onClick={() =>
                    setDropdownOpen(dropdownOpen === service._id ? null : service._id)
                  }
                >
                  <MoreVertical size={24} />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen === service._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                                        <Link to={{
                                                      pathname: "/services/viewService",
                                                      search: `?id=${service?._id}`,
                                                    }}>
                                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Eye size={16} /> View
                                          </button>
                                        </Link>
                
                                        <Link to={{
                                                      pathname: "/services/editService",
                                                      search: `?id=${service?._id}`,
                                                    }}>
                                          <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                            <Edit size={16} /> Edit
                                          </button>
                                        </Link>
                                        
                                        <button
                                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                          onClick={() => {
                                            setDeleteId(service._id);
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

          <span className="text-gray-700 p-5">Page {currentPage} of {Math.ceil(filteredServices.length / ServicesPerPage)}</span>

          <button
            disabled={indexOfLastService >= filteredServices.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${indexOfLastService >= filteredServices.length ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950" : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Next
          </button>
        </div>
        {/* Add Service Modal */}
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
      <h2 className="text-lg font-semibold text-[#13266A] mb-4">Add New Service</h2>

      {/* Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter Service Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.title}
        onChange={handleInputs}
      />
      {errors.title?.required && <span className="text-red-500 text-sm">Title is required</span>}

      {/* Introduction Input */}
      <label className="block text-md font-medium mb-2 text-start">Introduction:</label>
      {(inputs.introduction || []).map((paragraph, index) => (
  <div key={index} className="flex items-center mb-2">
    <textarea
      name={`introduction-${index}`}
      placeholder={`Introduction Line ${index + 1}`}
      className="w-full p-2 border rounded-lg"
      value={paragraph}
      onChange={(e) => {
        const newIntro = [...inputs.introduction];
        newIntro[index] = e.target.value;
        setInputs((prev) => ({ ...prev, introduction: newIntro }));
      }}
    />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeIntroductionField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button
  className="text-blue-600 text-sm mb-2"
  onClick={addIntroductionField}
>
  + Add More Introduction
</button>
      {errors.introduction?.required && <span className="text-red-500 text-sm">Introduction is required</span>}

      {/* Expertise Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Expertise Title:</label>
      <input
        type="text"
        name="expertiseTitle"
        placeholder="Enter Expertise Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.expertiseTitle}
        onChange={handleInputs}
      />
 
{errors?.expertiseTitle?.required && <span className="text-red-500 text-sm">Expertise Title is required</span>}
      {/* Expertise List Input (Platform & Technologies) */}
      <label className="block text-md font-medium mb-2 text-start">Expertise List:</label>
     
      {(inputs.expertiseList || []).map((expertise, index) => (
  <div key={index} className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
    {/* Platform Input */}
    <input
      type="text"
      name={`platform-${index}`}
      placeholder="Enter Platform"
      className="w-full p-2 border rounded-lg"
      value={expertise.platform}
      onChange={(e) => {
        const newExpertise = [...inputs.expertiseList];
        newExpertise[index].platform = e.target.value;
        setInputs((prev) => ({ ...prev, expertiseList: newExpertise }));
      }}
    />

    {/* Technologies Input */}
    <input
      type="text"
      name={`technologies-${index}`}
      placeholder="Enter Technologies"
      className="w-full p-2 border rounded-lg"
      value={expertise.technologies}
      onChange={(e) => {
        const newExpertise = [...inputs.expertiseList];
        newExpertise[index].technologies = e.target.value;
        setInputs((prev) => ({ ...prev, expertiseList: newExpertise }));
      }}
    />

    {/* Remove Button */}
    {index > 0 && (
      <button
        className="text-red-500 hover:text-red-700"
        onClick={() => removeExpertiseField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}

{errors?.expertiseList?.required && <span className="text-red-500 text-sm">Platform is required</span>}

{/* Add More Expertise Button */}
<button className="text-blue-600 text-sm mb-2" onClick={addExpertiseField}>
  + Add More Expertise
</button>


{/* Add New Introduction Line Button */}

    

      {/* Call to Action Input */}
      <label className="block text-md font-medium mb-2 text-start">Call to Action:</label>
      {inputs.callToAction && (
  <>
    <input
      type="text"
      name="callToAction.text"
      placeholder="Call to Action Text"
      className="w-full p-2 border rounded-lg mb-2"
      value={inputs.callToAction.text || ""}
      onChange={handleInputs}
    />

    <input
      type="text"
      name="callToAction.linkText"
      placeholder="Link Text"
      className="w-full p-2 border rounded-lg mb-2"
      value={inputs.callToAction.linkText || ""}
      onChange={handleInputs}
    />
  </>
)}

     {errors?.callToAction?.required && <span className="text-red-500 text-sm">Call to Action is required</span>}
      {/* Submit Button */}
      <button
        className="bg-[#13266A] text-white px-6 py-2 rounded-lg mt-4 w-full md:w-auto"
        onClick={handleAddService}
      >
        Add Service
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

export default Services;

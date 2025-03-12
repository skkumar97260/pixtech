import React, { useState, useEffect ,useRef} from "react";
import { getSpaces, deleteSpace, addSpace } from "../../Api/workSpace"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { Eye, Trash2, MoreVertical, Upload,Edit  } from "lucide-react";


const Spaces = () => {
  const [Spaces, setSpaces] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null); 
  const [showAddModal, setShowAddModal] = useState(false);
  const initialStateInputs = {
   adminId: getAdminId(),
    title: "",
    introduction: [""],
    facilities:[""],
    waysOfWorking: [{ type: "", description: "" ,features:[""]}],

};

const initialStateErrors = {
    title: { required: false },
    introduction: { required: false },
    facilities: { required: false },
    waysOfWorking: { required: false },
    
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
    if (data.facilities === "") {
        error.facilities.required = true;
    }
    if (data.waysOfWorking === "") {
        error.waysOfWorking.required = true;
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

  const handleAddSpace = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await addSpace(inputs);
            toast.success("Space added successfully!");
            setInputs({  title: "",
                introduction: [""],
                facilities:[""],
                waysOfWorking: [{ type: "", description: "" ,features:[""]}]});
            setErrors(initialStateErrors);
            setSubmitted(false);

          
            fetchSpaces();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};


  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const SpacesPerPage = 10;

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch Spaces
  useEffect(() => {
    fetchSpaces();
  }, []);

  const fetchSpaces = async () => {

    try {
      const res = await getSpaces();
      setSpaces(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Spaces", error);
    }
  };

  // Delete Space
  const handleDelete = async () => {
    try {
      await deleteSpace(deleteId);
      toast.success("Space deleted successfully");
      setShowDeleteModal(false);
      fetchSpaces();
    } catch (error) {
      console.log("Error deleting Space", error);
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
  const addFacilitiesField = () => {
    setInputs((prev) => ({
      ...prev,
      facilities: [...prev.facilities, ""]
    }));
  };
  const removeFacilitiesField = (index) => {
    const updatedFacilities = inputs.facilities.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, facilities: updatedFacilities }));
  };
  const addFeaturesField = (wayIndex) => {
    setInputs((prev) => ({
      ...prev,
      waysOfWorking: prev.waysOfWorking.map((wayOfWorking, index) =>
        index === wayIndex
          ? { ...wayOfWorking, features: [...wayOfWorking.features, ""] }
          : wayOfWorking
      )
    }));
  };
  
  
  const removeFeaturesField = (wayIndex, featureIndex) => {  
    setInputs((prev) => {
      const updatedWaysOfWorking = [...prev.waysOfWorking];
  
      // Remove the feature at featureIndex
      updatedWaysOfWorking[wayIndex].features = updatedWaysOfWorking[wayIndex].features.filter((_, i) => i !== featureIndex);
  
      return { ...prev, waysOfWorking: updatedWaysOfWorking };
    });
  };
  

  const addWaysOfWorkingField = () => {
    setInputs((prev) => ({
      ...prev,
      waysOfWorking: [...prev.waysOfWorking, { type: "", description: "" ,features:[""]}]
    }));
  };
  const removeWaysOfWorkingField = (index) => {
    const updatedWaysOfWorking = inputs.waysOfWorking.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, waysOfWorking: updatedWaysOfWorking }));
  };
  
  const closeSearch = () => {
    setShowAddModal(false); 
};
  const filteredSpaces = Spaces.filter((c) =>
    c?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastSpace = currentPage * SpacesPerPage;
  const indexOfFirstSpace = indexOfLastSpace - SpacesPerPage;
  const currentSpaces = filteredSpaces.slice(indexOfFirstSpace, indexOfLastSpace);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Sidebar isOpen={isSidebarOpen} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
        <Header toggleSidebar={toggleSidebar} />
        <h1 className="text-2xl font-semibold text-[#13266A] mb-4 mt-10  flex items-center justify-center">Our Spaces</h1>

        {/* Add New Space Button */}
        <div className="flex items-center justify-center">
        <button
          onClick={() => setShowAddModal(true)}
          className="mb-4   p-3 w-40 bg-[#13266A] text-white rounded-lg hover:bg-yellow-950 "
        >
          + Add New Space
        </button>
        </div>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          className="w-full p-2 border rounded-lg mb-4"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Spaces Table */}
        <div className="overflow-x-auto w-full">
  <table className="min-w-full bg-white border rounded-lg shadow-md">
    <thead>
      <tr className="bg-[#13266A] text-white text-sm sm:text-base">
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">S.No</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Title</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Introduction</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Facilities</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Ways Of Working</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Actions</th>
      </tr>
    </thead>
    <tbody>
      {currentSpaces.map((Space, index) => (
        <tr key={Space._id} className="border-b hover:bg-gray-100 text-xs sm:text-sm">
          <td className="p-2 sm:p-3 text-center">{index + 1}</td>
          <td className="p-2 sm:p-3">{Space.title}</td>

          <td className="p-2 sm:p-3 w-full sm:w-1/2">
  {Space.introduction.map((intro, i) => {
    const halfLength = Math.ceil(intro.length * 0.2); // Get 50% of text length
    const shortIntro = intro.substring(0, halfLength); // Slice the first half

    return (
      <p key={i} className="text-gray-700 text-xs  text-ellipsis">
      {`${i + 1}.`} {shortIntro}...
      </p>
    );
  })}
</td>

          <td className="p-2 sm:p-3">
            {Space.facilities.map((facility, i) => (
              <p key={i} className="text-gray-700 text-xs sm:text-sm truncate">
                {`${i + 1}.`} {facility}
              </p>
            ))}
          </td>

          {/* Ways Of Working */}
          <td className="p-2 sm:p-3">
            {Space.waysOfWorking?.length > 0 ? (
              Space.waysOfWorking.map((wayOfWorking, index) => (
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
                    <p>No Features Available</p>
                  )}
                </div>
              ))
            ) : (
              <p>No Ways of Working Available</p>
            )}
          </td>

          {/* Actions */}
          <td className="p-2 sm:p-3 text-center relative">
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none text-xl"
              onClick={() =>
                setDropdownOpen(dropdownOpen === Space._id ? null : Space._id)
              }
            >
              <MoreVertical size={20} />
            </button>

            {dropdownOpen === Space._id && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
                <Link to={{ pathname: "/coworkingspace/viewSpace", search: `?id=${Space?._id}` }}>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Eye size={16} /> View
                  </button>
                </Link>

                <Link to={{ pathname: "/coworkingspace/editSpace", search: `?id=${Space?._id}` }}>
                  <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Edit size={16} /> Edit
                  </button>
                </Link>

                <button
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setDeleteId(Space._id);
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

          <span className="text-gray-700 p-5">Page {currentPage} of {Math.ceil(filteredSpaces.length / SpacesPerPage)}</span>

          <button
            disabled={indexOfLastSpace >= filteredSpaces.length}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded ${indexOfLastSpace >= filteredSpaces.length ? "bg-[#13266A] text-white cursor-not-allowed  hover:bg-yellow-950" : "bg-[#13266A] text-white hover:bg-yellow-950"}`}
          >
            Next
          </button>
        </div>
        {/* Add Space Modal */}
        {showAddModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 auto-scroll">
    <div className="bg-white p-6 ml-[15%] lg:ml-[0%] w-[90%] flex flex-col mt-10 max-w-md md:w-[50%] rounded-lg shadow-md text-center relative 
      max-h-[80vh] overflow-y-auto">

      {/* Close Button */}
      <button
        onClick={closeSearch}
        className="absolute top-3 right-4 text-yellow-950 hover:text-gray-700 text-2xl font-bold"
      >
        ✕
      </button>

      {/* Modal Title */}
      <h2 className="text-lg font-semibold text-[#13266A] mb-4">Add New Space</h2>

      {/* Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter Space Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.title || ""}
        onChange={handleInputs}
      />
      {errors?.title?.required && <span className="text-red-500 text-sm">Title is required</span>}

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
      <button className="text-blue-600 text-sm mb-2" onClick={addIntroductionField}>
        + Add More Introduction
      </button>
      {errors?.introduction?.required && <span className="text-red-500 text-sm">Introduction is required</span>}

      {/* Facilities Input */}
      <label className="block text-md font-medium mb-2 text-start">Facilities:</label>
      {(inputs.facilities || []).map((facility, index) => (
        <div key={index} className="flex items-center mb-2">
          <textarea
            name={`facilities-${index}`}
            placeholder={`Facility Line ${index + 1}`}
            className="w-full p-2 border rounded-lg"
            value={facility}
            onChange={(e) => {
              const newFacility = [...inputs.facilities];
              newFacility[index] = e.target.value;
              setInputs((prev) => ({ ...prev, facilities: newFacility }));
            }}
          />
          {index > 0 && (
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => removeFacilitiesField(index)}
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button className="text-blue-600 text-sm mb-2" onClick={addFacilitiesField}>
        + Add More Facilities
      </button>
      {errors?.facilities?.required && <span className="text-red-500 text-sm">Facilities is required</span>}

      {/* Ways of Working Input */}
      <label className="block text-md font-medium mb-2 text-start">Ways of Working:</label>
      {(inputs.waysOfWorking || []).map((ways, index) => (
        <div key={index} className="flex flex-col md:flex-col md:items-center gap-2 mb-2 border p-2">
          {/* Type Input */}
          <input
            type="text"
            name={`type-${index}`}
            placeholder={`Enter Type ${index + 1}`}
            className="w-full p-2 border rounded-lg"
            value={ways.type || ""}
            onChange={(e) => {
              const newWays = [...inputs.waysOfWorking];
              newWays[index] = { ...newWays[index], type: e.target.value };
              setInputs((prev) => ({ ...prev, waysOfWorking: newWays }));
            }}
          />

          {/* Technologies Input */}
          <input
            type="text"
            name={`description-${index}`}
            placeholder={`Enter Description ${index + 1}`}
            className="w-full p-2 border rounded-lg"
            value={ways.description || ""}
            onChange={(e) => {
              const newWays = [...inputs.waysOfWorking];
              newWays[index] = { ...newWays[index], description: e.target.value };
              setInputs((prev) => ({ ...prev, waysOfWorking: newWays }));
            }}
          />

          {/* Features Input */}
          {(ways.features || []).map((value, indexoffeature) => (
            <div key={indexoffeature} className="flex flex-col md:flex-row md:items-center gap-2 mb-2 w-full">
              <textarea
                name={`features-${indexoffeature}`}
                placeholder={`Features Line ${indexoffeature + 1}`}
                className="w-full p-2 border rounded-lg"
                value={value || ""}
                onChange={(e) => {
                  const newFeatures = [...(ways.features || [])];
                  newFeatures[indexoffeature] = e.target.value;
                  const newWays = [...inputs.waysOfWorking];
                  newWays[index] = { ...newWays[index], features: newFeatures };
                  setInputs((prev) => ({ ...prev, waysOfWorking: newWays }));
                }}
              />
              {indexoffeature > 0 && (
                <button
                  className="ml-2 text-red-500 hover:text-red-700"
                  onClick={() => removeFeaturesField(index, indexoffeature)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Add More Features */}
          <button className="text-blue-600 text-sm mb-2" onClick={ () => addFeaturesField(index)}>
            + Add More Features
          </button>

          {/* Remove Ways of Working */}
          {index > 0 && (
            <button className="text-red-500 hover:text-red-700" onClick={() => removeWaysOfWorkingField(index)}>
              ✕
            </button>
          )}
        </div>
      ))}

      {/* Add More Ways of Working */}
      <button className="text-blue-600 text-sm mb-2" onClick={addWaysOfWorkingField}>
        + Add More Ways of Working
      </button>
      {errors?.waysOfWorking?.required && <span className="text-red-500 text-sm">Ways of Working is required</span>}

      {/* Submit Button */}
      <button className="bg-[#13266A] text-white px-6 py-2 rounded-lg mt-4 w-full md:w-auto" onClick={handleAddSpace}>
        Add Space
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

export default Spaces;

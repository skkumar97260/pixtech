import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSingleSpace, updateSpace } from "../../Api/workSpace"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { FiCamera,FiArrowLeft } from "react-icons/fi";

const EditSpace = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



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

  const handleEditinputss = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await updateSpace(inputs);
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
      const res = await getSingleSpace(id);
      setInputs(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Spaces", error);
    }
  };

  // Delete Space


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



  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
    <Sidebar isOpen={isSidebarOpen} />
    <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
      <Header toggleSidebar={toggleSidebar} />

      {/* Edit inputss Section */}
      <div className="max-w-md md:max-w-lg mx-auto px-4 w-full mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#13266A]">Edit Service</h2>
          <Link to="/Space">
            <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex items-center gap-2">
              <FiArrowLeft className="text-xl" /> Space List
            </button>
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md md:max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 w-full">
        <form >

<div className=" flex flex-col">
    

      {/* Modal Title */}
      <h2 className="text-lg font-semibold text-[#13266A] mb-4">Add New Space</h2>

      {/* Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter Space Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs?.title || ""}
        onChange={handleInputs}
      />
      {errors?.title?.required && <span className="text-red-500 text-sm">Title is required</span>}

      {/* Introduction Input */}
      <label className="block text-md font-medium mb-2 text-start">Introduction:</label>
      {(inputs?.introduction || []).map((paragraph, index) => (
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
      {(inputs?.facilities || []).map((facility, index) => (
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
      {(inputs?.waysOfWorking || []).map((ways, index) => (
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
          {(ways?.features || []).map((value, indexoffeature) => (
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
      <button className="bg-[#13266A] text-white px-6 py-2 rounded-lg mt-4 w-full md:w-auto" onClick={handleEditinputss}>
        Add Space
      </button>
  </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto px-4 md:px-24 mt-6">
        <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
    <thead>
      <tr className="bg-[#13266A] text-white text-sm sm:text-base">
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">S.No</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Title</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Introduction</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Facilities</th>
        <th className="p-2 sm:p-3 text-left whitespace-nowrap">Ways Of Working</th>
      </tr>
    </thead>
    <tbody>
    
        <tr key={inputs?._id} className="border-b hover:bg-gray-100 text-xs sm:text-sm">
          <td className="p-2 sm:p-3 text-center">{1}</td>
          <td className="p-2 sm:p-3">{inputs?.title}</td>

          <td className="p-2 sm:p-3 w-full sm:w-1/2">
  {inputs?.introduction.map((intro, i) => {
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
            {inputs?.facilities.map((facility, i) => (
              <p key={i} className="text-gray-700 text-xs sm:text-sm truncate">
                {`${i + 1}.`} {facility}
              </p>
            ))}
          </td>

          {/* Ways Of Working */}
          <td className="p-2 sm:p-3">
            {inputs?.waysOfWorking?.length > 0 ? (
              inputs.waysOfWorking.map((wayOfWorking, index) => (
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

        
          
        </tr>
       

      
    </tbody>
  </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default EditSpace;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSingleDeveloper, updateDeveloper } from "../../Api/developers"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { FiCamera,FiArrowLeft } from "react-icons/fi";

const EditDeveloper = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


 const initialStateInputs = {
   adminId: getAdminId(),
   role:"",
    title: "",
    introduction: [""],
    highlights:[""],
    services:{
        title: "",
            description: "",
            items: [""],
        },
    whyUs: {
        title:"",
        description: "",
    },
    hiringModels: {
        title: "",
        options: [
            {
                name: "",
                description: "",
            },
        ],
        conclusion: "",
    },

};

const initialStateErrors = {
    title: { required: false },
    introduction: { required: false },
    highlights: { required: false },
    services: { required: false },
    whyUs: { required: false },
    hiringModels: { required: false },
    
};

const [inputs, setInputs] = useState(initialStateInputs);
const [errors, setErrors] = useState(initialStateErrors);
const [submitted, setSubmitted] = useState(false);

const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.role === "") {
        error.role.required = true;
    }

    if (data.title === "") {
        error.title.required = true;
    }
    if (data.introduction === "") {
        error.introduction.required = true;
    }
    if (data.highlights === "") {
        error.highlights.required = true;
    }
    if (data.services === "") {
        error.services.required = true;
    }
    if (data.whyUs === "") {
        error.whyUs.required = true;
    }
    if (data.hiringModels === "") {
        error.hiringModels.required = true;
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

  const handleEditDeveloper = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await updateDeveloper(inputs);
            toast.success("Developer added successfully!");
            setInputs({ 
                 role: "",
                 title: "",
                introduction: [""],
                highlights:[""],
                services:{
                   
                    title: "",
                        description: "",
                        items: [""],
                    },
                whyUs: {
                    title:"",
                    description: "",
                },
                hiringModels: {
                    title: "",
                    options: [
                        {
                            name: "",
                            description: "",
                        },
                    ],
                    conclusion: "",
                },});

            setErrors(initialStateErrors);
            setSubmitted(false);

          
            fetchDevelopers();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};


 

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch Developers
  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {

    try {
      const res = await getSingleDeveloper(id);
      setInputs(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching Developers", error);
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
  const addHighlightsField = () => {
    setInputs((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ""]
    }));
  };
  const removeHighlightsField = (index) => {
    const updatedHighlights = inputs.highlights.filter((_, i) => i !== index);
    setInputs((prev) => ({ ...prev, highlights: updatedHighlights }));
  };

  
  
  
  
    // Add More Features (Items)
    const addItemsField = () => {
      setInputs((prev) => ({
        ...prev,
        services: {
          ...prev.services,
          items: [...prev.services?.items, ""]
        }
      }));
    };
  
    // Remove Item from Service
    const removeItemsField = (index) => {
      const newServices = [...inputs.services.items];
      newServices.splice(index, 1); // Removes the option at index
    setInputs((prev) => ({
      ...prev,
      services: { ...prev.services, items: newServices }
    }));
    };
  
  

  
  
  const addHiringOption = () => {
    setInputs((prev) => ({
      ...prev,
      hiringModels: {
        ...prev.hiringModels,
        options: [...prev.hiringModels.options, { name: '', description: '' }]
      }
    }));
  };
  

  const removeHiringOption = (index) => {
    const newOptions = [...inputs.hiringModels.options];
    newOptions.splice(index, 1); // Removes the option at index
    setInputs((prev) => ({
      ...prev,
      hiringModels: { ...prev.hiringModels, options: newOptions }
    }));
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
          <Link to="/hiredevelopers">
            <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex items-center gap-2">
              <FiArrowLeft className="text-xl" /> Developer List
            </button>
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md md:max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 w-full">
        <form >

<div className=" flex flex-col">
    

      {/* Modal Title */}
      <h2 className="text-lg font-semibold text-[#13266A] mb-4">Add New Developer</h2>

      <label className="block text-md font-medium mb-2 text-start">Role:</label>
      <input
        type="text"
        name="role"
        placeholder="Enter Developer Role"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.role || ""}
        onChange={handleInputs}
      />
      {errors?.role?.required && <span className="text-red-500 text-sm">Role is required</span>}
      {/* Title Input */}
      <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter Developer Title"
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

      {/* Highlights Input */}
      <label className="block text-md font-medium mb-2 text-start">Highlights:</label>
      {(inputs.highlights || []).map((Highlight, index) => (
        <div key={index} className="flex items-center mb-2">
          <textarea
            name={`highlights-${index}`}
            placeholder={`Highlights Line ${index + 1}`}
            className="w-full p-2 border rounded-lg"
            value={Highlight}
            onChange={(e) => {
              const newHighlight = [...inputs.highlights];
              newHighlight[index] = e.target.value;
              setInputs((prev) => ({ ...prev, highlights: newHighlight }));
            }}
          />
          {index > 0 && (
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => removeHighlightsField(index)}
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <button className="text-blue-600 text-sm mb-2" onClick={addHighlightsField}>
        + Add More Highlights
      </button>
      {errors?.highlights?.required && <span className="text-red-500 text-sm">Highlights are required</span>}

      {/* Services Input */}
      <label className="block text-md font-medium mb-2 text-start">Services:</label>
     
          {/* Service Title & Description */}
          <div className="border border-gray-400 p-2 rounded-lg">
          <div>
      <input
        type="text"
        name="whyUsTitle"
        placeholder="Service Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.services.title}
        onChange={(e) => setInputs({ ...inputs, services: { ...inputs.services, title: e.target.value } })}
      />
      <textarea
        placeholder="Service Description"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.services.description}
        onChange={(e) => setInputs({ ...inputs, services: { ...inputs.services, description: e.target.value } })}
      />
      </div>
          
          {(inputs.services.items || []).map((item, index) => (
  <div key={index} className="flex items-center mb-2">
  <textarea
            placeholder={`service Items ${index + 1}`}
            className="w-full p-2 border rounded-lg mb-1"
            value={item}
            onChange={(e) => {
              const newItems = [...inputs.services.items];
              newItems[index] = e.target.value;
              setInputs({ ...inputs, services: { ...inputs.services, items: newItems } });
            }}
          />
    {index > 0 && (
      <button
        className="ml-2 text-red-500 hover:text-red-700"
        onClick={() => removeItemsField(index)}
      >
        ✕
      </button>
    )}
  </div>
))}
<button className="text-blue-600 text-sm mb-2" onClick={addItemsField}>
  + Add More Items
</button>
</div>


    
      {errors?.services?.required && <span className="text-red-500 text-sm">Services are required</span>}

      {/* Why Us */}
      <label className="block text-md font-medium mb-2 text-start">Why Us:</label>
      
      <div>
      <input
        type="text"
        name="whyUsTitle"
        placeholder="Why Us Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.whyUs.title}
        onChange={(e) => setInputs({ ...inputs, whyUs: { ...inputs.whyUs, title: e.target.value } })}
      />
      <textarea
        placeholder="Why Us Description"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.whyUs.description}
        onChange={(e) => setInputs({ ...inputs, whyUs: { ...inputs.whyUs, description: e.target.value } })}
      />
      </div>

      {/* Hiring Models */}
      <label className="block text-md font-medium mb-2 text-start">Hiring Models:</label>
      <div className="border border-gray-400 p-2 rounded-lg">
      <input
        type="text"
        placeholder="Hiring Model Title"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs.hiringModels.title}
        onChange={(e) => setInputs({ ...inputs, hiringModels: { ...inputs.hiringModels, title: e.target.value } })}
      />

      {inputs.hiringModels.options.map((option, index) => (
        <div key={index} className="flex flex-col mb-2">
          <input
            type="text"
            placeholder={`Hiring Option Name ${index + 1}`}
            className="w-full p-2 border rounded-lg mb-1"
            value={option.name}
            onChange={(e) => {
              const newOptions = [...inputs.hiringModels.options];
              newOptions[index].name = e.target.value;
              setInputs({ ...inputs, hiringModels: { ...inputs.hiringModels, options: newOptions } });
            }}
          />
          <textarea
            placeholder={`Hiring Option Description ${index + 1}`}
            className="w-full p-2 border rounded-lg mb-1"
            value={option.description}
            onChange={(e) => {
              const newOptions = [...inputs.hiringModels.options];
              newOptions[index].description = e.target.value;
              setInputs({ ...inputs, hiringModels: { ...inputs.hiringModels, options: newOptions } });
            }}
          />
          {index > 0 && (
            <button className="text-red-500 hover:text-red-700" onClick={() => removeHiringOption(index)}>
              ✕
            </button>
          )}
        </div>
      ))}
      <button className="text-blue-600 text-sm mb-2" onClick={addHiringOption}>
        + Add More Hiring Options
      </button>
      <input
        type="text"
        placeholder="Hiring Model concultion"
        className="w-full p-2 border rounded-lg mb-2"
        value={inputs?.hiringModels?.conclusion}
        onChange={(e) => setInputs({ ...inputs, hiringModels: { ...inputs.hiringModels, conclusion: e.target.value } })}
      />
  </div>
      {/* Submit Button */}
      <button
        className="bg-[#13266A] text-white px-6 py-2 rounded-lg mt-4 w-full md:w-auto"
        onClick={handleEditDeveloper}
      >
        Add Developer
      </button>
  </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto px-4 md:px-24 mt-6">
        <div className="overflow-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-[#13266A] text-white text-xs sm:text-base">
            <th className="p-2 sm:p-3 text-left">S.No</th>
            <th className="p-2 sm:p-3 text-left">Role</th>
            <th className="p-2 sm:p-3 text-left">Title</th>
            <th className="p-2 sm:p-3 text-left hidden sm:table-cell">Introduction</th>
            <th className="p-2 sm:p-3 text-left hidden md:table-cell">Highlights</th>
            <th className="p-2 sm:p-3 text-left hidden md:table-cell">Services</th>
            <th className="p-2 sm:p-3 text-left hidden lg:table-cell">Why Us</th>
            <th className="p-2 sm:p-3 text-left hidden lg:table-cell">Hiring Models</th>
          </tr>
        </thead>
        <tbody>
         
            <tr  className="border-b hover:bg-gray-100 text-xs sm:text-sm">
              <td className="p-2 sm:p-3 text-center">{ 1}</td>
              <td className="p-2 sm:p-3">{inputs.role}</td>
              <td className="p-2 sm:p-3">{inputs.title}</td>

              {/* Introduction - Show on Small Screens */}
              <td className="p-2 sm:p-3 hidden sm:table-cell">
                {inputs.introduction.map((intro, i) => (
                  <p key={i} className="text-gray-700 text-xs text-ellipsis">
                    {`${i + 1}.`} {intro.substring(0, 30)}...
                  </p>
                ))}
              </td>

              {/* Highlights - Hidden on Mobile */}
              <td className="p-2 sm:p-3 hidden md:table-cell">
                {inputs.highlights.map((high, i) => (
                  <p key={i} className="text-gray-700 text-xs text-ellipsis">
                    {`${i + 1}.`} {high.substring(0, 30)}...
                  </p>
                ))}
              </td>

              {/* Services - Hidden on Mobile */}
              <td className="p-2 sm:p-3 hidden md:table-cell">
                {inputs.services?.title ? (
                  <div>
                    <h3 className="font-semibold">{inputs.services.title}</h3>
                    <p className="text-sm">{inputs.services.description || "N/A"}</p>
                    <strong>Items:</strong>
                    {inputs.services.items?.length > 0 ? (
                      <ul className="list-disc pl-4 text-sm">
                        {inputs.services.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm">No Features Available</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm">No Services Available</p>
                )}
              </td>

              {/* Why Us - Hidden on Small Screens */}
              <td className="p-2 sm:p-3 hidden lg:table-cell">
                <h3 className="font-semibold">{inputs.whyUs?.title || "N/A"}</h3>
                <p className="text-sm">{inputs.whyUs?.description || "N/A"}</p>
              </td>

              {/* Hiring Models - Hidden on Small Screens */}
              <td className="p-2 sm:p-3 hidden lg:table-cell">
                <h3 className="font-semibold">{inputs.hiringModels?.title || "N/A"}</h3>
                {inputs.hiringModels?.options?.length > 0 ? (
                  <ul className="list-disc pl-4 text-sm">
                    {inputs.hiringModels.options.map((option, i) => (
                      <li key={i}>
                        <strong>{option.name}</strong>: {option.description}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm">No Options Available</p>
                )}
                <h3 className="font-semibold mt-1">Conclusion:</h3>
                <p className="text-sm">{inputs.hiringModels?.conclusion || "N/A"}</p>
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

export default EditDeveloper;

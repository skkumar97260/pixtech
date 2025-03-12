import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {  getSingleService, updateService } from "../../Api/services"; 
import { getAdminId, getToken } from "../../Utils/storage";
import { uploadFile } from "../../Utils/fileUpload"; 
import { toast } from "react-toastify";
import Header from "../../Components/header";
import Sidebar from "../../Components/sidebar";
import { FiCamera,FiArrowLeft } from "react-icons/fi";

const Editservices = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get("id");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleEditinputss = async (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
console.log("inputs",inputs);
    if (handleErrors(newError)) {
        try {
            await updateService(inputs);
            toast.success("service added successfully!");
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
            fetchServicesDetails();

        } catch (err) {
            toast.error(err?.response?.data?.message);
        }
    }
};


  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  // Fetch inputss
  useEffect(() => {
    fetchServicesDetails();
  }, []);

  const fetchServicesDetails = async () => {

    try {
      const res = await getSingleService(id);
      setInputs(res?.data?.result || []);
    } catch (error) {
      console.log("Error fetching inputss", error);
    }
  };

  // Delete inputs
 

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
  



  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
    <Sidebar isOpen={isSidebarOpen} />
    <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"}`}>
      <Header toggleSidebar={toggleSidebar} />

      {/* Edit inputss Section */}
      <div className="max-w-md md:max-w-lg mx-auto px-4 w-full mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#13266A]">Edit Service</h2>
          <Link to="/services">
            <button className="bg-[#13266A] text-white px-4 py-2 rounded-md hover:bg-yellow-950 transition flex items-center gap-2">
              <FiArrowLeft className="text-xl" /> Services List
            </button>
          </Link>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-md md:max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 w-full">
        <form onSubmit={handleEditinputss}>
        <label className="block text-md font-medium mb-2 text-start">Title:</label>
      <input
        type="text"
        name="title"
        placeholder="Enter inputs Title"
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

          <div className="flex justify-end mt-6">
            <button type="submit" className="bg-[#13266A] text-white px-6 py-2 rounded-lg hover:bg-yellow-950">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto px-4 md:px-24 mt-6">
        <div className="overflow-auto rounded-lg shadow-lg">
          <table className="w-full bg-white border rounded-lg min-w-[600px]">
          <thead>
          <tr className="bg-[#13266A] text-white">
            <th className="p-3 text-left">S.No</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Introduction</th>
            <th className="p-3 text-left">Expertise</th>
            <th className="p-3 text-left">Call To Action</th>
         
          </tr>
        </thead>
        <tbody>
         
            <tr  className="border-b hover:bg-gray-100 relative">
              <td className="p-3 text-center">{1}</td>
              <td className="p-3">{inputs.title}</td>

              <td className="p-3">
                {inputs.introduction.map((intro, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    {intro}
                  </p>
                ))}
              </td>

              {/* Expertise (Platform & Technologies) */}
              <td className="p-3">
                {inputs.expertiseList.map((exp, i) => (
                  <p key={i} className="text-gray-700 text-sm">
                    <strong>{exp.platform}:</strong> {exp.technologies}
                  </p>
                ))}
              </td>

              {/* Call To Action */}
              <td className="p-3">
                <p className="text-gray-700 text-sm">
                  <strong>Text:</strong> {inputs.callToAction.text}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Link Text:</strong> {inputs.callToAction.linkText}
                </p>
               
              </td>

              {/* Actions (Dropdown Menu) */}
           
            </tr>
          
        </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Editservices;
